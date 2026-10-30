package net.phrasal.integration;

import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Auth providers integration")
class AuthProvidersIntegrationTest extends AbstractIntegrationTest {

    private static final String PROVIDERS = "/api/v1/auth/providers";

    @Test
    @DisplayName("providers is public and reports Google off in the default test profile")
    void anonymousProviders() throws Exception {
        mockMvc.perform(get(PROVIDERS))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"google\":false}", true));
    }

    @Test
    @DisplayName("providers gives the same answer to a signed-in user")
    void signedInProviders() throws Exception {
        Cookie session = registerAndLogin("providers-" + UUID.randomUUID() + "@example.com", "correct horse battery");

        mockMvc.perform(get(PROVIDERS).cookie(session))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"google\":false}", true));
    }

    @Test
    @DisplayName("an anonymous POST to providers is refused with 401 (only GET is public)")
    void postRefused() throws Exception {
        mockMvc.perform(post(PROVIDERS).with(csrf()))
                .andExpect(status().isUnauthorized());
    }
}
