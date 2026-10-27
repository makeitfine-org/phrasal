package net.phrasal.infrastructure.security;

import org.junit.jupiter.api.Test;

import java.util.Locale;

import static org.assertj.core.api.Assertions.assertThat;

class EmailNormalizerTest {

    @Test
    void normalize_trimsAndLowerCases() {
        assertThat(EmailNormalizer.normalize("  Bob@X.COM ")).isEqualTo("bob@x.com");
    }

    @Test
    void normalize_alreadyNormalized_unchanged() {
        assertThat(EmailNormalizer.normalize("bob@x.com")).isEqualTo("bob@x.com");
    }

    @Test
    void normalize_turkishDefaultLocale_stillAscii() {
        Locale previous = Locale.getDefault();
        Locale.setDefault(Locale.forLanguageTag("tr-TR"));
        try {
            assertThat(EmailNormalizer.normalize("INFO@X.COM")).isEqualTo("info@x.com");
        } finally {
            Locale.setDefault(previous);
        }
    }
}
