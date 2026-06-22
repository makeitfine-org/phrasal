package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GrammarEntry Entity")
class GrammarEntryEntityTest {

    @Test
    @DisplayName("constructor sets fields")
    void constructorAndGetters() {
        GrammarEntry entry = new GrammarEntry("i-wish", "Sentence", List.of("Answer"));

        assertThat(entry.getCategory()).isEqualTo("i-wish");
        assertThat(entry.getSentence()).isEqualTo("Sentence");
        assertThat(entry.getCorrectAnswers()).containsExactly("Answer");
    }

    @Test
    @DisplayName("setters update all fields")
    void setters() {
        GrammarEntry entry = new GrammarEntry();
        entry.setId(1L);
        entry.setCategory("cat");
        entry.setSentence("sent");
        entry.setCorrectAnswers(List.of("a"));
        entry.setVersion(2L);

        assertThat(entry.getId()).isEqualTo(1L);
        assertThat(entry.getCategory()).isEqualTo("cat");
        assertThat(entry.getVersion()).isEqualTo(2L);
    }

    @Test
    @DisplayName("equals and hashCode use id only")
    void equalsAndHashCode() {
        GrammarEntry a = new GrammarEntry();
        a.setId(1L);

        GrammarEntry b = new GrammarEntry();
        b.setId(1L);

        assertThat(a).isEqualTo(b);
        assertThat(a.hashCode()).isEqualTo(b.hashCode());
    }

    @Test
    @DisplayName("toString includes category")
    void toStringContainsCategory() {
        GrammarEntry entry = new GrammarEntry();
        entry.setCategory("test");
        assertThat(entry.toString()).contains("test");
    }
}
