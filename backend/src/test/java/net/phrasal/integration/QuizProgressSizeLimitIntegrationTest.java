package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(properties = "phrasal.quiz-progress.max-state-bytes=200")
@DisplayName("Quiz progress size limit integration")
class QuizProgressSizeLimitIntegrationTest extends AbstractIntegrationTest {

    private static final String PV = "/api/v1/me/quiz-progress/phrasal-verbs";
    private static final int UNDER_LIMIT = 100;
    private static final int OVER_LIMIT = 300;

    private static String body(int padding) {
        return "{\"state\":{\"p\":\"" + "x".repeat(padding) + "\"}}";
    }

    private ResultActions save(Cookie session, String body) throws Exception {
        return mockMvc.perform(put(PV).cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(body));
    }

    private Cookie newSession() throws Exception {
        return registerAndLogin("size-" + UUID.randomUUID() + "@example.com", "correct-horse-battery");
    }

    @Test
    @DisplayName("a state under the limit is saved")
    void underLimit() throws Exception {
        save(newSession(), body(UNDER_LIMIT)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("a state over the limit is rejected with 400")
    void overLimit() throws Exception {
        save(newSession(), body(OVER_LIMIT))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Quiz Progress Too Large"));
    }
}
