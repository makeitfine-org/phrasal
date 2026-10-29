package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Lifetime of password reset links.
 *
 * @param tokenTtl how long a reset link stays valid
 */
@ConfigurationProperties("phrasal.password-reset")
public record PasswordResetProperties(Duration tokenTtl) {

}
