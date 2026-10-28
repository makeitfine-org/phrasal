package net.phrasal.application.service;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.application.event.VerificationEmailRequested;
import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.mail.EmailSender;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailSendException;

import java.net.URI;
import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

@DisplayName("VerificationEmailListener")
class VerificationEmailListenerTest {

    private static final String TOKEN = "secret-token-value";

    private final EmailSender sender = mock(EmailSender.class);
    private final VerificationEmailListener listener = new VerificationEmailListener(
            new VerificationEmailComposer(new AppProperties(URI.create("https://phrasalbox.com")),
                    new EmailVerificationProperties(Duration.ofHours(24), Duration.ofDays(7))),
            sender);
    private final Logger logger = (Logger) LoggerFactory.getLogger(VerificationEmailListener.class);
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
    @DisplayName("sends the verification email to the event's address")
    void sendsVerification() {
        listener.onVerificationEmailRequested(new VerificationEmailRequested(7L, "a@b.com", TOKEN));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("a@b.com");
        assertThat(captor.getValue().text()).contains("verify-email?token=" + TOKEN);
        assertThat(appender.list).extracting(ILoggingEvent::getFormattedMessage)
                .containsExactly("Verification email sent userId=7");
    }

    @Test
    @DisplayName("sends the account-exists notice without a token")
    void sendsNotice() {
        listener.onAccountExistsNoticeRequested(new AccountExistsNoticeRequested(7L, "a@b.com"));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("a@b.com");
        assertThat(captor.getValue().text()).contains("/login");
    }

    @Test
    @DisplayName("a sender failure is swallowed and logged without the token or the address")
    void swallowsFailure() {
        doThrow(new MailSendException("relay down for a@b.com " + TOKEN)).when(sender).send(any());

        assertThatCode(() -> listener.onVerificationEmailRequested(
                new VerificationEmailRequested(7L, "a@b.com", TOKEN))).doesNotThrowAnyException();

        assertThat(appender.list).hasSize(1);
        String line = appender.list.get(0).getFormattedMessage();
        assertThat(line).isEqualTo("Verification email failed userId=7: MailSendException");
        assertThat(line).doesNotContain(TOKEN, "a@b.com");
    }

    @Test
    @DisplayName("event toString hides the token and the address")
    void eventToStringMasks() {
        assertThat(new VerificationEmailRequested(7L, "a@b.com", TOKEN).toString())
                .contains("7").doesNotContain(TOKEN, "a@b.com");
        assertThat(new AccountExistsNoticeRequested(7L, "a@b.com").toString()).doesNotContain("a@b.com");
    }
}
