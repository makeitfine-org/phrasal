package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.application.event.EmailChangeConfirmationRequested;
import net.phrasal.application.event.EmailChangedNoticeRequested;
import net.phrasal.config.EmailChangeProperties;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.EmailChangeConflictException;
import net.phrasal.infrastructure.exception.EmailChangeLinkExpiredException;
import net.phrasal.infrastructure.exception.EmailChangeLinkInvalidException;
import net.phrasal.infrastructure.exception.FieldValidationException;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SecureTokenGenerator.IssuedToken;
import net.phrasal.infrastructure.security.SessionRevoker;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

/** Moves an account to a new address, confirmed by a link sent to that address. */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EmailChangeService {

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final AccountChecks accountChecks;
    private final SecureTokenGenerator tokenGenerator;
    private final EmailChangeProperties properties;
    private final SessionRevoker sessionRevoker;
    private final Clock clock;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Sends a confirmation link to the new address. The email does not change yet. If the address already has an
     * account, that account gets a notice instead and the caller cannot tell the difference.
     *
     * @param userId          account id from the session principal
     * @param rawNewEmail     the new address as typed
     * @param currentPassword the account's current password
     * @throws FieldValidationException if the new address equals the current one
     */
    public void requestChange(Long userId, String rawNewEmail, String currentPassword) {
        User user = accountChecks.load(userId);
        accountChecks.requireSelfManaged(user);
        String newEmail = EmailNormalizer.normalize(rawNewEmail);
        if (newEmail.equals(user.getEmail())) {
            throw new FieldValidationException("newEmail", "New email must be different from your current one");
        }
        accountChecks.requirePassword(user, currentPassword);
        if (userRepository.existsByEmail(newEmail)) {
            eventPublisher.publishEvent(new AccountExistsNoticeRequested(userId, newEmail));
            log.info("Email change requested for a taken address userId={}", userId);
            return;
        }
        LocalDateTime now = LocalDateTime.now(clock);
        userTokenRepository.invalidateActive(userId, TokenType.EMAIL_CHANGE, now);
        IssuedToken issued = tokenGenerator.generate();
        userTokenRepository.save(UserToken.emailChange(userId, issued.hash(), now.plus(properties.tokenTtl()),
                newEmail));
        eventPublisher.publishEvent(new EmailChangeConfirmationRequested(userId, newEmail, issued.rawToken()));
        log.info("Email change requested userId={}", userId);
    }

    /**
     * Applies the change through the emailed link and closes every session of the account. A link works once.
     *
     * @param rawToken token from the emailed link
     * @throws EmailChangeLinkInvalidException if the token is unknown, already used or replaced by a newer one
     * @throws EmailChangeLinkExpiredException if the token is past its expiry
     * @throws EmailChangeConflictException    if the address was taken in the meantime
     */
    public void confirmChange(String rawToken) {
        UserToken token = userTokenRepository
                .findByTokenHashAndType(SecureTokenGenerator.hash(rawToken), TokenType.EMAIL_CHANGE)
                .orElseThrow(EmailChangeLinkInvalidException::new);
        User user = userRepository.findById(token.getUserId()).orElseThrow(EmailChangeLinkInvalidException::new);
        LocalDateTime now = LocalDateTime.now(clock);
        if (token.isUsed()) {
            throw new EmailChangeLinkInvalidException();
        }
        if (token.isExpired(now)) {
            throw new EmailChangeLinkExpiredException();
        }
        String newEmail = token.getNewEmail();
        if (userRepository.existsByEmail(newEmail)) {
            throw new EmailChangeConflictException();
        }
        String oldEmail = user.getEmail();
        user.setEmail(newEmail);
        user.markEmailVerified(now);
        token.markUsed(now);
        userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_CHANGE, now);
        userTokenRepository.invalidateActive(user.getId(), TokenType.PASSWORD_RESET, now);
        userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, now);
        try {
            userRepository.saveAndFlush(user);
        } catch (DataIntegrityViolationException e) {
            throw new EmailChangeConflictException();
        }
        int revoked = sessionRevoker.revokeAll(oldEmail);
        eventPublisher.publishEvent(new EmailChangedNoticeRequested(user.getId(), oldEmail, newEmail));
        log.info("Email changed userId={} sessionsRevoked={}", user.getId(), revoked);
    }
}
