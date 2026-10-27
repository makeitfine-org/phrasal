package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Fixed-window limits for the unauthenticated auth endpoints.
 *
 * @param enabled         master switch; when false nothing is limited
 * @param registerPerIp   registrations per client IP
 * @param loginPerIp      login attempts per client IP
 * @param loginPerEmail   login attempts per normalized email
 */
@ConfigurationProperties("phrasal.rate-limit")
public record RateLimitProperties(boolean enabled, Rule registerPerIp, Rule loginPerIp, Rule loginPerEmail) {

    /**
     * One limit.
     *
     * @param limit  allowed requests per window
     * @param window window length, counted from the first request
     */
    public record Rule(int limit, Duration window) {

    }
}
