package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.hamcrest.Matchers.endsWith;
import static org.hamcrest.Matchers.startsWith;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// The mock user().roles("ADMIN") cases test the URL rules, not the principal. The rule that an admin needs a
// completed second factor is covered by AdminBootstrapIntegrationTest.
@DisplayName("Security rules integration")
class SecurityRulesIntegrationTest extends AbstractIntegrationTest {

    private static final String PHRASAL_VERBS = "/api/v1/phrasal-verbs";
    private static final String GRAMMAR_ENTRIES = "/api/v1/grammar-entries";
    private static final String VERB_DETAILS = "/api/v1/verb-details";
    private static final String PROBLEM_JSON = "application/problem+json";
    private static final String VERB_JSON = """
            {"verb": "Sec check", "definition": "To verify", "sentences": ["Sec check it."],
             "wordsToHide": ["sec check"]}
            """;

    private static MockHttpServletRequestBuilder write(HttpMethod method, String url) {
        return MockMvcRequestBuilders.request(method, url + (method == HttpMethod.POST ? "" : "/1"))
                .contentType(MediaType.APPLICATION_JSON)
                .content(VERB_JSON);
    }

    @ParameterizedTest(name = "anonymous GET {0} is public")
    @ValueSource(strings = {PHRASAL_VERBS, GRAMMAR_ENTRIES, VERB_DETAILS})
    @DisplayName("anonymous list reads return 200")
    void anonymousCanReadLists(String url) throws Exception {
        mockMvc.perform(get(url)).andExpect(status().isOk());
    }

    @Test
    @DisplayName("anonymous GET /{id} returns 200")
    void anonymousCanReadOne() throws Exception {
        mockMvc.perform(get(PHRASAL_VERBS + "/1")).andExpect(status().isOk());
    }

    @ParameterizedTest(name = "anonymous {0} {1} is rejected")
    @ValueSource(strings = {"POST " + PHRASAL_VERBS, "PUT " + GRAMMAR_ENTRIES, "DELETE " + VERB_DETAILS})
    @DisplayName("anonymous writes return 401 problem+json")
    void anonymousWritesAreUnauthorized(String methodAndUrl) throws Exception {
        String[] parts = methodAndUrl.split(" ");

        mockMvc.perform(write(HttpMethod.valueOf(parts[0]), parts[1]).with(csrf()))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Unauthorized"))
                .andExpect(jsonPath("$.detail").value("Authentication is required"))
                .andExpect(jsonPath("$.timestamp").exists());
    }

    @ParameterizedTest(name = "USER {0} is forbidden")
    @ValueSource(strings = {"POST " + PHRASAL_VERBS, "PUT " + GRAMMAR_ENTRIES, "DELETE " + VERB_DETAILS})
    @DisplayName("USER role writes return 403 problem+json")
    void userWritesAreForbidden(String methodAndUrl) throws Exception {
        String[] parts = methodAndUrl.split(" ");

        mockMvc.perform(write(HttpMethod.valueOf(parts[0]), parts[1])
                        .with(user("user@test").roles("USER")).with(csrf()))
                .andExpect(status().isForbidden())
                .andExpect(content().contentTypeCompatibleWith(PROBLEM_JSON))
                .andExpect(jsonPath("$.title").value("Forbidden"))
                .andExpect(jsonPath("$.type", endsWith("/forbidden")));
    }

    @Test
    @DisplayName("ADMIN without CSRF token gets 403 with csrf type")
    void adminWithoutCsrfIsForbidden() throws Exception {
        mockMvc.perform(write(HttpMethod.POST, PHRASAL_VERBS).with(user("admin@test").roles("ADMIN")))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.type", endsWith("/csrf")))
                .andExpect(jsonPath("$.detail").value("Invalid or missing CSRF token"));
    }

    @Test
    @DisplayName("ADMIN with CSRF token can create (positive control)")
    void adminWithCsrfCanCreate() throws Exception {
        mockMvc.perform(write(HttpMethod.POST, PHRASAL_VERBS).with(adminWithCsrf()))
                .andExpect(status().isCreated());
    }

    @Test
    @DisplayName("actuator health is public")
    void healthIsPublic() throws Exception {
        mockMvc.perform(get("/actuator/health")).andExpect(status().isOk());
    }

    @Test
    @DisplayName("actuator metrics: anonymous 401, USER 403, ADMIN 200")
    void metricsAreAdminOnly() throws Exception {
        mockMvc.perform(get("/actuator/metrics")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/actuator/metrics").with(user("user@test").roles("USER")))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/actuator/metrics").with(user("admin@test").roles("ADMIN")))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("unknown non-GET paths are denied")
    void unknownPathsAreDenied() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/something-else").with(csrf()))
                .andExpect(status().isUnauthorized());
    }

    @ParameterizedTest(name = "Accept: {0}")
    @ValueSource(strings = {MediaType.ALL_VALUE, MediaType.TEXT_HTML_VALUE})
    @DisplayName("with Google sign-in on, an anonymous API call still gets the JSON 401, not a redirect to /login")
    void apiStaysJsonWithGoogleOn(String accept) throws Exception {
        mockMvc.perform(get("/api/v1/me/quiz-progress/phrasal-verbs").header("Accept", accept))
                .andExpect(status().isUnauthorized())
                .andExpect(header().doesNotExist("Location"))
                .andExpect(content().contentTypeCompatibleWith(PROBLEM_JSON));
    }

    @Test
    @DisplayName("the backend generates no login page: GET /login is denied like any unknown path")
    void noGeneratedLoginPage() throws Exception {
        mockMvc.perform(get("/login").header("Accept", MediaType.TEXT_HTML_VALUE))
                .andExpect(status().isUnauthorized())
                .andExpect(content().contentTypeCompatibleWith(PROBLEM_JSON));
    }

    @Test
    @DisplayName("GET on the Google start URL redirects to the provider (the fake one in tests)")
    void googleStartRedirects() throws Exception {
        mockMvc.perform(get(GOOGLE_START))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", startsWith(GOOGLE.authorizationUri() + "?")));
    }

    @Test
    @DisplayName("POST on the Google start URL without a CSRF token is refused, not redirected")
    void googleStartPostWithoutCsrf() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post(GOOGLE_START))
                .andExpect(status().isForbidden())
                .andExpect(header().doesNotExist("Location"));
    }

    @Test
    @DisplayName("an unknown provider in the start URL goes back to the login page with the generic error")
    void unknownProvider() throws Exception {
        mockMvc.perform(get("/api/v1/auth/oauth2/authorization/github"))
                .andExpect(status().isFound())
                .andExpect(header().string("Location", "/login?error=google"));
    }

    @Test
    @DisplayName("CORS preflight gets no Access-Control-Allow-Origin header")
    void preflightHasNoCorsHeaders() throws Exception {
        mockMvc.perform(options(PHRASAL_VERBS)
                        .header("Origin", "http://localhost:5173")
                        .header("Access-Control-Request-Method", "POST"))
                .andExpect(header().doesNotExist("Access-Control-Allow-Origin"));
    }
}
