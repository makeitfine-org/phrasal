package net.phrasal.presentation.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.web.csrf.DefaultCsrfToken;
import org.springframework.security.web.csrf.InvalidCsrfTokenException;
import org.springframework.security.web.csrf.MissingCsrfTokenException;
import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Security problem+json handlers")
class ProblemDetailHandlersTest {

    private static final int UNAUTHORIZED = 401;
    private static final int FORBIDDEN = 403;

    private final JsonMapper jsonMapper = JsonMapper.builder().build();
    private final ProblemDetailWriter writer = new ProblemDetailWriter(jsonMapper);
    private final MockHttpServletRequest request = new MockHttpServletRequest();
    private final MockHttpServletResponse response = new MockHttpServletResponse();

    private JsonNode body() throws Exception {
        return jsonMapper.readTree(response.getContentAsString());
    }

    @Test
    @DisplayName("entry point writes 401 problem+json")
    void entryPointWrites401() throws Exception {
        new ProblemDetailAuthenticationEntryPoint(writer)
                .commence(request, response, new BadCredentialsException("secret internal text"));

        assertThat(response.getStatus()).isEqualTo(UNAUTHORIZED);
        assertThat(response.getContentType()).startsWith("application/problem+json");
        assertThat(body().get("title").asString()).isEqualTo("Unauthorized");
        assertThat(body().get("type").asString()).endsWith("/errors/unauthorized");
        assertThat(body().get("detail").asString()).isEqualTo("Authentication is required");
        assertThat(body().get("status").asInt()).isEqualTo(UNAUTHORIZED);
        assertThat(body().has("timestamp")).isTrue();
        assertThat(response.getContentAsString()).doesNotContain("secret internal text");
    }

    @Test
    @DisplayName("access denied handler writes generic 403")
    void deniedHandlerWritesGeneric403() throws Exception {
        new ProblemDetailAccessDeniedHandler(writer)
                .handle(request, response, new AccessDeniedException("internal rule text"));

        assertThat(response.getStatus()).isEqualTo(FORBIDDEN);
        assertThat(response.getContentType()).startsWith("application/problem+json");
        assertThat(body().get("title").asString()).isEqualTo("Forbidden");
        assertThat(body().get("type").asString()).endsWith("/errors/forbidden");
        assertThat(body().get("detail").asString()).isEqualTo("You do not have permission to perform this action");
        assertThat(response.getContentAsString()).doesNotContain("internal rule text");
    }

    @Test
    @DisplayName("access denied handler writes csrf 403 for missing token")
    void deniedHandlerMissingCsrf() throws Exception {
        new ProblemDetailAccessDeniedHandler(writer)
                .handle(request, response, new MissingCsrfTokenException(null));

        assertThat(response.getStatus()).isEqualTo(FORBIDDEN);
        assertThat(body().get("type").asString()).endsWith("/errors/csrf");
        assertThat(body().get("detail").asString()).isEqualTo("Invalid or missing CSRF token");
    }

    @Test
    @DisplayName("access denied handler writes csrf 403 for invalid token")
    void deniedHandlerInvalidCsrf() throws Exception {
        new ProblemDetailAccessDeniedHandler(writer)
                .handle(request, response, new InvalidCsrfTokenException(
                        new DefaultCsrfToken("X-XSRF-TOKEN", "_csrf", "expected"), "bad"));

        assertThat(body().get("type").asString()).endsWith("/errors/csrf");
    }
}
