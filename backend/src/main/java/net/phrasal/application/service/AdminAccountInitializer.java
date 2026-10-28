package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.validation.PasswordPolicy;
import net.phrasal.config.AdminAccountProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.security.EmailNormalizer;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Clock;
import java.time.LocalDateTime;

/**
 * Creates or repairs the admin account from {@code PHRASAL_ADMIN_EMAIL} / {@code PHRASAL_ADMIN_PASSWORD}
 * on every startup.
 *
 * <p>Takeover rule (intentional): if an account with the admin email already exists, it is promoted to
 * {@code ADMIN}, marked verified and its password is reset to the configured one. Someone could still register
 * the admin address before the first boot; they cannot verify it, and the initializer takes it over.
 * The admin account is always verified, so it can log in without a mailbox.
 * A configured password that breaks the password policy fails startup.
 */
@Slf4j
@Component
@Transactional
@RequiredArgsConstructor
public class AdminAccountInitializer implements ApplicationRunner {

    private final AdminAccountProperties properties;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserTokenRepository userTokenRepository;
    private final Clock clock;

    @Override
    public void run(ApplicationArguments args) {
        if (!properties.isConfigured()) {
            log.info("Admin bootstrap skipped: PHRASAL_ADMIN_EMAIL/PASSWORD not set");
            return;
        }
        PasswordPolicy.violation(properties.password()).ifPresent(message -> {
            throw new IllegalStateException("Configured admin password is rejected: " + message);
        });
        String email = EmailNormalizer.normalize(properties.email());
        userRepository.findByEmail(email).ifPresentOrElse(this::repair, () -> create(email));
    }

    private void create(String email) {
        User admin = new User(email, passwordEncoder.encode(properties.password()), Role.ADMIN);
        admin.markEmailVerified(LocalDateTime.now(clock));
        admin = userRepository.save(admin);
        log.info("Admin account created id={}", admin.getId());
    }

    private void repair(User admin) {
        boolean promoted = admin.getRole() != Role.ADMIN;
        boolean passwordReset = admin.getPasswordHash() == null
                || !passwordEncoder.matches(properties.password(), admin.getPasswordHash());
        if (promoted) {
            admin.setRole(Role.ADMIN);
        }
        if (passwordReset) {
            admin.setPasswordHash(passwordEncoder.encode(properties.password()));
        }
        boolean verified = !admin.isEmailVerified();
        if (verified) {
            LocalDateTime now = LocalDateTime.now(clock);
            admin.markEmailVerified(now);
            userTokenRepository.invalidateActive(admin.getId(), TokenType.EMAIL_VERIFICATION, now);
        }
        if (promoted || passwordReset || verified) {
            userRepository.save(admin);
        }
        log.info("Admin account id={} checked: promoted={}, passwordReset={}, verified={}", admin.getId(), promoted,
                passwordReset, verified);
    }
}
