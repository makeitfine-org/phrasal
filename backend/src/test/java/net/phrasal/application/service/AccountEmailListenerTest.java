package net.phrasal.application.service;

import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import net.phrasal.application.event.AccountDeletedNoticeRequested;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.application.event.EmailChangeConfirmationRequested;
import net.phrasal.application.event.EmailChangedNoticeRequested;
import net.phrasal.application.event.PasswordChangedNoticeRequested;
import net.phrasal.application.event.PasswordResetEmailRequested;
import net.phrasal.application.event.TwoFactorChangedNoticeRequested;
import net.phrasal.application.event.VerificationEmailRequested;
import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailChangeProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.config.PasswordResetProperties;
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
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@DisplayName("AccountEmailListener")
class AccountEmailListenerTest {

    private static final String TOKEN = "secret-token-value";

    private final EmailSender sender = mock(EmailSender.class);
    private final AccountEmailListener listener = new AccountEmailListener(
            new AccountEmailComposer(new AppProperties(URI.create("https://phrasalbox.com")),
                    new EmailVerificationProperties(Duration.ofHours(24), Duration.ofDays(7)),
                    new PasswordResetProperties(Duration.ofHours(1)),
                    new EmailChangeProperties(Duration.ofHours(1))),
            sender);
    private final Logger logger = (Logger) LoggerFactory.getLogger(AccountEmailListener.class);
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
                .containsExactly("Account email sent userId=7");
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
    @DisplayName("sends the password reset email with the link to the event's address")
    void sendsPasswordReset() {
        listener.onPasswordResetEmailRequested(new PasswordResetEmailRequested(7L, "a@b.com", TOKEN));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("a@b.com");
        assertThat(captor.getValue().subject()).isEqualTo("Reset your Phrasal password");
        assertThat(captor.getValue().text()).contains("reset-password?token=" + TOKEN);
        assertThat(appender.list).extracting(ILoggingEvent::getFormattedMessage)
                .containsExactly("Account email sent userId=7");
    }

    @Test
    @DisplayName("sends the password-changed notice without a token")
    void sendsPasswordChanged() {
        listener.onPasswordChangedNoticeRequested(new PasswordChangedNoticeRequested(7L, "a@b.com"));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("a@b.com");
        assertThat(captor.getValue().subject()).isEqualTo("Your Phrasal password was changed");
        assertThat(captor.getValue().text()).contains("/forgot-password").doesNotContain("token=");
    }

    @Test
    @DisplayName("sends the email change link to the new address")
    void sendsEmailChangeConfirmation() {
        listener.onEmailChangeConfirmationRequested(new EmailChangeConfirmationRequested(7L, "new@b.com", TOKEN));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("new@b.com");
        assertThat(captor.getValue().text()).contains("confirm-email-change?token=" + TOKEN);
    }

    @Test
    @DisplayName("sends the email changed notice to the old address")
    void sendsEmailChanged() {
        listener.onEmailChangedNoticeRequested(new EmailChangedNoticeRequested(7L, "old@b.com", "new@b.com"));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("old@b.com");
        assertThat(captor.getValue().text()).contains("new@b.com");
    }

