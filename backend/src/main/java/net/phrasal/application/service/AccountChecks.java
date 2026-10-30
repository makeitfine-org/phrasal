package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.AdminAccountManagedException;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/** The checks every signed-in account change shares: the account still exists, may change, and its owner is here. */
@Component
@RequiredArgsConstructor
public class AccountChecks {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Loads the signed-in account.
     *
     * @param userId account id from the session principal
     * @return the account
     * @throws AuthenticationCredentialsNotFoundException if the account was deleted while the session was open
     */
    public User load(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AuthenticationCredentialsNotFoundException("Account no longer exists"));
    }

    /**
     * Refuses the admin account, whose email and password come from server configuration at every start.
     *
     * @param user the account to change
     * @throws AdminAccountManagedException if the account is an admin
     */
    public void requireSelfManaged(User user) {
        if (user.getRole() == Role.ADMIN) {
            throw new AdminAccountManagedException();
        }
    }

    /**
     * Checks the current password the user typed to confirm an account change.
     *
     * @param user the account to change
     * @param raw  the password as typed
     * @throws WrongPasswordException if the password is wrong, or the account has none
     */
    public void requirePassword(User user, String raw) {
        if (user.getPasswordHash() == null || !passwordEncoder.matches(raw, user.getPasswordHash())) {
            throw new WrongPasswordException();
        }
    }
}
