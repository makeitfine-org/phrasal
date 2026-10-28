package net.phrasal.application.mapper;

import net.phrasal.application.dto.QuizProgressResponse;
import net.phrasal.domain.entity.QuizKey;
import net.phrasal.domain.entity.UserQuizProgress;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("QuizProgressMapper")
class QuizProgressMapperTest {

    private final QuizProgressMapper mapper = Mappers.getMapper(QuizProgressMapper.class);

    @Test
    @DisplayName("toResponse maps the quiz key to its path value and copies state, version and updatedAt")
    void toResponse_mapsAllFields() {
        UserQuizProgress entity = new UserQuizProgress(1L, QuizKey.GRAMMAR_I_WISH_IF_ONLY, Map.of("a", 1));
        LocalDateTime updatedAt = LocalDateTime.of(2026, 1, 2, 3, 4);
        entity.setVersion(3L);
        entity.setUpdatedAt(updatedAt);

        QuizProgressResponse response = mapper.toResponse(entity);

        assertThat(response.quizKey()).isEqualTo("grammar-i-wish-if-only");
        assertThat(response.state()).containsEntry("a", 1);
        assertThat(response.version()).isEqualTo(3L);
        assertThat(response.updatedAt()).isEqualTo(updatedAt);
    }

    @Test
    @DisplayName("toResponse returns null for null entity")
    void toResponse_handlesNullEntity() {
        assertThat(mapper.toResponse(null)).isNull();
    }
}
