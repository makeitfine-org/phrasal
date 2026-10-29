package net.phrasal.integration.support;

import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.mail.EmailSender;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/** Keeps every sent message by recipient so tests can read the emails the async listener sends. */
public class RecordingEmailSender implements EmailSender {

    private static final Duration AWAIT_TIMEOUT = Duration.ofSeconds(5);
    private static final long POLL_MILLIS = 20;
    private static final Pattern TOKEN_LINK = Pattern.compile("/verify-email\\?token=([A-Za-z0-9_-]{43})");
    private static final Pattern RESET_LINK = Pattern.compile("/reset-password\\?token=([A-Za-z0-9_-]{43})");
    private static final String RESET_SUBJECT = "Reset your Phrasal password";

    private final Map<String, List<EmailMessage>> sent = new ConcurrentHashMap<>();

    @Override
    public void send(EmailMessage message) {
        sent.computeIfAbsent(message.to(), key -> new CopyOnWriteArrayList<>()).add(message);
    }

    /**
     * Waits until at least {@code count} messages reached the recipient.
     *
     * @param to    recipient address
     * @param count minimum number of messages
     * @return all messages for the recipient, oldest first
     */
    public List<EmailMessage> awaitCount(String to, int count) {
        long deadline = System.nanoTime() + AWAIT_TIMEOUT.toNanos();
        while (System.nanoTime() < deadline) {
            List<EmailMessage> messages = sent.getOrDefault(to, List.of());
            if (messages.size() >= count) {
                return List.copyOf(messages);
            }
            sleep(POLL_MILLIS);
        }
        throw new AssertionError("Expected " + count + " email(s) to " + to + " within " + AWAIT_TIMEOUT
                + " but got " + sent.getOrDefault(to, List.of()).size());
    }

    /**
     * Waits for the first message to the recipient and returns the newest one.
     *
     * @param to recipient address
     * @return the most recent message
     */
    public EmailMessage awaitLatest(String to) {
        List<EmailMessage> messages = awaitCount(to, 1);
        return messages.get(messages.size() - 1);
    }

    /**
     * Waits for a message with the given subject and returns the newest such message.
     *
     * @param to      recipient address
     * @param subject exact subject line
     * @return the most recent message with that subject
     */
    public EmailMessage awaitSubject(String to, String subject) {
        long deadline = System.nanoTime() + AWAIT_TIMEOUT.toNanos();
        while (System.nanoTime() < deadline) {
            List<EmailMessage> matching = withSubject(to, subject);
            if (!matching.isEmpty()) {
                return matching.get(matching.size() - 1);
            }
            sleep(POLL_MILLIS);
        }
        throw new AssertionError("Expected an email to " + to + " with subject '" + subject + "' within "
                + AWAIT_TIMEOUT);
    }

    /**
     * Counts the messages with the given subject that reached the recipient so far.
     *
     * @param to      recipient address
     * @param subject exact subject line
     * @return number of messages
     */
    public int countWithSubject(String to, String subject) {
        return withSubject(to, subject).size();
    }

    /**
     * Extracts the reset token from the newest password reset message to the recipient.
     *
     * @param to recipient address
     * @return the raw token
     */
    public String awaitPasswordResetToken(String to) {
        return extractToken(awaitSubject(to, RESET_SUBJECT), RESET_LINK);
    }

    /**
     * Extracts the verification token from the newest message to the recipient.
     *
     * @param to recipient address
     * @return the raw token
     */
    public String awaitVerificationToken(String to) {
        return extractToken(awaitLatest(to));
    }

    /**
     * Extracts the verification token from a message.
     *
     * @param message message holding a verification link
     * @return the raw token
     */
    public static String extractToken(EmailMessage message) {
        return extractToken(message, TOKEN_LINK);
    }

    /**
     * Extracts a token from a message.
     *
     * @param message     message holding a link
     * @param linkPattern pattern whose first group is the raw token
     * @return the raw token
     */
    public static String extractToken(EmailMessage message, Pattern linkPattern) {
        Matcher matcher = linkPattern.matcher(message.text());
        if (!matcher.find()) {
            throw new AssertionError("No matching link in the email to " + message.to());
        }
        return matcher.group(1);
    }

    /**
     * Fails if any message reaches the recipient within the wait.
     *
     * @param to   recipient address
     * @param wait how long to watch
     */
    public void assertNothingSentTo(String to, Duration wait) {
        sleep(wait.toMillis());
        List<EmailMessage> messages = sent.getOrDefault(to, List.of());
        if (!messages.isEmpty()) {
            throw new AssertionError("Expected no email to " + to + " but found " + messages.size());
        }
    }

    private List<EmailMessage> withSubject(String to, String subject) {
        return sent.getOrDefault(to, List.of()).stream()
                .filter(message -> subject.equals(message.subject()))
                .toList();
    }

    private static void sleep(long millis) {
        try {
            Thread.sleep(millis);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new AssertionError("Interrupted while waiting for email", e);
        }
    }
}
