package net.phrasal.infrastructure.mail;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmailMessageTest {

    @Test
    void toString_showsSubject() {
        EmailMessage message = new EmailMessage("a@b.c", "Confirm", "plain-secret", "<b>html-secret</b>");

        assertThat(message.toString()).contains("Confirm");
    }

    @Test
    void toString_hidesBodiesAndRecipient() {
        EmailMessage message = new EmailMessage("a@b.c", "Confirm", "plain-secret", "<b>html-secret</b>");

        assertThat(message.toString()).doesNotContain("plain-secret", "html-secret", "a@b.c");
    }
}
