package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Settings of the breached-password check.
 *
 * @param enabled whether passwords are checked at all
 * @param timeout connect and read timeout of the lookup; when it passes, the password is accepted
 */
@ConfigurationProperties("phrasal.password.breach-check")
public record PasswordBreachCheckProperties(boolean enabled, Duration timeout) {

}
