package net.phrasal.integration;

import net.phrasal.infrastructure.mail.EmailSender;
import net.phrasal.infrastructure.mail.LoggingEmailSender;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MailSenderSelectionIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private EmailSender emailSender;

    @Test
    void defaultContext_usesLoggingSender() {
        assertThat(emailSender).isInstanceOf(LoggingEmailSender.class);
    }

    @Test
    void health_isUpWithoutMailIndicator() throws Exception {
        mockMvc.perform(get("/actuator/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.components", not(hasKey("mail"))));
    }
}
