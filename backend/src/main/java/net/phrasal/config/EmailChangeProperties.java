package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.time.Duration;

/**
 * Lifetime of email change links.
 *
 * @param tokenTtl how long a confirmation link stays valid
 */
@ConfigurationProperties("phrasal.email-change")
public record EmailChangeProperties(Duration tokenTtl) {

}
