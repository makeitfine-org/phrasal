package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@TestPropertySource(properties = {
        "phrasal.security.admin.email=admin@it.test",
        "phrasal.security.admin.password=bootstrap-admin-pass"
})
@DisplayName("Admin bootstrap integration")
class AdminBootstrapIntegrationTest extends AbstractIntegrationTest {

    private static final String BODY = "{\"email\":\"admin@it.test\",\"password\":\"bootstrap-admin-pass\"}";

    @Test
    @DisplayName("bootstrapped admin can log in and /me reports ADMIN")
    void adminLogin() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(get("/api/v1/auth/me").cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("ADMIN"));
    }

    @Test
    @DisplayName("admin session cookie can create a phrasal verb")
    void adminCanWrite() throws Exception {
        Cookie session = login(BODY, null);

        mockMvc.perform(post("/api/v1/phrasal-verbs").cookie(session).with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"verb\":\"Boot up\",\"definition\":\"To start a computer\","
                                + "\"sentences\":[\"Boot up the laptop.\"],\"wordsToHide\":[\"boot up\"]}"))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("admin session can save and read its own quiz progress")
    void adminOwnProgress() throws Exception {
        Cookie session = login(BODY, null);
        String url = "/api/v1/me/quiz-progress/phrasal-verbs";

        mockMvc.perform(put(url).cookie(session).with(csrf()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"state\":{\"excluded\":[1]}}"))
                .andExpect(status().isOk());

        mockMvc.perform(get(url).cookie(session))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.state.excluded[0]").value(1));
    }

    @Test
    @DisplayName("registering the admin email returns 409")
    void adminEmailTaken() throws Exception {
        mockMvc.perform(post("/api/v1/auth/register").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"Admin@It.Test\",\"password\":\"another-long-password\"}")
                        .with(csrf()))
                .andExpect(status().isConflict());
    }
}
