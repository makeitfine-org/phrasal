package net.phrasal.integration.support;

import net.phrasal.infrastructure.mail.EmailSender;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

/** Replaces the production {@link EmailSender} with a recorder in integration tests. */
@TestConfiguration
public class RecordingEmailSenderConfig {

    @Bean
    @Primary
    public RecordingEmailSender recordingEmailSender() {
        return new RecordingEmailSender();
    }
}
