package net.phrasal.infrastructure.mail;

/**
 * A multipart (plain text + HTML) email.
 *
 * @param to      recipient address
 * @param subject subject line
 * @param text    plain-text body
 * @param html    HTML body
 */
public record EmailMessage(String to, String subject, String text, String html) {

    /** Bodies hold verification links, so only the subject is shown. */
    @Override
    public String toString() {
        return "EmailMessage[subject=" + subject + "]";
    }
}
