package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.security.BreachedPasswordChecker;
import org.springframework.stereotype.Component;

/** Turns a breached password into the same field error the other password rules give. */
@Component
@RequiredArgsConstructor
public class PasswordBreachGuard {

    static final String BREACHED = "This password has appeared in a data breach. Choose a different one.";

    private final BreachedPasswordChecker checker;

    /**
     * Rejects a password found in a known breach.
     *
     * @param password the raw password
     * @param field    name of the request field the error belongs to
     * @throws PasswordPolicyViolationException if the password is breached
     */
    public void requireNotBreached(String password, String field) {
        if (checker.isBreached(password)) {
            throw new PasswordPolicyViolationException(field, BREACHED);
        }
    }
}
