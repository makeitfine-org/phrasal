package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.RegisterRequest;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.security.EmailNormalizer;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.support.TransactionOperations;

/**
 * Sign-up. Every outcome looks the same to the caller, so the endpoint cannot be used to find out which
 * addresses are registered.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private enum Outcome { NEW, PENDING, EXISTING }

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailVerificationService emailVerificationService;
    private final ApplicationEventPublisher eventPublisher;
    private final TransactionOperations transactions;
    private final PasswordBreachGuard breachGuard;

    /**
     * Registers an address. New and unverified addresses get a verification link (an unverified account takes the
     * new password and older links stop working); a verified address gets an "account exists" notice and nothing
     * else changes.
     *
     * @param request address and chosen password
     */
    public void register(RegisterRequest request) {
        if (request.honeypotFilled()) {
            log.info("Registration ignored: honeypot field filled");
            return;
        }
        // Before any lookup, so a breached password is rejected the same way for every kind of address.
        breachGuard.requireNotBreached(request.password(), "password");
        String email = EmailNormalizer.normalize(request.email());
        // Hashed on every path so response time does not depend on whether the address is known.
        String hash = passwordEncoder.encode(request.password());
        Outcome outcome;
        try {
            outcome = transactions.execute(status -> registerOrUpdate(email, hash));
        } catch (DataIntegrityViolationException ex) {
            // Two registrations raced and the other one won. The failed insert rolled its transaction back, so
            // the retry runs in a fresh one and takes the existing-account branch.
            outcome = transactions.execute(status -> registerOrUpdate(email, hash));
        }
        log.debug("Registration accepted outcome={}", outcome);
    }

    private Outcome registerOrUpdate(String email, String hash) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            user = userRepository.saveAndFlush(new User(email, hash, Role.USER));
            emailVerificationService.issueFor(user);
            log.info("Registered user id={}", user.getId());
            return Outcome.NEW;
        }
        if (user.isEmailVerified()) {
            eventPublisher.publishEvent(new AccountExistsNoticeRequested(user.getId(), user.getEmail()));
            return Outcome.EXISTING;
        }
        user.setPasswordHash(hash);
        emailVerificationService.issueFor(user);
        return Outcome.PENDING;
    }
}
