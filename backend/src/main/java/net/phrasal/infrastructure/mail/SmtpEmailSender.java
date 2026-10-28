package net.phrasal.infrastructure.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.config.PhrasalMailProperties;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.mail.MailPreparationException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;

/** Delivers email through the configured SMTP relay. Active when {@code phrasal.mail.enabled=true}. */
@Slf4j
@Component
@RequiredArgsConstructor
@ConditionalOnProperty(name = "phrasal.mail.enabled", havingValue = "true")
public class SmtpEmailSender implements EmailSender {

    private final JavaMailSender mailSender;
    private final PhrasalMailProperties properties;

    @Override
    public void send(EmailMessage message) {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());
            helper.setFrom(properties.from());
            helper.setTo(message.to());
            helper.setSubject(message.subject());
            helper.setText(message.text(), message.html());
        } catch (MessagingException e) {
            throw new MailPreparationException(e);
        }
        mailSender.send(mimeMessage);
        log.debug("Sent email subject={}", message.subject());
    }
}
