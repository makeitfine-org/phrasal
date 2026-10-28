package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("UserQuizProgress Entity")
class UserQuizProgressEntityTest {

    private static final String SECRET_MARKER = "secret-answer-marker";

    @Test
    @DisplayName("constructor sets fields and leaves id and audit fields empty")
    void constructor() {
        UserQuizProgress progress = new UserQuizProgress(7L, QuizKey.PHRASAL_VERBS, Map.of("a", 1));

        assertThat(progress.getUserId()).isEqualTo(7L);
        assertThat(progress.getQuizKey()).isEqualTo(QuizKey.PHRASAL_VERBS);
        assertThat(progress.getState()).containsEntry("a", 1);
        assertThat(progress.getId()).isNull();
        assertThat(progress.getCreatedAt()).isNull();
        assertThat(progress.getVersion()).isNull();
    }

    @Test
    @DisplayName("toString lists identifiers but never the state")
    void toStringOmitsState() {
        UserQuizProgress progress = new UserQuizProgress(7L, QuizKey.PHRASAL_VERBS, Map.of("k", SECRET_MARKER));
        progress.setId(3L);

        assertThat(progress.toString())
                .contains("id=3")
                .contains("userId=7")
                .contains("PHRASAL_VERBS")
                .doesNotContain(SECRET_MARKER)
                .doesNotContain("state");
    }

    @Test
    @DisplayName("equals and hashCode use id only")
    void equalsAndHashCode() {
        UserQuizProgress a = new UserQuizProgress(1L, QuizKey.PHRASAL_VERBS, Map.of("x", 1));
        a.setId(5L);
        UserQuizProgress b = new UserQuizProgress(2L, QuizKey.GRAMMAR_I_WISH_IF_ONLY, Map.of("y", 2));
        b.setId(5L);
        UserQuizProgress c = new UserQuizProgress(1L, QuizKey.PHRASAL_VERBS, Map.of("x", 1));
        c.setId(6L);

        assertThat(a).isEqualTo(b).hasSameHashCodeAs(b);
        assertThat(a).isNotEqualTo(c);
    }
}
