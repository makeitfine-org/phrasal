package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Fixed-window limits for the unauthenticated auth endpoints.
 *
 * @param enabled         master switch; when false nothing is limited
 * @param registerPerIp   registrations per client IP
 * @param registerPerEmail registrations per normalized email
 * @param loginPerIp      login attempts per client IP
 * @param loginPerEmail   login attempts per normalized email
 * @param resendPerIp     verification email resends per client IP
 * @param resendPerEmail  verification email resends per normalized email
 * @param verifyPerIp     verification link redemptions per client IP
 * @param forgotPerIp     password reset requests per client IP
 * @param forgotPerEmail  password reset requests per normalized email
 * @param resetPerIp      password reset submissions per client IP
 */
@ConfigurationProperties("phrasal.rate-limit")
public record RateLimitProperties(boolean enabled, Rule registerPerIp, Rule registerPerEmail, Rule loginPerIp,
                                  Rule loginPerEmail, Rule resendPerIp, Rule resendPerEmail, Rule verifyPerIp,
                                  Rule forgotPerIp, Rule forgotPerEmail, Rule resetPerIp) {

    /**
     * One limit.
     *
     * @param limit  allowed requests per window
     * @param window window length, counted from the first request
     */
    public record Rule(int limit, Duration window) {

    }
}
