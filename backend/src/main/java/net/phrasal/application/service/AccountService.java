package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.AccountDeletedNoticeRequested;
import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.application.validation.PasswordPolicy;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.InvalidTwoFactorCodeException;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/** Changes made by the signed-in owner of an account. */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {

    private static final String NEW_PASSWORD_FIELD = "newPassword";

    private final AccountChecks accountChecks;
    private final UserRepository userRepository;
    private final TwoFactorService twoFactorService;
    private final SessionRevoker sessionRevoker;
    private final PasswordEncoder passwordEncoder;
    private final PasswordBreachGuard breachGuard;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Replaces the password after checking the current one. Closing the other sessions is the caller's job, because
     * it needs the HTTP session.
     *
     * @param userId          account id
     * @param currentPassword the password as it is now
     * @param newPassword     the new raw password
     * @throws AuthenticationCredentialsNotFoundException if the account no longer exists
     * @throws AdminAccountManagedException               if the account is an admin
     * @throws WrongPasswordException                     if the current password is wrong
     * @throws PasswordPolicyViolationException           if the new password contains the account email, or equals
     *                                                    the current one, or is in a known breach
     */
    public void changePassword(Long userId, String currentPassword, String newPassword) {
        User user = accountChecks.load(userId);
        accountChecks.requireSelfManaged(user);
        accountChecks.requirePassword(user, currentPassword);
        PasswordPolicy.violation(newPassword, user.getEmail()).ifPresent(message -> {
            throw new PasswordPolicyViolationException(NEW_PASSWORD_FIELD, message);
        });
        if (passwordEncoder.matches(newPassword, user.getPasswordHash())) {
            throw new PasswordPolicyViolationException(NEW_PASSWORD_FIELD,
                    "New password must be different from your current one");
        }
        breachGuard.requireNotBreached(newPassword, NEW_PASSWORD_FIELD);
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        eventPublisher.publishEvent(new PasswordChangedNoticeRequested(user.getId(), user.getEmail()));
        log.info("Password changed userId={}", userId);
    }

    /**
     * Deletes the account and everything that hangs off it (tokens, quiz progress, recovery codes), then closes every
     * session of the account. Ending the current request's session is the caller's job, because it needs the HTTP
     * session.
     *
     * @param userId   account id
     * @param password the current password; checked before the code
     * @param code     a TOTP or recovery code; required when two-factor authentication is on
     * @throws AuthenticationCredentialsNotFoundException if the account no longer exists
     * @throws AdminAccountManagedException               if the account is an admin
     * @throws WrongPasswordException                     if the password is wrong
     * @throws InvalidTwoFactorCodeException              if 2FA is on and the code is missing, wrong or used
     */
    public void deleteAccount(Long userId, String password, String code) {
        User user = accountChecks.load(userId);
        accountChecks.requireSelfManaged(user);
        accountChecks.requirePassword(user, password);
        if (user.isTwoFactorEnabled()) {
            if (code == null || code.isBlank()) {
                throw new InvalidTwoFactorCodeException();
            }
            // Its conditional update detaches the loaded user, so only the email is read from it afterwards.
            twoFactorService.verifyCode(userId, code);
        }
        String email = user.getEmail();
        eventPublisher.publishEvent(new AccountDeletedNoticeRequested(userId, email));
        userRepository.deleteById(userId);
        userRepository.flush();
        int revoked = sessionRevoker.revokeAll(email);
        log.info("Account deleted userId={} sessionsRevoked={}", userId, revoked);
    }
}
