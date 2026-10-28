package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.infrastructure.mail.EmailMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import java.time.Duration;

/** Builds the account emails as plain Java text blocks; no template engine. */
@Component
@RequiredArgsConstructor
public class VerificationEmailComposer {

    static final String VERIFICATION_SUBJECT = "Confirm your Phrasal account";
    static final String ACCOUNT_EXISTS_SUBJECT = "You already have a Phrasal account";

    private static final long MINUTES_PER_HOUR = 60;

    private final AppProperties appProperties;
    private final EmailVerificationProperties verificationProperties;

    /**
     * Email with the link that confirms the address.
     *
     * @param to       recipient address
     * @param rawToken secret token; base64url, so it needs no URL encoding
     * @return multipart message
     */
    public EmailMessage verification(String to, String rawToken) {
        String link = appProperties.baseUrl() + "/verify-email?token=" + rawToken;
        String lifetime = describe(verificationProperties.tokenTtl());
        String text = """
                Welcome to Phrasal!

                Confirm your email address to finish creating your account:
                %s

                This link expires in %s.

                If you didn't sign up, ignore this email.
                """.formatted(link, lifetime);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>Welcome to Phrasal!</p>
                <p>Confirm your email address to finish creating your account:</p>
                <p><a href="%1$s">Confirm my email</a></p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                <p>This link expires in %2$s.</p>
                <p>If you didn't sign up, ignore this email.</p>
                """.formatted(safeLink, HtmlUtils.htmlEscape(lifetime));
        return new EmailMessage(to, VERIFICATION_SUBJECT, text, html);
    }

    /**
     * Notice for someone who registered an address that already has a verified account.
     *
     * @param to recipient address
     * @return multipart message with a link to the login page and no token
     */
    public EmailMessage accountExists(String to) {
        String link = appProperties.baseUrl() + "/login";
        String text = """
                Someone tried to create a Phrasal account with this email address, but you already have one.

                Log in here:
                %s

                If this wasn't you, you can ignore this email.
                """.formatted(link);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>Someone tried to create a Phrasal account with this email address, but you already have one.</p>
                <p><a href="%1$s">Log in</a></p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                <p>If this wasn't you, you can ignore this email.</p>
                """.formatted(safeLink);
        return new EmailMessage(to, ACCOUNT_EXISTS_SUBJECT, text, html);
    }

    private static String describe(Duration ttl) {
        long minutes = ttl.toMinutes();
        if (minutes >= MINUTES_PER_HOUR && minutes % MINUTES_PER_HOUR == 0) {
            long hours = minutes / MINUTES_PER_HOUR;
            return hours + (hours == 1 ? " hour" : " hours");
        }
        return minutes + (minutes == 1 ? " minute" : " minutes");
    }
}
