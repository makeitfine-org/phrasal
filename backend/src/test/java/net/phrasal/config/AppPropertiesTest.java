package net.phrasal.config;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("AppProperties")
class AppPropertiesTest {

    private final Validator validator = Validation.buildDefaultValidatorFactory().getValidator();

    @Test
    @DisplayName("an origin with scheme and host is valid")
    void validOrigin() {
        assertThat(validator.validate(new AppProperties(URI.create("https://phrasalbox.com")))).isEmpty();
        assertThat(validator.validate(new AppProperties(URI.create("http://localhost:3000")))).isEmpty();
    }

    @Test
    @DisplayName("a trailing slash is rejected")
    void trailingSlash() {
        assertThat(validator.validate(new AppProperties(URI.create("https://phrasalbox.com/")))).hasSize(1);
    }

    @Test
    @DisplayName("a URL without a scheme or host is rejected")
    void missingSchemeOrHost() {
        assertThat(validator.validate(new AppProperties(URI.create("phrasalbox.com")))).hasSize(1);
        assertThat(validator.validate(new AppProperties(URI.create("/relative")))).hasSize(1);
    }

    @Test
    @DisplayName("a missing URL is rejected")
    void missingUrl() {
        assertThat(validator.validate(new AppProperties(null))).hasSize(1);
    }
}
