package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Outgoing mail settings. SMTP connection details live under {@code spring.mail}.
 *
 * @param enabled {@code true} sends through SMTP, {@code false} only logs the message
 * @param from    display name and address of the sender
 */
@ConfigurationProperties("phrasal.mail")
public record PhrasalMailProperties(boolean enabled, String from) {

}
