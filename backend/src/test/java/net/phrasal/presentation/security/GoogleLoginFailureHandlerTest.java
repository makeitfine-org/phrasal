package net.phrasal.presentation.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(OutputCaptureExtension.class)
@DisplayName("GoogleLoginFailureHandler")
class GoogleLoginFailureHandlerTest {

    private static String redirectFor(AuthenticationException exception) throws IOException {
        MockHttpServletResponse response = new MockHttpServletResponse();
        new GoogleLoginFailureHandler().onAuthenticationFailure(new MockHttpServletRequest(), response, exception);
        assertThat(response.getStatus()).isEqualTo(302);
        return response.getRedirectedUrl();
    }

    private static OAuth2AuthenticationException oauth2(String code) {
        return new OAuth2AuthenticationException(new OAuth2Error(code), "token endpoint said: secret-detail");
    }

    @ParameterizedTest(name = "{0}")
    @ValueSource(strings = {"google-email-unverified", "google-account-conflict", "google-admin-account"})
    @DisplayName("a refusal code passes through to the login page")
    void refusalPassesThrough(String code) throws IOException {
        assertThat(redirectFor(oauth2(code))).isEqualTo("/login?error=" + code);
    }

    @ParameterizedTest(name = "{0}")
    @ValueSource(strings = {"access_denied", "authorization_request_not_found", "invalid_state_parameter",
        "invalid_nonce", "invalid_id_token", "invalid_token_response", "google", "<script>",
        "google-admin-account&x=1"})
    @DisplayName("any other OAuth2 error code becomes the generic google error")
    void otherCodesAreGeneric(String code) throws IOException {
        assertThat(redirectFor(oauth2(code))).isEqualTo("/login?error=google");
    }

    @Test
    @DisplayName("a non-OAuth2 failure becomes the generic google error")
    void plainFailure() throws IOException {
        assertThat(redirectFor(new BadCredentialsException("bad"))).isEqualTo("/login?error=google");
    }

    @Test
    @DisplayName("the log gets the plain code, never the message")
    void logsCodeOnly(CapturedOutput output) throws IOException {
        redirectFor(oauth2("access_denied"));

        assertThat(output).contains("Google sign-in failed code=access_denied");
        assertThat(output.toString().lines().filter(line -> line.contains("INFO")))
                .noneMatch(line -> line.contains("secret-detail"));
    }

    @Test
    @DisplayName("a code with odd characters is not copied into the log")
    void oddCodeNotLogged(CapturedOutput output) throws IOException {
        redirectFor(oauth2("bad\ncode=<script>"));
        redirectFor(new BadCredentialsException("bad"));

        assertThat(output).contains("Google sign-in failed code=unrecognized")
                .contains("Google sign-in failed code=none")
                .doesNotContain("code=<script>");
    }
}
