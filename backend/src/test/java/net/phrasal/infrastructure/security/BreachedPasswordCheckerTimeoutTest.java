package net.phrasal.infrastructure.security;

import com.sun.net.httpserver.HttpServer;
import net.phrasal.config.PasswordBreachCheckProperties;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.concurrent.atomic.AtomicReference;

import static org.assertj.core.api.Assertions.assertThat;

/** Runs the real Have I Been Pwned client against a local stand-in, so no test depends on the internet. */
@DisplayName("BreachedPasswordChecker against a local range endpoint")
class BreachedPasswordCheckerTimeoutTest {

    private static final String PASSWORD = "password";
    /** Uppercase SHA-1 of "password" is 5BAA6 1E4C9B93F3F0682250B6CF8331B7EE68FD8. */
    private static final String SUFFIX_LINE = "1E4C9B93F3F0682250B6CF8331B7EE68FD8:9999999";
    private static final Duration TIMEOUT = Duration.ofMillis(500);
    private static final long SLOW_MILLIS = 2_000;
    private static final long MAX_WAIT_MILLIS = 1_500;

    private HttpServer server;
    private final AtomicReference<String> requestedPath = new AtomicReference<>();

    @BeforeEach
    void startServer() throws IOException {
        server = HttpServer.create(new InetSocketAddress(InetAddress.getLoopbackAddress(), 0), 0);
    }

    @AfterEach
    void stopServer() {
        server.stop(0);
    }

    private BreachedPasswordChecker checker() {
        server.start();
        String url = "http://" + InetAddress.getLoopbackAddress().getHostAddress() + ":"
                + server.getAddress().getPort() + "/range/";
        return BreachedPasswordChecker.forRangeUrl(new PasswordBreachCheckProperties(true, TIMEOUT), url);
    }

    private void answer(String body, long delayMillis) {
        server.createContext("/range/", exchange -> {
            requestedPath.set(exchange.getRequestURI().getPath());
            try {
                Thread.sleep(delayMillis);
            } catch (InterruptedException ex) {
                Thread.currentThread().interrupt();
            }
            byte[] bytes = body.getBytes(StandardCharsets.UTF_8);
            try {
                exchange.sendResponseHeaders(200, bytes.length);
                exchange.getResponseBody().write(bytes);
            } catch (IOException ignored) {
                // The client gave up before the answer; that is the case under test.
            } finally {
                exchange.close();
            }
        });
    }

    @Test
    @DisplayName("a listed suffix is breached, and only the 5-character prefix is sent")
    void breachedSendsOnlyPrefix() {
        answer(SUFFIX_LINE + "\r\n0018A45C4D1DEF81644B54AB7F969B88D65:1", 0);

        assertThat(checker().isBreached(PASSWORD)).isTrue();
        assertThat(requestedPath.get()).isEqualTo("/range/5BAA6");
    }

    @Test
    @DisplayName("a suffix that is not listed is clean")
    void notListed() {
        answer("0018A45C4D1DEF81644B54AB7F969B88D65:1", 0);

        assertThat(checker().isBreached(PASSWORD)).isFalse();
    }

    @Test
    @DisplayName("a slow service is given up on after the timeout and the password is accepted")
    void slowServiceFailsOpen() {
        answer(SUFFIX_LINE, SLOW_MILLIS);
        BreachedPasswordChecker checker = checker();

        long start = System.nanoTime();
        boolean breached = checker.isBreached(PASSWORD);
        long elapsedMillis = Duration.ofNanos(System.nanoTime() - start).toMillis();

        assertThat(breached).isFalse();
        assertThat(elapsedMillis).isLessThan(MAX_WAIT_MILLIS);
    }
}
