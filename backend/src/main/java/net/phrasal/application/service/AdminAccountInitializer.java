package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.validation.PasswordPolicy;
import net.phrasal.config.AdminAccountProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.security.EmailNormalizer;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

/**
 * Creates or repairs the admin account from {@code PHRASAL_ADMIN_EMAIL} / {@code PHRASAL_ADMIN_PASSWORD}
 * on every startup.
 *
 * <p>Takeover rule (intentional): if an account with the admin email already exists, it is promoted to
 * {@code ADMIN} and its password is reset to the configured one. Email confirmation is not implemented yet,
 * so without this rule someone could register the admin email first and keep the account.
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
        User admin = userRepository.save(new User(email, passwordEncoder.encode(properties.password()), Role.ADMIN));
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
        if (promoted || passwordReset) {
            userRepository.save(admin);
        }
        log.info("Admin account id={} checked: promoted={}, passwordReset={}", admin.getId(), promoted, passwordReset);
    }
}
