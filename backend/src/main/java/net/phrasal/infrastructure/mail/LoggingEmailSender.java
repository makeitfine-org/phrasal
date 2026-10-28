package net.phrasal.infrastructure.mail;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Component;

/**
 * Logs the message instead of sending it, so the verification link is visible in local runs without an SMTP relay.
 * Never active in production: the prod profile sets {@code phrasal.mail.enabled=true}.
 */
@Slf4j
@Component
@ConditionalOnProperty(name = "phrasal.mail.enabled", havingValue = "false", matchIfMissing = true)
public class LoggingEmailSender implements EmailSender {

    @Override
    public void send(EmailMessage message) {
        log.info("Mail disabled; would send '{}'. Text:\n{}", message.subject(), message.text());
    }
}