    @Test
    @DisplayName("a failure while sending the email change mails is swallowed")
    void swallowsEmailChangeFailures() {
        doThrow(new MailSendException("relay down")).when(sender).send(any());

        assertThatCode(() -> {
            listener.onEmailChangeConfirmationRequested(new EmailChangeConfirmationRequested(7L, "n@b.com", TOKEN));
            listener.onEmailChangedNoticeRequested(new EmailChangedNoticeRequested(7L, "o@b.com", "n@b.com"));
        }).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("a failure while sending a reset or changed mail is swallowed and the WARN has no token")
    void swallowsResetFailures() {
        doThrow(new MailSendException("relay down for a@b.com " + TOKEN)).when(sender).send(any());

        assertThatCode(() -> {
            listener.onPasswordResetEmailRequested(new PasswordResetEmailRequested(7L, "a@b.com", TOKEN));
            listener.onPasswordChangedNoticeRequested(new PasswordChangedNoticeRequested(7L, "a@b.com"));
        }).doesNotThrowAnyException();

        assertThat(appender.list).hasSize(2)
                .allSatisfy(event -> assertThat(event.getFormattedMessage())
                        .isEqualTo("Account email failed userId=7: MailSendException"));
    }

    @Test
    @DisplayName("a sender failure is swallowed and logged without the token or the address")
    void swallowsFailure() {
        doThrow(new MailSendException("relay down for a@b.com " + TOKEN)).when(sender).send(any());

        assertThatCode(() -> listener.onVerificationEmailRequested(
                new VerificationEmailRequested(7L, "a@b.com", TOKEN))).doesNotThrowAnyException();

        assertThat(appender.list).hasSize(1);
        String line = appender.list.get(0).getFormattedMessage();
        assertThat(line).isEqualTo("Account email failed userId=7: MailSendException");
        assertThat(line).doesNotContain(TOKEN, "a@b.com");
    }

    @Test
    @DisplayName("event toString hides the token and the address")
    void eventToStringMasks() {
        assertThat(new VerificationEmailRequested(7L, "a@b.com", TOKEN).toString())
                .contains("7").doesNotContain(TOKEN, "a@b.com");
        assertThat(new AccountExistsNoticeRequested(7L, "a@b.com").toString()).doesNotContain("a@b.com");
        assertThat(new PasswordResetEmailRequested(7L, "a@b.com", TOKEN).toString())
                .contains("7").doesNotContain(TOKEN, "a@b.com");
        assertThat(new PasswordChangedNoticeRequested(7L, "a@b.com").toString())
                .contains("7").doesNotContain("a@b.com");
        assertThat(new TwoFactorChangedNoticeRequested(7L, "a@b.com", true).toString())
                .contains("7", "true").doesNotContain("a@b.com");
    }

    @Test
    @DisplayName("sends the two-factor notice for both states, without a token")
    void sendsTwoFactorChanged() {
        listener.onTwoFactorChangedNoticeRequested(new TwoFactorChangedNoticeRequested(7L, "a@b.com", true));
        listener.onTwoFactorChangedNoticeRequested(new TwoFactorChangedNoticeRequested(7L, "a@b.com", false));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender, times(2)).send(captor.capture());
        assertThat(captor.getAllValues()).extracting(EmailMessage::subject).containsExactly(
                "Two-factor authentication is on for your Phrasal account",
                "Two-factor authentication is off for your Phrasal account");
        assertThat(captor.getAllValues()).allSatisfy(message -> {
            assertThat(message.to()).isEqualTo("a@b.com");
            assertThat(message.text()).doesNotContain("token=");
        });
    }

    @Test
    @DisplayName("a failure while sending the two-factor notice is swallowed")
    void swallowsTwoFactorFailure() {
        doThrow(new MailSendException("relay down for a@b.com")).when(sender).send(any());

        assertThatCode(() -> listener.onTwoFactorChangedNoticeRequested(
                new TwoFactorChangedNoticeRequested(7L, "a@b.com", false))).doesNotThrowAnyException();

        assertThat(appender.list).extracting(ILoggingEvent::getFormattedMessage)
                .containsExactly("Account email failed userId=7: MailSendException");
    }

    @Test
    @DisplayName("sends the account-deleted notice to the old address; the event does not print the address")
    void sendsAccountDeleted() {
        listener.onAccountDeletedNoticeRequested(new AccountDeletedNoticeRequested(7L, "a@b.com"));

        ArgumentCaptor<EmailMessage> captor = ArgumentCaptor.forClass(EmailMessage.class);
        verify(sender).send(captor.capture());
        assertThat(captor.getValue().to()).isEqualTo("a@b.com");
        assertThat(captor.getValue().subject()).isEqualTo("Your Phrasal account was deleted");
        assertThat(new AccountDeletedNoticeRequested(7L, "a@b.com").toString())
                .contains("7").doesNotContain("a@b.com");
    }
}
