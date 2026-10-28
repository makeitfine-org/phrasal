package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PhrasalVerb Entity")
class PhrasalVerbEntityTest {

    @Test
    @DisplayName("constructor sets fields and leaves id and audit fields empty")
    void constructorAndGetters() {
        PhrasalVerb verb = new PhrasalVerb("Get up", "To rise", List.of("I get up early."), List.of("get up"));

        assertThat(verb.getVerb()).isEqualTo("Get up");
        assertThat(verb.getDefinition()).isEqualTo("To rise");
        assertThat(verb.getSentences()).containsExactly("I get up early.");
        assertThat(verb.getWordsToHide()).containsExactly("get up");
        assertThat(verb.getId()).isNull();
        assertThat(verb.getCreatedAt()).isNull();
    }

    @Test
    @DisplayName("setters update all fields")
    void setters() {
        PhrasalVerb verb = new PhrasalVerb();
        verb.setId(1L);
        verb.setVerb("Test");
        verb.setDefinition("Def");
        verb.setSentences(List.of("S"));
        verb.setWordsToHide(List.of("W"));
        verb.setVersion(1L);

        assertThat(verb.getId()).isEqualTo(1L);
        assertThat(verb.getVerb()).isEqualTo("Test");
        assertThat(verb.getWordsToHide()).containsExactly("W");
        assertThat(verb.getVersion()).isEqualTo(1L);
    }

    @Test
    @DisplayName("equals and hashCode use id and verb")
    void equalsAndHashCode() {
        PhrasalVerb a = new PhrasalVerb();
        a.setId(1L);
        a.setVerb("Test");

        PhrasalVerb b = new PhrasalVerb();
        b.setId(1L);
        b.setVerb("Test");

        assertThat(a).isEqualTo(b);
        assertThat(a.hashCode()).isEqualTo(b.hashCode());
    }

    @Test
    @DisplayName("toString includes verb name")
    void toStringContainsVerb() {
        PhrasalVerb verb = new PhrasalVerb();
        verb.setVerb("Break down");
        assertThat(verb.toString()).contains("Break down");
    }

    @Test
    @DisplayName("toString leaves out definition and the removed isLearned flag")
    void toStringOmitsOtherFields() {
        PhrasalVerb verb = new PhrasalVerb("Get up", "To rise", List.of("S"), List.of("W"));
        assertThat(verb.toString()).doesNotContain("To rise").doesNotContain("isLearned");
    }
}
