package net.phrasal.application.service;

import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.net.URI;
import java.time.Duration;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("AccountEmailComposer")
class AccountEmailComposerTest {

    private static final String TOKEN = "abcDEF_-0123456789abcDEF_-0123456789abc";

    private static AccountEmailComposer composer(String baseUrl, Duration ttl) {
        return composer(baseUrl, ttl, Duration.ofHours(1));
    }

    private static AccountEmailComposer composer(String baseUrl, Duration ttl, Duration resetTtl) {
        return new AccountEmailComposer(new AppProperties(URI.create(baseUrl)),
                new EmailVerificationProperties(ttl, Duration.ofDays(7)), new PasswordResetProperties(resetTtl));
    }

    @Test
    @DisplayName("verification link uses the base URL, the verify path and the raw token")
    void linkParts() {
        EmailMessage message = composer("https://phrasalbox.com", Duration.ofHours(24)).verification("a@b.com", TOKEN);

        String link = "https://phrasalbox.com/verify-email?token=" + TOKEN;
        assertThat(message.to()).isEqualTo("a@b.com");
        assertThat(message.subject()).isEqualTo("Confirm your Phrasal account");
        assertThat(message.text()).contains(link).contains("ignore this email");
        assertThat(message.html()).contains("<a href=\"" + link + "\">");
    }

    @Test
    @DisplayName("a generated token needs no URL encoding")
    void generatedTokenIsUrlSafe() {
        String raw = new SecureTokenGenerator().generate().rawToken();

        assertThat(raw).matches("[A-Za-z0-9_-]{43}");
    }

    @Test
    @DisplayName("expiry is described in hours for whole hours and in minutes otherwise")
    void lifetimeUnits() {
        assertThat(composer("http://x.test", Duration.ofHours(24)).verification("a@b.com", TOKEN).text())
                .contains("expires in 24 hours");
        assertThat(composer("http://x.test", Duration.ofHours(1)).verification("a@b.com", TOKEN).text())
                .contains("expires in 1 hour.");
        assertThat(composer("http://x.test", Duration.ofMinutes(30)).verification("a@b.com", TOKEN).text())
                .contains("expires in 30 minutes");
    }

    @Test
    @DisplayName("HTML escapes the link, the text keeps it raw")
    void htmlEscapesLink() {
        EmailMessage message = composer("http://x.test?a=1&b=2", Duration.ofHours(24)).verification("a@b.com", TOKEN);

        assertThat(message.html()).contains("a=1&amp;b=2").doesNotContain("a=1&b=2");
        assertThat(message.text()).contains("a=1&b=2");
    }

    @Test
    @DisplayName("account-exists notice links to the login page and carries no token")
    void accountExists() {
        EmailMessage message = composer("https://phrasalbox.com", Duration.ofHours(24)).accountExists("a@b.com");

        assertThat(message.subject()).isEqualTo("You already have a Phrasal account");
        assertThat(message.text()).contains("https://phrasalbox.com/login").doesNotContain("token");
        assertThat(message.html()).contains("https://phrasalbox.com/login").doesNotContain("token");
    }

    @Test
    @DisplayName("reset link uses the base URL, the reset path and the raw token")
    void resetLinkParts() {
        EmailMessage message = composer("https://phrasalbox.com", Duration.ofHours(24)).passwordReset("a@b.com", TOKEN);

        String link = "https://phrasalbox.com/reset-password?token=" + TOKEN;
        assertThat(message.to()).isEqualTo("a@b.com");
        assertThat(message.subject()).isEqualTo("Reset your Phrasal password");
        assertThat(message.text()).contains(link).contains("works once").contains("your password stays the same");
        assertThat(message.html()).contains("<a href=\"" + link + "\">Choose a new password</a>");
    }

    @Test
    @DisplayName("reset expiry comes from the reset TTL: one hour, thirty minutes")
    void resetLifetime() {
        assertThat(composer("http://x.test", Duration.ofHours(24), Duration.ofHours(1))
                .passwordReset("a@b.com", TOKEN).text()).contains("expires in 1 hour and");
        assertThat(composer("http://x.test", Duration.ofHours(24), Duration.ofMinutes(30))
                .passwordReset("a@b.com", TOKEN).text()).contains("expires in 30 minutes and");
    }

    @Test
    @DisplayName("reset HTML escapes a base URL containing an ampersand, the text keeps it raw")
    void resetHtmlEscapes() {
        EmailMessage message = composer("http://x.test?a=1&b=2", Duration.ofHours(24)).passwordReset("a@b.com", TOKEN);

        assertThat(message.html()).contains("a=1&amp;b=2").doesNotContain("a=1&b=2");
        assertThat(message.text()).contains("a=1&b=2");
    }

    @Test
    @DisplayName("password-changed notice links to forgot-password and carries no token")
    void passwordChanged() {
        EmailMessage message = composer("https://phrasalbox.com", Duration.ofHours(24)).passwordChanged("a@b.com");

        assertThat(message.to()).isEqualTo("a@b.com");
        assertThat(message.subject()).isEqualTo("Your Phrasal password was changed");
        assertThat(message.text()).contains("https://phrasalbox.com/forgot-password").doesNotContain("token=");
        assertThat(message.html()).contains("https://phrasalbox.com/forgot-password").doesNotContain("token=");
    }

    @Test
    @DisplayName("two-factor notices have the right subject, both links and no token or secret")
    void twoFactorChanged() {
        AccountEmailComposer composer = composer("https://phrasalbox.com", Duration.ofHours(24));

        EmailMessage on = composer.twoFactorChanged("a@b.com", true);
        EmailMessage off = composer.twoFactorChanged("a@b.com", false);

        assertThat(on.subject()).isEqualTo("Two-factor authentication is on for your Phrasal account");
        assertThat(off.subject()).isEqualTo("Two-factor authentication is off for your Phrasal account");
        assertThat(on.text()).contains("turned on");
        assertThat(off.text()).contains("turned off");
        for (EmailMessage message : List.of(on, off)) {
            assertThat(message.to()).isEqualTo("a@b.com");
            assertThat(message.text()).contains("https://phrasalbox.com/forgot-password",
                    "https://phrasalbox.com/account/security").doesNotContain("token=");
            assertThat(message.html()).contains("https://phrasalbox.com/forgot-password",
                    "https://phrasalbox.com/account/security").doesNotContain("token=", "secret=");
            assertThat(message.text()).doesNotContainPattern("[A-Z2-7]{16,}");
        }
    }

    @Test
    @DisplayName("the two token emails never link to each other's page")
    void purposesStayApart() {
        AccountEmailComposer composer = composer("https://phrasalbox.com", Duration.ofHours(24));

        assertThat(composer.passwordReset("a@b.com", TOKEN).text()).doesNotContain("/verify-email");
        assertThat(composer.verification("a@b.com", TOKEN).text()).doesNotContain("/reset-password");
    }
}
