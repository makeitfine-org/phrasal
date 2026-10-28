package net.phrasal.application.service;

import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.security.SecureTokenGenerator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.net.URI;
import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("VerificationEmailComposer")
class VerificationEmailComposerTest {

    private static final String TOKEN = "abcDEF_-0123456789abcDEF_-0123456789abc";

    private static VerificationEmailComposer composer(String baseUrl, Duration ttl) {
        return new VerificationEmailComposer(new AppProperties(URI.create(baseUrl)),
                new EmailVerificationProperties(ttl, Duration.ofDays(7)));
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
}
