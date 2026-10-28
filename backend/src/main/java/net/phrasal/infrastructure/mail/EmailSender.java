package net.phrasal.infrastructure.mail;

/** Port for sending email. Implementations may throw {@code MailException}; callers log and continue. */
public interface EmailSender {

    /**
     * Sends the message.
     *
     * @param message the message to deliver
     */
    void send(EmailMessage message);
}
