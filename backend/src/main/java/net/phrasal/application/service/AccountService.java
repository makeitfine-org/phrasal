package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.application.validation.PasswordPolicy;
import net.phrasal.domain.entity.User;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
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
    private final PasswordEncoder passwordEncoder;
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
     *                                                    the current one
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
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        eventPublisher.publishEvent(new PasswordChangedNoticeRequested(user.getId(), user.getEmail()));
        log.info("Password changed userId={}", userId);
    }
}
