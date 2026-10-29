package net.phrasal.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("TwoFactorProperties")
class TwoFactorPropertiesTest {

    private static final String KEY = "c2VjcmV0LWtleS10aGF0LW11c3Qtbm90LWxlYWs=";

    @Test
    @DisplayName("toString masks the encryption key but keeps the other values")
    void toStringMasksKey() {
        String text = new TwoFactorProperties(KEY, "Phrasal", Duration.ofMinutes(5)).toString();

        assertThat(text).doesNotContain(KEY).contains("encryptionKey=*****", "issuer=Phrasal");
    }
}
