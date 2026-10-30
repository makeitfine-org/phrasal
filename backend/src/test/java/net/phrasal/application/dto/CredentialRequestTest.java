package net.phrasal.application.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Credential request DTOs")
class CredentialRequestTest {

    private static final String EMAIL = "user@example.com";
    private static final String PASSWORD = "plain-secret-1";

    @Test
    @DisplayName("LoginRequest toString masks the password")
    void loginRequestMasksPassword() {
        LoginRequest request = new LoginRequest(EMAIL, PASSWORD);

        assertThat(request.toString())
                .contains(EMAIL)
                .contains("password=*****")
                .doesNotContain(PASSWORD);
    }

    @Test
    @DisplayName("RegisterRequest toString masks the password")
    void registerRequestMasksPassword() {
        RegisterRequest request = new RegisterRequest(EMAIL, PASSWORD);

        assertThat(request.toString())
                .contains(EMAIL)
                .contains("password=*****")
                .doesNotContain(PASSWORD);
    }

    @Test
    @DisplayName("ResetPasswordRequest toString masks the token and the password")
    void resetPasswordRequestMasksSecrets() {
        ResetPasswordRequest request = new ResetPasswordRequest("raw-reset-token", PASSWORD);

        assertThat(request.toString())
                .contains("token=*****")
                .contains("password=*****")
                .doesNotContain("raw-reset-token")
                .doesNotContain(PASSWORD);
    }

    @Test
    @DisplayName("RegisterRequest without a website has an empty honeypot")
    void registerRequestTwoArgumentConstructor() {
        RegisterRequest request = new RegisterRequest(EMAIL, PASSWORD);

        assertThat(request.website()).isNull();
        assertThat(request.honeypotFilled()).isFalse();
        assertThat(new RegisterRequest(EMAIL, PASSWORD, "  ").honeypotFilled()).isFalse();
    }

    @Test
    @DisplayName("RegisterRequest toString shows whether the honeypot is filled, never its value")
    void registerRequestMasksWebsite() {
        RegisterRequest request = new RegisterRequest(EMAIL, PASSWORD, "http://spam.example");

        assertThat(request.honeypotFilled()).isTrue();
        assertThat(request.toString()).contains("website=filled").doesNotContain("spam.example");
        assertThat(new RegisterRequest(EMAIL, PASSWORD).toString()).contains("website=empty");
    }
}
