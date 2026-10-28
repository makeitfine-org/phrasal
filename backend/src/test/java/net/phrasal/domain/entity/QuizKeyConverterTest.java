package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("QuizKeyConverter")
class QuizKeyConverterTest {

    private final QuizKeyConverter converter = new QuizKeyConverter();

    @Test
    @DisplayName("converts enum to path value and back")
    void roundTrips() {
        for (QuizKey key : QuizKey.values()) {
            String column = converter.convertToDatabaseColumn(key);

            assertThat(column).isEqualTo(key.pathValue());
            assertThat(converter.convertToEntityAttribute(column)).isEqualTo(key);
        }
    }

    @Test
    @DisplayName("null stays null in both directions")
    void nullStaysNull() {
        assertThat(converter.convertToDatabaseColumn(null)).isNull();
        assertThat(converter.convertToEntityAttribute(null)).isNull();
    }

    @Test
    @DisplayName("an unknown database value is rejected")
    void unknownValue() {
        assertThatThrownBy(() -> converter.convertToEntityAttribute("nope"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageNotContaining("nope");
    }
}
