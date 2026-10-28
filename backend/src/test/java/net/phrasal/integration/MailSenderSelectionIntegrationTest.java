package net.phrasal.integration;

import net.phrasal.infrastructure.mail.LoggingEmailSender;
import net.phrasal.infrastructure.mail.SmtpEmailSender;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasKey;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class MailSenderSelectionIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private ApplicationContext context;

    @Test
    void defaultContext_registersLoggingSenderAndNoSmtpSender() {
        assertThat(context.getBeansOfType(LoggingEmailSender.class)).hasSize(1);
        assertThat(context.getBeansOfType(SmtpEmailSender.class)).isEmpty();
    }

    @Test
    void health_isUpWithoutMailIndicator() throws Exception {
        mockMvc.perform(get("/actuator/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.components", not(hasKey("mail"))));
    }
}
