package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.GoogleIdentity;
import net.phrasal.application.service.GoogleSignInResult.Outcome;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException.Reason;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.EmailNormalizer;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * Finds, links or creates the account for a Google identity: by the Google subject first, then by a verified email,
 * otherwise a new {@code USER} account without a password. Never logs the subject or the email.
 */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GoogleSignInService {

    private static final int EMAIL_MAX_LENGTH = 254;

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final Clock clock;

    /**
     * Resolves the account a Google sign-in reaches. Taking over an unverified local account removes its password
     * and its open verification and reset links, so whoever registered the address without proving it loses access.
     *
     * @param identity the claims of the verified ID token
     * @return the account as the session will hold it, and how it was reached
     * @throws GoogleSignInRefusedException if the email is unverified, the account is linked to another Google
     *                                      account, or it is the admin account
     * @throws IllegalArgumentException     if the subject or the email is blank, or the email is too long to store
     * @throws IllegalStateException        if a concurrent sign-in wrote the same account first
     */
    public GoogleSignInResult signIn(GoogleIdentity identity) {
        if (isBlank(identity.subject()) || isBlank(identity.email())) {
            throw new IllegalArgumentException("Google identity without subject or email");
        }
        String email = EmailNormalizer.normalize(identity.email());
        if (email.length() > EMAIL_MAX_LENGTH) {
            throw new IllegalArgumentException("Google email is too long");
        }

        Optional<User> linked = userRepository.findByGoogleSubject(identity.subject());
        if (linked.isPresent()) {
            refuseAdmin(linked.get());
            return result(linked.get(), Outcome.SIGNED_IN);
        }
        if (!identity.emailVerified()) {
            throw refuse(Reason.EMAIL_UNVERIFIED);
        }
        Optional<User> sameEmail = userRepository.findByEmail(email);
        if (sameEmail.isPresent()) {
            return link(sameEmail.get(), identity.subject());
        }
        return create(email, identity.subject());
    }

    private GoogleSignInResult link(User user, String subject) {
        // Every refusal comes before the first change, so a refused link leaves the account as it was.
        refuseAdmin(user);
        if (user.getGoogleSubject() != null) {
            throw refuse(Reason.ACCOUNT_CONFLICT);
        }
        if (!user.isEmailVerified()) {
            LocalDateTime now = LocalDateTime.now(clock);
            user.removePassword();
            user.markEmailVerified(now);
            userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, now);
            userTokenRepository.invalidateActive(user.getId(), TokenType.PASSWORD_RESET, now);
        }
        user.linkGoogle(subject);
        return result(saveAndFlush(user), Outcome.LINKED);
    }

    private GoogleSignInResult create(String email, String subject) {
        return result(saveAndFlush(User.fromGoogle(email, subject, LocalDateTime.now(clock))), Outcome.CREATED);
    }

    // Flushing here turns a unique-index clash (two first sign-ins at once) into the generic Google error. The next
    // attempt finds the account by its subject.
    private User saveAndFlush(User user) {
        try {
            return userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalStateException("A concurrent sign-in wrote this account first", e);
        }
    }

    private void refuseAdmin(User user) {
        if (user.getRole() == Role.ADMIN) {
            throw refuse(Reason.ADMIN_ACCOUNT);
        }
    }

    private static GoogleSignInRefusedException refuse(Reason reason) {
        log.info("Google sign-in refused reason={}", reason.code());
        return new GoogleSignInRefusedException(reason);
    }

    private static GoogleSignInResult result(User user, Outcome outcome) {
        log.info("Google sign-in userId={} outcome={}", user.getId(), outcome);
        return new GoogleSignInResult(new AuthenticatedUser(user.getId(), user.getEmail(), user.getRole(),
                user.isTwoFactorEnabled(), !user.hasPassword()), outcome);
    }

    private static boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
