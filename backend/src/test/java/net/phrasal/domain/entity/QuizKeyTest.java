package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("QuizKey")
class QuizKeyTest {

    @Test
    @DisplayName("every value round-trips through its path value")
    void roundTrips() {
        for (QuizKey key : QuizKey.values()) {
            assertThat(QuizKey.fromPathValue(key.pathValue())).contains(key);
        }
    }

    @Test
    @DisplayName("path values are the kebab-case quiz names")
    void pathValues() {
        assertThat(QuizKey.PHRASAL_VERBS.pathValue()).isEqualTo("phrasal-verbs");
        assertThat(QuizKey.GRAMMAR_I_WISH_IF_ONLY.pathValue()).isEqualTo("grammar-i-wish-if-only");
    }

    @Test
    @DisplayName("unknown, null and wrong-case values give an empty result")
    void rejectsInvalid() {
        assertThat(QuizKey.fromPathValue("unknown")).isEmpty();
        assertThat(QuizKey.fromPathValue(null)).isEmpty();
        assertThat(QuizKey.fromPathValue("Phrasal-Verbs")).isEmpty();
        assertThat(QuizKey.fromPathValue("PHRASAL_VERBS")).isEmpty();
    }
}
