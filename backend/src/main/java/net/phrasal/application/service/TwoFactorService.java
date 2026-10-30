package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.RecoveryCodesResponse;
import net.phrasal.application.dto.TwoFactorSetupResponse;
import net.phrasal.application.dto.TwoFactorStatusResponse;
import net.phrasal.application.event.TwoFactorChangedNoticeRequested;
import net.phrasal.config.TwoFactorProperties;
import net.phrasal.domain.entity.RecoveryCode;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.RecoveryCodeRepository;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.InvalidTwoFactorCodeException;
import net.phrasal.infrastructure.exception.TwoFactorLoginExpiredException;
import net.phrasal.infrastructure.exception.TwoFactorStateException;
import net.phrasal.infrastructure.exception.TwoFactorStateException.Reason;
import net.phrasal.infrastructure.security.AesGcmEncryptor;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.RecoveryCodes;
import net.phrasal.infrastructure.security.SecretDecryptionException;
import net.phrasal.infrastructure.security.TotpVerifier;
import net.phrasal.infrastructure.security.TwoFactorSecrets;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.OptionalLong;

/** Enrolls accounts in authenticator-app 2FA and reports their 2FA state. */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TwoFactorService {

    private final UserRepository userRepository;
    private final RecoveryCodeRepository recoveryCodeRepository;
    private final AesGcmEncryptor encryptor;
    private final TotpVerifier totpVerifier;
    private final TwoFactorSecrets twoFactorSecrets;
    private final RecoveryCodes recoveryCodes;
    private final AccountChecks accountChecks;
    private final TwoFactorProperties properties;
    private final Clock clock;
    private final ApplicationEventPublisher eventPublisher;

    /** Which kind of second factor a submitted code turned out to be. */
    public enum SecondFactor {

        TOTP, RECOVERY_CODE
    }

    /**
     * Reports the 2FA state of an account.
     *
     * @param userId account id
     * @return whether 2FA is on, since when, and how many recovery codes are left
     */
    @Transactional(readOnly = true)
    public TwoFactorStatusResponse status(Long userId) {
        User user = load(userId);
        return new TwoFactorStatusResponse(user.isTwoFactorEnabled(), user.getTotpEnabledAt(),
                recoveryCodeRepository.countByUserIdAndUsedAtIsNull(userId));
    }

    /**
     * Starts enrollment with a fresh secret. 2FA stays off until {@link #confirm}; calling this again replaces the
     * pending secret.
     *
     * @param userId   account id
     * @param password the current account password
     * @return the Base32 secret and the otpauth URI
     * @throws TwoFactorStateException if 2FA is already on
     * @throws WrongPasswordException  if the password is wrong, or the account has none
     */
    public TwoFactorSetupResponse setup(Long userId, String password) {
        User user = load(userId);
        if (user.isTwoFactorEnabled()) {
            throw new TwoFactorStateException(Reason.ALREADY_ENABLED);
        }
        accountChecks.requirePassword(user, password);
        byte[] secret = twoFactorSecrets.newSecret();
        user.startTwoFactorSetup(encryptor.encrypt(secret, aad(userId)));
        String base32 = TwoFactorSecrets.toBase32(secret);
        log.info("Two-factor setup started userId={}", userId);
        return new TwoFactorSetupResponse(base32,
                twoFactorSecrets.otpauthUri(properties.issuer(), user.getEmail(), base32));
    }

    /**
     * Finishes enrollment: checks a code from the app, turns 2FA on and issues the recovery codes.
     *
     * @param userId account id
     * @param code   six-digit code from the authenticator app
     * @return the raw recovery codes, shown once
     * @throws TwoFactorStateException      if 2FA is already on, or no setup is pending
     * @throws InvalidTwoFactorCodeException if the code does not match the pending secret
     */
    public RecoveryCodesResponse confirm(Long userId, String code) {
        User user = load(userId);
        if (user.isTwoFactorEnabled()) {
            throw new TwoFactorStateException(Reason.ALREADY_ENABLED);
        }
        if (user.getTotpSecretEnc() == null) {
            throw new TwoFactorStateException(Reason.SETUP_NOT_STARTED);
        }
        if (!RecoveryCodes.looksLikeTotp(code)) {
            throw new InvalidTwoFactorCodeException();
        }
        Instant now = clock.instant();
        OptionalLong step = totpVerifier.matchingStep(decryptSecret(user), code, now);
        if (step.isEmpty()) {
            throw new InvalidTwoFactorCodeException();
        }
        user.enableTwoFactor(LocalDateTime.now(clock), step.getAsLong());
        List<String> codes = issueRecoveryCodes(userId);
        eventPublisher.publishEvent(new TwoFactorChangedNoticeRequested(userId, user.getEmail(), true));
        log.info("Two-factor enabled userId={}", userId);
        return new RecoveryCodesResponse(codes);
    }

    /**
     * Turns 2FA off after a code check. A recovery code works too, which is the way out when the phone is lost.
     *
     * @param userId account id
     * @param code   a TOTP or a recovery code
     * @throws TwoFactorStateException       if 2FA is off
     * @throws InvalidTwoFactorCodeException if the code is wrong, or was already used
     */
    public void disable(Long userId, String code) {
        verifyCode(userId, code);
        // verifyCode's conditional update detaches the loaded user, so load it again to change it.
        User user = load(userId);
        user.disableTwoFactor();
        recoveryCodeRepository.deleteAllByUserId(userId);
        eventPublisher.publishEvent(new TwoFactorChangedNoticeRequested(userId, user.getEmail(), false));
        log.info("Two-factor disabled userId={}", userId);
    }

    /**
     * Replaces all recovery codes after a code check. The old codes stop working.
     *
     * @param userId account id
     * @param code   a TOTP or a recovery code
     * @return the new raw recovery codes, shown once
     * @throws TwoFactorStateException       if 2FA is off
     * @throws InvalidTwoFactorCodeException if the code is wrong, or was already used
     */
    public RecoveryCodesResponse regenerateRecoveryCodes(Long userId, String code) {
        verifyCode(userId, code);
        List<String> codes = issueRecoveryCodes(userId);
        log.info("Recovery codes regenerated userId={}", userId);
        return new RecoveryCodesResponse(codes);
    }

    /**
     * Checks a code at login, disable or regenerate. A six-digit code is a TOTP, accepted once per time step; anything
     * else is a recovery code, accepted once.
     *
     * @param userId account id
     * @param code   the submitted code
     * @return which kind of code was accepted
     * @throws TwoFactorStateException       if 2FA is off
     * @throws InvalidTwoFactorCodeException if the code is wrong, or was already used
     */
    public SecondFactor verifyCode(Long userId, String code) {
        User user = load(userId);
        if (!user.isTwoFactorEnabled()) {
            throw new TwoFactorStateException(Reason.NOT_ENABLED);
        }
        if (RecoveryCodes.looksLikeTotp(code)) {
            OptionalLong step = totpVerifier.matchingStep(decryptSecret(user), code, clock.instant());
            if (step.isEmpty() || userRepository.advanceTotpStep(userId, step.getAsLong()) != 1) {
                throw new InvalidTwoFactorCodeException();
            }
            return SecondFactor.TOTP;
        }
        if (recoveryCodeRepository.markUsed(userId, RecoveryCodes.hash(code), LocalDateTime.now(clock)) != 1) {
            throw new InvalidTwoFactorCodeException();
        }
        return SecondFactor.RECOVERY_CODE;
    }

    /**
     * Rebuilds the session principal for the second login step.
     *
     * @param userId account id from the pending login
     * @return the principal, with 2FA on
     * @throws TwoFactorLoginExpiredException if the account is gone or no longer has 2FA
     */
    @Transactional(readOnly = true)
    public AuthenticatedUser loadPrincipal(Long userId) {
        User user = userRepository.findById(userId).filter(User::isTwoFactorEnabled)
                .orElseThrow(TwoFactorLoginExpiredException::new);
        return new AuthenticatedUser(user.getId(), user.getEmail(), user.getRole(), true);
    }

    private List<String> issueRecoveryCodes(Long userId) {
        recoveryCodeRepository.deleteAllByUserId(userId);
        List<String> codes = recoveryCodes.generate();
        recoveryCodeRepository.saveAll(codes.stream()
                .map(raw -> new RecoveryCode(userId, RecoveryCodes.hash(raw))).toList());
        return codes;
    }

    private byte[] decryptSecret(User user) {
        try {
            return encryptor.decrypt(user.getTotpSecretEnc(), aad(user.getId()));
        } catch (SecretDecryptionException e) {
            log.error("Two-factor secret could not be decrypted userId={}", user.getId(), e);
            throw new InvalidTwoFactorCodeException();
        }
    }

    private User load(Long userId) {
        return accountChecks.load(userId);
    }

    private static String aad(Long userId) {
        return "user:" + userId;
    }
}
