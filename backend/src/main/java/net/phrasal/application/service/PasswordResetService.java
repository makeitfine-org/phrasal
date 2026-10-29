package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.PasswordResetEmailRequested;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.entity.UserToken;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import net.phrasal.infrastructure.security.SecureTokenGenerator.IssuedToken;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

/** Issues password reset links. */
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
}
