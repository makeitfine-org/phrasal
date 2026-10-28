package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.hamcrest.Matchers.endsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Quiz progress API integration")
class QuizProgressIntegrationTest extends AbstractIntegrationTest {

    private static final String PASSWORD = "correct-horse-battery";
    private static final String PV = "/api/v1/me/quiz-progress/phrasal-verbs";
    private static final String GRAMMAR = "/api/v1/me/quiz-progress/grammar-i-wish-if-only";
    private static final String STATE_A = "{\"state\":{\"schemaVersion\":1,\"excluded\":[7],"
            + "\"history\":[{\"id\":12,\"status\":\"correct\"}],\"nested\":{\"k\":[1,2]}}}";
    private static final String STATE_B = "{\"state\":{\"schemaVersion\":1,\"mastered\":[3]}}";

    private Cookie newSession() throws Exception {
        return registerAndLogin("quiz-" + UUID.randomUUID() + "@example.com", PASSWORD);
    }

    private ResultActions putState(String url, Cookie session, String body)
            throws Exception {
        return mockMvc.perform(put(url).cookie(session).with(csrf())
                .contentType(MediaType.APPLICATION_JSON).content(body));
    }

    @Test
    @DisplayName("anonymous GET and PUT are rejected with 401 problem+json")
    void anonymousRejected() throws Exception {
        mockMvc.perform(get(PV))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON));
        mockMvc.perform(put(PV).with(csrf()).contentType(MediaType.APPLICATION_JSON).content(STATE_A))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("a new user gets 404 before the first save")
    void notFoundBeforeFirstSave() throws Exception {
        mockMvc.perform(get(PV).cookie(newSession()))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Quiz Progress Not Found"));
    }

    @Test
    @DisplayName("PUT creates version 0 and GET returns the identical nested state")
    void saveThenRead() throws Exception {
        Cookie session = newSession();

        putState(PV, session, STATE_A)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.quizKey").value("phrasal-verbs"))
                .andExpect(jsonPath("$.version").value(0));

        mockMvc.perform(get(PV).cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.state.schemaVersion").value(1))
                .andExpect(jsonPath("$.state.excluded[0]").value(7))
                .andExpect(jsonPath("$.state.history[0].id").value(12))
                .andExpect(jsonPath("$.state.history[0].status").value("correct"))
                .andExpect(jsonPath("$.state.nested.k[1]").value(2))
                .andExpect(jsonPath("$.updatedAt").exists());
    }

    @Test
    @DisplayName("a second PUT bumps the version and replaces the state instead of merging")
    void secondSaveReplaces() throws Exception {
        Cookie session = newSession();
        putState(PV, session, STATE_A).andExpect(status().isOk());

        putState(PV, session, STATE_B)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.version").value(1))
                .andExpect(jsonPath("$.state.mastered[0]").value(3))
                .andExpect(jsonPath("$.state.excluded").doesNotExist());
    }

    @Test
    @DisplayName("the two quiz keys are independent")
    void keysAreIndependent() throws Exception {
        Cookie session = newSession();
        putState(PV, session, STATE_A).andExpect(status().isOk());

        mockMvc.perform(get(GRAMMAR).cookie(session)).andExpect(status().isNotFound());
        putState(GRAMMAR, session, STATE_B).andExpect(jsonPath("$.version").value(0));
        mockMvc.perform(get(PV).cookie(session)).andExpect(jsonPath("$.state.excluded[0]").value(7));
    }

    @Test
    @DisplayName("users cannot see or overwrite each other's progress")
    void crossUserIsolation() throws Exception {
        Cookie userA = newSession();
        Cookie userB = newSession();
        putState(PV, userA, STATE_A).andExpect(status().isOk());

        mockMvc.perform(get(PV).cookie(userB)).andExpect(status().isNotFound());
        putState(PV, userB, STATE_B).andExpect(jsonPath("$.version").value(0));

        mockMvc.perform(get(PV).cookie(userA))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.version").value(0))
                .andExpect(jsonPath("$.state.excluded[0]").value(7));
    }

    @Test
    @DisplayName("an unknown quiz key is rejected with 400 on GET and PUT")
    void unknownKey() throws Exception {
        Cookie session = newSession();

        mockMvc.perform(get("/api/v1/me/quiz-progress/unknown-quiz").cookie(session))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Unknown Quiz Key"));
        putState("/api/v1/me/quiz-progress/unknown-quiz", session, STATE_A)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Unknown Quiz Key"));
    }

    @ParameterizedTest(name = "body {0} is a malformed request")
    @ValueSource(strings = {"{\"state\":[1,2]}", "{\"state\":\"x\"}", "[1,2]", "not json"})
    @DisplayName("a body whose state is not a JSON object is rejected with 400")
    void nonObjectBody(String body) throws Exception {
        putState(PV, newSession(), body)
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Malformed Request"));
    }

    @Test
    @DisplayName("a missing state is a validation error")
    void missingState() throws Exception {
        putState(PV, newSession(), "{}")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }

    @Test
    @DisplayName("PUT without a CSRF token is forbidden")
    void putWithoutCsrf() throws Exception {
        mockMvc.perform(put(PV).cookie(newSession()).contentType(MediaType.APPLICATION_JSON).content(STATE_A))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.type").value(endsWith("/csrf")));
    }

    @Test
    @DisplayName("content reads stay public after adding the /me rule")
    void contentReadsStayPublic() throws Exception {
        mockMvc.perform(get("/api/v1/phrasal-verbs")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("malformed JSON on a content POST is 400, not 500")
    void malformedContentPost() throws Exception {
        mockMvc.perform(post("/api/v1/phrasal-verbs").with(adminWithCsrf())
                        .contentType(MediaType.APPLICATION_JSON).content("{broken"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Malformed Request"));
    }
}
