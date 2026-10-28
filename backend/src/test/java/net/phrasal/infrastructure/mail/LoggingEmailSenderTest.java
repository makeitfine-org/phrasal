package net.phrasal.infrastructure.mail;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;

class LoggingEmailSenderTest {

    private final LoggingEmailSender sender = new LoggingEmailSender();
    private final Logger logger = (Logger) LoggerFactory.getLogger(LoggingEmailSender.class);
    private ListAppender<ILoggingEvent> appender;

    @BeforeEach
    void attachAppender() {
        appender = new ListAppender<>();
        appender.start();
        logger.addAppender(appender);
    }

    @AfterEach
    void detachAppender() {
        logger.detachAppender(appender);
    }

    @Test
    void send_logsSubjectAndText() {
        sender.send(new EmailMessage("a@b.c", "Confirm", "Open http://x/verify?token=abc", "<p>html</p>"));

        assertThat(appender.list).hasSize(1);
        String line = appender.list.get(0).getFormattedMessage();
        assertThat(line).contains("Confirm", "http://x/verify?token=abc");
    }

    @Test
    void send_doesNotLogRecipientOrHtml() {
        sender.send(new EmailMessage("a@b.c", "Confirm", "text", "<p>html</p>"));

        assertThat(appender.list.get(0).getFormattedMessage()).doesNotContain("a@b.c", "<p>html</p>");
    }

    @Test
    void send_neverThrows() {
        assertThatCode(() -> sender.send(new EmailMessage("a@b.c", "s", "t", "h"))).doesNotThrowAnyException();
    }
}
