package net.phrasal.integration;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * Runs against a real servlet container with the headers nginx sends: MockMvc skips Tomcat, which is what turns a
 * redirect into an absolute URL built from {@code X-Forwarded-*} (nginx hard-codes port 3000, and behind Traefik it
 * forwards {@code http}).
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@DisplayName("Google sign-in redirects over real HTTP")
class GoogleRedirectOverHttpIntegrationTest extends AbstractIntegrationTest {

    private static final int FOUND = 302;

    @LocalServerPort
    private int port;

    private HttpResponse<Void> getBehindProxy(String path) throws Exception {
        HttpRequest request = HttpRequest.newBuilder(URI.create("http://localhost:" + port + path))
                .header("X-Forwarded-Host", "phrasal.example")
                .header("X-Forwarded-Proto", "http")
                .header("X-Forwarded-Port", "3000")
                .GET().build();
        return HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.discarding());
    }

    @Test
    @DisplayName("the callback's redirect back into the SPA is relative, so it stays on the browser's origin")
    void callbackRedirectIsRelative() throws Exception {
        HttpResponse<Void> response = getBehindProxy(GOOGLE_CALLBACK + "?error=access_denied&state=unknown");

        assertThat(response.statusCode()).isEqualTo(FOUND);
        assertThat(response.headers().firstValue("Location")).hasValue("/login?error=google");
    }

    @Test
    @DisplayName("the start redirect goes to the provider with the redirect URI from APP_BASE_URL, not the headers")
    void startRedirectIgnoresForwardedHeaders() throws Exception {
        HttpResponse<Void> response = getBehindProxy(GOOGLE_START);

        String location = response.headers().firstValue("Location").orElseThrow();
        assertThat(response.statusCode()).isEqualTo(FOUND);
        assertThat(location).startsWith(GOOGLE.authorizationUri() + "?")
                .contains("redirect_uri=http://localhost:3000" + GOOGLE_CALLBACK)
                .doesNotContain("phrasal.example");
    }
}
