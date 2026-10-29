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
}
