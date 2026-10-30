package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * With Google sign-in switched off there is no client registration and no OAuth2 endpoint at all.
 */
@TestPropertySource(properties = "phrasal.google.enabled=false")
@DisplayName("Google login disabled integration")
class GoogleLoginDisabledIntegrationTest extends AbstractIntegrationTest {

    @Autowired
    private ApplicationContext context;

    @Test
    @DisplayName("providers reports Google off")
    void providersReportGoogleOff() throws Exception {
        mockMvc.perform(get("/api/v1/auth/providers"))
                .andExpect(status().isOk())
                .andExpect(content().json("{\"google\":false}", true));
    }

    @Test
    @DisplayName("no client registration repository is created")
    void noClientRegistrationRepository() {
        assertThat(context.getBeansOfType(ClientRegistrationRepository.class)).isEmpty();
    }

    @Test
    @DisplayName("the authorization endpoint answers 404 instead of redirecting to Google")
    void authorizationEndpointMissing() throws Exception {
        mockMvc.perform(get("/api/v1/auth/oauth2/authorization/google"))
                .andExpect(status().isNotFound())
                .andExpect(header().doesNotExist("Location"));
    }

    @Test
    @DisplayName("the callback answers 404")
    void callbackMissing() throws Exception {
        mockMvc.perform(get("/api/v1/auth/oauth2/code/google").param("code", "abc").param("state", "xyz"))
                .andExpect(status().isNotFound())
                .andExpect(header().doesNotExist("Location"));
    }
}
