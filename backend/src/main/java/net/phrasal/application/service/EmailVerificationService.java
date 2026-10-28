package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.VerificationEmailRequested;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.VerificationLinkExpiredException;
import net.phrasal.infrastructure.exception.VerificationLinkInvalidException;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SecureTokenGenerator.IssuedToken;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

/** Issues email verification links and redeems them. */
@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class EmailVerificationService {

    private final UserRepository userRepository;
    private final UserTokenRepository userTokenRepository;
    private final SecureTokenGenerator tokenGenerator;
    private final EmailVerificationProperties properties;
    private final Clock clock;
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Creates a new verification token and queues the email. Older open tokens die, so only the newest link works.
     *
     * @param user account that must verify its address
     */
    public void issueFor(User user) {
        LocalDateTime now = LocalDateTime.now(clock);
        userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, now);
        IssuedToken issued = tokenGenerator.generate();
        userTokenRepository.save(new UserToken(user.getId(), TokenType.EMAIL_VERIFICATION, issued.hash(),
                now.plus(properties.tokenTtl())));
        eventPublisher.publishEvent(new VerificationEmailRequested(user.getId(), user.getEmail(), issued.rawToken()));
    }

    /**
     * Redeems a link. Repeating a successful redemption is a no-op.
     *
     * @param rawToken token from the emailed link
     * @throws VerificationLinkInvalidException if the token is unknown or was replaced by a newer one
     * @throws VerificationLinkExpiredException if the token is past its expiry
     */
    public void verify(String rawToken) {
        UserToken token = userTokenRepository
                .findByTokenHashAndType(SecureTokenGenerator.hash(rawToken), TokenType.EMAIL_VERIFICATION)
                .orElseThrow(VerificationLinkInvalidException::new);
        User user = userRepository.findById(token.getUserId()).orElseThrow(VerificationLinkInvalidException::new);
        LocalDateTime now = LocalDateTime.now(clock);
        if (token.isUsed()) {
            if (user.isEmailVerified()) {
                return;
            }
            throw new VerificationLinkInvalidException();
        }
        if (token.isExpired(now)) {
            throw new VerificationLinkExpiredException();
        }
        token.markUsed(now);
        user.markEmailVerified(now);
        userTokenRepository.invalidateActive(user.getId(), TokenType.EMAIL_VERIFICATION, now);
        log.info("Email verified userId={}", user.getId());
    }

    /**
     * Sends a new link to an unverified account. Unknown and verified addresses are ignored silently.
     *
     * @param rawEmail address as typed by the user
     */
    public void resend(String rawEmail) {
        userRepository.findByEmail(EmailNormalizer.normalize(rawEmail))
                .filter(user -> !user.isEmailVerified())
                .ifPresent(this::issueFor);
    }
}
