package net.phrasal.application.dto;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("Two-factor DTOs")
class TwoFactorDtosTest {

    @Test
    @DisplayName("setup request hides the password in toString")
    void setupRequestMasksPassword() {
        TwoFactorSetupRequest request = new TwoFactorSetupRequest("hunter2-password");

        assertThat(request.toString()).doesNotContain("hunter2-password").contains("*****");
        assertThat(request.password()).isEqualTo("hunter2-password");
    }

    @Test
    @DisplayName("code request hides the code in toString")
    void codeRequestMasksCode() {
        TwoFactorCodeRequest request = new TwoFactorCodeRequest("123456");

        assertThat(request.toString()).doesNotContain("123456").contains("*****");
        assertThat(request.code()).isEqualTo("123456");
    }

    @Test
    @DisplayName("setup response hides the secret and the URI in toString")
    void setupResponseMasksSecret() {
        TwoFactorSetupResponse response = new TwoFactorSetupResponse("JBSWY3DPEHPK3PXP", "otpauth://totp/x");

        assertThat(response.toString()).doesNotContain("JBSWY3DPEHPK3PXP").doesNotContain("otpauth://");
        assertThat(response.secret()).isEqualTo("JBSWY3DPEHPK3PXP");
        assertThat(response.otpauthUri()).isEqualTo("otpauth://totp/x");
    }

    @Test
    @DisplayName("recovery codes response shows only the count in toString")
    void recoveryCodesResponseShowsCount() {
        RecoveryCodesResponse response = new RecoveryCodesResponse(List.of("AAAA-BBBB-CCCC-DDDD", "EEEE-FFFF-GGGG-HHHH"));

        assertThat(response.toString()).doesNotContain("AAAA").contains("count=2");
        assertThat(response.recoveryCodes()).hasSize(2);
    }

    @Test
    @DisplayName("status response keeps its values")
    void statusResponseValues() {
        LocalDateTime at = LocalDateTime.of(2026, 3, 4, 5, 6);

        TwoFactorStatusResponse response = new TwoFactorStatusResponse(true, at, 7);

        assertThat(response.enabled()).isTrue();
        assertThat(response.enabledAt()).isEqualTo(at);
        assertThat(response.recoveryCodesRemaining()).isEqualTo(7);
    }
}
