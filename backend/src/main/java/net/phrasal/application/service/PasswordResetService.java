package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.application.event.PasswordResetEmailRequested;
import net.phrasal.application.validation.PasswordPolicy;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.exception.ResetLinkExpiredException;
import net.phrasal.infrastructure.exception.ResetLinkInvalidException;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SecureTokenGenerator.IssuedToken;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

/** Issues password reset links and redeems them. */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class PasswordResetService {

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final SecureTokenGenerator tokenGenerator;
    private final PasswordResetProperties properties;
    private final Clock clock;
    private final ApplicationEventPublisher eventPublisher;
    private final PasswordEncoder passwordEncoder;
    private final SessionRevoker sessionRevoker;
    private final PasswordBreachGuard breachGuard;

    /**
     * Sends a reset link to an existing account, verified or not. Unknown addresses are ignored silently, so the
     * caller cannot tell whether an account exists.
     *
     * @param rawEmail address as typed by the user
     */
    public void requestReset(String rawEmail) {
        userRepository.findByEmail(EmailNormalizer.normalize(rawEmail)).ifPresent(this::issueFor);
    }

    private void issueFor(User user) {
        LocalDateTime now = LocalDateTime.now(clock);
        userTokenRepository.invalidateActive(user.getId(), TokenType.PASSWORD_RESET, now);
        IssuedToken issued = tokenGenerator.generate();
        userTokenRepository.save(new UserToken(user.getId(), TokenType.PASSWORD_RESET, issued.hash(),
                now.plus(properties.tokenTtl())));
        eventPublisher.publishEvent(new PasswordResetEmailRequested(user.getId(), user.getEmail(), issued.rawToken()));
        log.debug("Password reset requested userId={}", user.getId());
    }

    /**
     * Sets a new password through a reset link and ends every session of the account. A link works once; any failure
     * rolls back, so the link stays usable for another attempt. An unverified account becomes verified, because the
     * link proves control of the mailbox.
     *
     * @param rawToken    token from the emailed link
     * @param newPassword new raw password
     * @throws ResetLinkInvalidException         if the token is unknown, already used or replaced by a newer one
     * @throws ResetLinkExpiredException         if the token is past its expiry
     * @throws PasswordPolicyViolationException  if the password contains the account email, or is in a known
     *                                          breach
     */
    public void reset(String rawToken, String newPassword) {
        UserToken token = userTokenRepository
                .findByTokenHashAndType(SecureTokenGenerator.hash(rawToken), TokenType.PASSWORD_RESET)
                .orElseThrow(ResetLinkInvalidException::new);
        User user = userRepository.findById(token.getUserId()).orElseThrow(ResetLinkInvalidException::new);
        LocalDateTime now = LocalDateTime.now(clock);
        if (token.isUsed()) {
            throw new ResetLinkInvalidException();
        }
        if (token.isExpired(now)) {
            throw new ResetLinkExpiredException();
        }
        PasswordPolicy.violation(newPassword, user.getEmail()).ifPresent(message -> {
            throw new PasswordPolicyViolationException(message);
        });
        // Rejecting here leaves the link unused, so the owner can try again with another password.
        breachGuard.requireNotBreached(newPassword, "password");
        token.markUsed(now);
        userTokenRepository.invalidateActive(user.getId(), TokenType.PASSWORD_RESET, now);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        if (!user.isEmailVerified()) {
            user.markEmailVerified(now);
            userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, now);
        }
        int revoked = sessionRevoker.revokeAll(user.getEmail());
        eventPublisher.publishEvent(new PasswordChangedNoticeRequested(user.getId(), user.getEmail()));
        log.info("Password reset completed userId={} sessionsRevoked={}", user.getId(), revoked);
    }
}
