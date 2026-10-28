package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Lifetimes for email verification.
 *
 * @param tokenTtl                 how long a verification link stays valid
 * @param unverifiedAccountRetention how long an account may stay unverified before the clean-up job deletes it
 */
@ConfigurationProperties("phrasal.email-verification")
public record EmailVerificationProperties(Duration tokenTtl, Duration unverifiedAccountRetention) {

}
