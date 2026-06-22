package net.phrasal.domain.entity;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class GrammarEntryEntityTest {

    @Test
    void constructorAndGetters() {
        GrammarEntry entry = new GrammarEntry("i-wish", "Sentence", List.of("Answer"));

        assertThat(entry.getCategory()).isEqualTo("i-wish");
        assertThat(entry.getSentence()).isEqualTo("Sentence");
        assertThat(entry.getCorrectAnswers()).containsExactly("Answer");
    }

    @Test
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
    void equalsAndHashCode() {
        GrammarEntry a = new GrammarEntry();
        a.setId(1L);

        GrammarEntry b = new GrammarEntry();
        b.setId(1L);

        assertThat(a).isEqualTo(b);
        assertThat(a.hashCode()).isEqualTo(b.hashCode());
    }

    @Test
    void toStringContainsCategory() {
        GrammarEntry entry = new GrammarEntry();
        entry.setCategory("test");
        assertThat(entry.toString()).contains("test");
    }
}
