package net.phrasal.infrastructure.security;

import org.apache.commons.codec.binary.Base32;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("TwoFactorSecrets")
class TwoFactorSecretsTest {

    private static final int SECRET_BYTES = 20;
    private static final int BASE32_LENGTH = 32;

    private final TwoFactorSecrets secrets = new TwoFactorSecrets();

    @Test
    @DisplayName("a secret is 20 bytes and two secrets differ")
    void secretLengthAndRandomness() {
        byte[] first = secrets.newSecret();

        assertThat(first).hasSize(SECRET_BYTES);
        assertThat(secrets.newSecret()).isNotEqualTo(first);
    }

    @Test
    @DisplayName("Base32 is 32 upper-case characters without padding")
    void base32Format() {
        assertThat(TwoFactorSecrets.toBase32(secrets.newSecret()))
                .hasSize(BASE32_LENGTH)
                .matches("[A-Z2-7]+");
    }

    @Test
    @DisplayName("the URI encodes space and plus, and carries issuer, digits and period")
    void uriEncoding() {
        String uri = secrets.otpauthUri("Phrasal", "a b+c@x.test", "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");

        assertThat(uri)
                .startsWith("otpauth://totp/Phrasal:a%20b%2Bc%40x.test?")
                .contains("issuer=Phrasal", "digits=6", "period=30", "algorithm=SHA1")
                .doesNotContain("+");
    }

    @Test
    @DisplayName("an issuer with a space is encoded as %20")
    void issuerEncoding() {
        assertThat(secrets.otpauthUri("My App", "u@x.test", "AAAA")).contains("My%20App:").contains("issuer=My%20App");
    }

    @Test
    @DisplayName("the secret in the URI decodes back to the same bytes")
    void secretRoundTrip() {
        byte[] secret = secrets.newSecret();
        String uri = secrets.otpauthUri("Phrasal", "u@x.test", TwoFactorSecrets.toBase32(secret));
        String encoded = uri.substring(uri.indexOf("secret=") + "secret=".length()).split("&")[0];

        assertThat(new Base32().decode(encoded)).isEqualTo(secret);
    }
}
