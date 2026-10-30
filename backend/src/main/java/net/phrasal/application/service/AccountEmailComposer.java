package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.config.AppProperties;
import net.phrasal.config.EmailChangeProperties;
import net.phrasal.config.EmailVerificationProperties;
import net.phrasal.config.PasswordResetProperties;
import net.phrasal.infrastructure.mail.EmailMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import java.time.Duration;

/**
 * Builds the account emails (verification, account exists, password reset, password changed, email change,
 * two-factor changed) as plain Java text blocks; no template engine.
 */
@Component
@RequiredArgsConstructor
public class AccountEmailComposer {

    static final String VERIFICATION_SUBJECT = "Confirm your Phrasal account";
    static final String ACCOUNT_EXISTS_SUBJECT = "You already have a Phrasal account";
    static final String PASSWORD_RESET_SUBJECT = "Reset your Phrasal password";
    static final String PASSWORD_CHANGED_SUBJECT = "Your Phrasal password was changed";
    static final String EMAIL_CHANGE_SUBJECT = "Confirm your new Phrasal email address";
    static final String EMAIL_CHANGED_SUBJECT = "Your Phrasal email address was changed";
    static final String TWO_FACTOR_ENABLED_SUBJECT = "Two-factor authentication is on for your Phrasal account";
    static final String TWO_FACTOR_DISABLED_SUBJECT = "Two-factor authentication is off for your Phrasal account";

    private static final long MINUTES_PER_HOUR = 60;

    private final AppProperties appProperties;
    private final EmailVerificationProperties verificationProperties;
    private final PasswordResetProperties resetProperties;
    private final EmailChangeProperties emailChangeProperties;

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
     * Notice for someone who registered, or asked to move another account to, an address that already has a verified
     * account.
     *
     * @param to recipient address
     * @return multipart message with a link to the login page and no token
     */
    public EmailMessage accountExists(String to) {
        String link = appProperties.baseUrl() + "/login";
        String text = """
                Someone tried to use this email address for a Phrasal account, but it already belongs to your account.

                Log in here:
                %s

                If this wasn't you, you can ignore this email.
                """.formatted(link);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>Someone tried to use this email address for a Phrasal account, but it already belongs to your
                account.</p>
                <p><a href="%1$s">Log in</a></p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                <p>If this wasn't you, you can ignore this email.</p>
                """.formatted(safeLink);
        return new EmailMessage(to, ACCOUNT_EXISTS_SUBJECT, text, html);
    }

    /**
     * Email with the link that lets the owner choose a new password.
     *
     * @param to       recipient address
     * @param rawToken secret token; base64url, so it needs no URL encoding
     * @return multipart message
     */
    public EmailMessage passwordReset(String to, String rawToken) {
        String link = appProperties.baseUrl() + "/reset-password?token=" + rawToken;
        String lifetime = describe(resetProperties.tokenTtl());
        String text = """
                Someone asked to reset the password of your Phrasal account.

                Choose a new password here:
                %s

                This link expires in %s and works once.

                If you didn't ask for this, ignore this email; your password stays the same.
                """.formatted(link, lifetime);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>Someone asked to reset the password of your Phrasal account.</p>
                <p><a href="%1$s">Choose a new password</a></p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                <p>This link expires in %2$s and works once.</p>
                <p>If you didn't ask for this, ignore this email; your password stays the same.</p>
                """.formatted(safeLink, HtmlUtils.htmlEscape(lifetime));
        return new EmailMessage(to, PASSWORD_RESET_SUBJECT, text, html);
    }

    /**
     * Notice that the password was just changed.
     *
     * @param to recipient address
     * @return multipart message with a link to the forgot-password page and no token
     */
    public EmailMessage passwordChanged(String to) {
        String link = appProperties.baseUrl() + "/forgot-password";
        String text = """
                The password of your Phrasal account was just changed, and you were logged out on your other devices.

                If this was you, there is nothing to do.

                If it wasn't, reset your password now:
                %s
                """.formatted(link);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>The password of your Phrasal account was just changed, and you were logged out on your other
                devices.</p>
                <p>If this was you, there is nothing to do.</p>
                <p>If it wasn't, <a href="%1$s">reset your password now</a>.</p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                """.formatted(safeLink);
        return new EmailMessage(to, PASSWORD_CHANGED_SUBJECT, text, html);
    }

    /**
     * Email with the link that moves the account to this address.
     *
     * @param to       the new address
     * @param rawToken secret token; base64url, so it needs no URL encoding
     * @return multipart message
     */
    public EmailMessage emailChangeConfirmation(String to, String rawToken) {
        String link = appProperties.baseUrl() + "/confirm-email-change?token=" + rawToken;
        String lifetime = describe(emailChangeProperties.tokenTtl());
        String text = """
                Someone asked to use this address for a Phrasal account.

                Confirm the new email address here:
                %s

                This link expires in %s and works once.

                If you didn't ask for this, ignore this email; nothing changes.
                """.formatted(link, lifetime);
        String safeLink = HtmlUtils.htmlEscape(link);
        String html = """
                <p>Someone asked to use this address for a Phrasal account.</p>
                <p><a href="%1$s">Confirm the new email address</a></p>
                <p>Or copy this link into your browser:<br>%1$s</p>
                <p>This link expires in %2$s and works once.</p>
                <p>If you didn't ask for this, ignore this email; nothing changes.</p>
                """.formatted(safeLink, HtmlUtils.htmlEscape(lifetime));
        return new EmailMessage(to, EMAIL_CHANGE_SUBJECT, text, html);
    }

    /**
     * Notice to the old address that the account moved.
     *
     * @param to       the old address
     * @param newEmail the address the account moved to
     * @return multipart message with no link and no token
     */
    public EmailMessage emailChanged(String to, String newEmail) {
        String text = """
                The email address of your Phrasal account was changed to %s, and every device was logged out.

                If this wasn't you, contact the site administrator.
                """.formatted(newEmail);
        String html = """
                <p>The email address of your Phrasal account was changed to %s, and every device was logged
                out.</p>
                <p>If this wasn't you, contact the site administrator.</p>
                """.formatted(HtmlUtils.htmlEscape(newEmail));
        return new EmailMessage(to, EMAIL_CHANGED_SUBJECT, text, html);
    }

    /**
     * Notice that 2FA was just turned on or off.
     *
     * @param to      recipient address
     * @param enabled true when 2FA was turned on, false when it was turned off
     * @return multipart message with links to the forgot-password and account security pages, and no token
     */
    public EmailMessage twoFactorChanged(String to, boolean enabled) {
        String state = enabled ? "on" : "off";
        String resetLink = appProperties.baseUrl() + "/forgot-password";
        String securityLink = appProperties.baseUrl() + "/account/security";
        String text = """
                Two-factor authentication was just turned %s for your Phrasal account.

                If this was you, there is nothing to do.

                If it wasn't, reset your password now:
                %s

                Then review your account security settings:
                %s
                """.formatted(state, resetLink, securityLink);
        String html = """
                <p>Two-factor authentication was just turned %1$s for your Phrasal account.</p>
                <p>If this was you, there is nothing to do.</p>
                <p>If it wasn't, <a href="%2$s">reset your password now</a>, then review your
                <a href="%3$s">account security settings</a>.</p>
                <p>Or copy these links into your browser:<br>%2$s<br>%3$s</p>
                """.formatted(state, HtmlUtils.htmlEscape(resetLink), HtmlUtils.htmlEscape(securityLink));
        return new EmailMessage(to, enabled ? TWO_FACTOR_ENABLED_SUBJECT : TWO_FACTOR_DISABLED_SUBJECT, text, html);
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
