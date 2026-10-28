package net.phrasal.infrastructure.mail;

import jakarta.mail.Address;
import jakarta.mail.Multipart;
import jakarta.mail.Part;
import jakarta.mail.Session;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import net.phrasal.config.PhrasalMailProperties;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.mail.MailSendException;
import org.springframework.mail.javamail.JavaMailSender;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class SmtpEmailSenderTest {

    private static final String FROM = "Phrasal <no-reply@phrasalbox.com>";

    private JavaMailSender javaMailSender;
    private SmtpEmailSender sender;

    @BeforeEach
    void setUp() {
        javaMailSender = mock(JavaMailSender.class);
        when(javaMailSender.createMimeMessage()).thenAnswer(inv -> new MimeMessage((Session) null));
        sender = new SmtpEmailSender(javaMailSender, new PhrasalMailProperties(true, FROM));
    }

    @Test
    void send_setsFromToAndSubject() throws Exception {
        sender.send(new EmailMessage("user@example.com", "Confirm", "plain", "<p>html</p>"));

        MimeMessage sent = captureSent();
        assertThat(sent.getFrom()).extracting(Address::toString).containsExactly(FROM);
        assertThat(sent.getAllRecipients()).extracting(a -> ((InternetAddress) a).getAddress())
                .containsExactly("user@example.com");
        assertThat(sent.getSubject()).isEqualTo("Confirm");
    }

    @Test
    void send_buildsMultipartWithTextAndHtml() throws Exception {
        sender.send(new EmailMessage("user@example.com", "Confirm", "plain-body", "<p>html-body</p>"));

        MimeMessage sent = captureSent();
        sent.saveChanges();
        List<String> bodies = new ArrayList<>();
        collectBodies(sent, bodies);
        assertThat(bodies).anyMatch(b -> b.contains("plain-body")).anyMatch(b -> b.contains("<p>html-body</p>"));
    }

    @Test
    void send_keepsUtf8Subject() throws Exception {
        sender.send(new EmailMessage("user@example.com", "Zażółć", "t", "<p>h</p>"));

        assertThat(captureSent().getSubject()).isEqualTo("Zażółć");
    }

    @Test
    void send_propagatesTransportFailure() {
        doThrow(new MailSendException("relay down")).when(javaMailSender).send(any(MimeMessage.class));

        assertThatThrownBy(() -> sender.send(new EmailMessage("user@example.com", "s", "t", "h")))
                .isInstanceOf(MailSendException.class);
    }

    private MimeMessage captureSent() {
        ArgumentCaptor<MimeMessage> captor = ArgumentCaptor.forClass(MimeMessage.class);
        verify(javaMailSender).send(captor.capture());
        return captor.getValue();
    }

    private static void collectBodies(Part part, List<String> bodies) throws Exception {
        Object content = part.getContent();
        if (content instanceof Multipart multipart) {
            for (int i = 0; i < multipart.getCount(); i++) {
                collectBodies(multipart.getBodyPart(i), bodies);
            }
        } else if (content instanceof String text) {
            bodies.add(text);
        } else if (content instanceof InputStream stream) {
            try {
                bodies.add(new String(stream.readAllBytes(), StandardCharsets.UTF_8));
            } catch (IOException e) {
                throw new IllegalStateException(e);
            }
        }
    }
}
