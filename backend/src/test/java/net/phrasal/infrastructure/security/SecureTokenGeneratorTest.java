package net.phrasal.infrastructure.security;

import net.phrasal.infrastructure.security.SecureTokenGenerator.IssuedToken;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.HashSet;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("SecureTokenGenerator")
class SecureTokenGeneratorTest {

    private static final int RAW_LENGTH = 43;
    private static final int SAMPLE_SIZE = 1000;
    private static final String SHA256_OF_ABC =
            "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad";

    private final SecureTokenGenerator generator = new SecureTokenGenerator();

    @Test
    @DisplayName("raw token is 43 url-safe characters without padding")
    void rawTokenFormat() {
        assertThat(generator.generate().rawToken()).matches("^[A-Za-z0-9_-]{" + RAW_LENGTH + "}$");
    }

    @Test
    @DisplayName("1000 generated tokens are all distinct")
    void tokensAreDistinct() {
        Set<String> seen = new HashSet<>();
        for (int i = 0; i < SAMPLE_SIZE; i++) {
            seen.add(generator.generate().rawToken());
        }

        assertThat(seen).hasSize(SAMPLE_SIZE);
    }

    @Test
    @DisplayName("hash is 64 lowercase hex chars, deterministic and matches the SHA-256 test vector")
    void hashFormat() {
        assertThat(SecureTokenGenerator.hash("abc")).isEqualTo(SHA256_OF_ABC);
        assertThat(SecureTokenGenerator.hash("abc")).isEqualTo(SecureTokenGenerator.hash("abc"));
        assertThat(SecureTokenGenerator.hash("abd")).isNotEqualTo(SHA256_OF_ABC).matches("^[0-9a-f]{64}$");
    }

    @Test
    @DisplayName("the stored hash is the hash of the raw token")
    void hashMatchesRawToken() {
        IssuedToken token = generator.generate();

        assertThat(SecureTokenGenerator.hash(token.rawToken())).isEqualTo(token.hash());
    }

    @Test
    @DisplayName("IssuedToken.toString hides the raw token")
    void toStringMasksRawToken() {
        IssuedToken token = generator.generate();

        assertThat(token.toString()).doesNotContain(token.rawToken()).contains("*****");
    }
}
