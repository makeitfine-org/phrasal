package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Runs against a real servlet container: MockMvc with spring-security-test replaces the CSRF token repository
 * on the shared filter, which would hide the cookie behaviour the browser actually sees.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("CSRF cookie over real HTTP")
class CsrfCookieIntegrationTest extends AbstractIntegrationTest {

    private static final String XSRF_COOKIE = "XSRF-TOKEN=";

    @LocalServerPort
    private int port;

    private HttpResponse<String> get(String path) throws Exception {
        return HttpClient.newHttpClient().send(
                HttpRequest.newBuilder(URI.create("http://localhost:" + port + path)).GET().build(),
                HttpResponse.BodyHandlers.ofString());
    }

    @Test
    @DisplayName("GET sets a readable (not HttpOnly) XSRF-TOKEN cookie and no session")
    void getSetsReadableXsrfCookie() throws Exception {
        HttpResponse<String> response = get("/api/v1/phrasal-verbs?size=1");

        List<String> cookies = response.headers().allValues("Set-Cookie");
        assertThat(response.statusCode()).isEqualTo(200);
        assertThat(cookies).anyMatch(cookie -> cookie.startsWith(XSRF_COOKIE) && !cookie.contains("HttpOnly"));
        assertThat(cookies).noneMatch(cookie -> cookie.startsWith("SESSION="));
    }

    @Test
    @DisplayName("POST without token over real HTTP is rejected with csrf problem")
    void postWithoutTokenIsRejected() throws Exception {
        HttpResponse<String> response = HttpClient.newHttpClient().send(
                HttpRequest.newBuilder(URI.create("http://localhost:" + port + "/api/v1/phrasal-verbs"))
                        .header("Content-Type", "application/json")
                        .POST(HttpRequest.BodyPublishers.ofString("{}")).build(),
                HttpResponse.BodyHandlers.ofString());

        assertThat(response.statusCode()).isEqualTo(403);
        assertThat(response.body()).contains("/errors/csrf");
    }
}
