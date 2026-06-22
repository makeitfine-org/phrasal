package net.phrasal.application.mapper;

import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.domain.entity.PhrasalVerb;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PhrasalVerbMapper")
class PhrasalVerbMapperTest {

    private final PhrasalVerbMapper mapper = Mappers.getMapper(PhrasalVerbMapper.class);

    @Test
    @DisplayName("toResponse maps all fields from entity")
    void toResponse_mapsAllFields() {
        PhrasalVerb entity = new PhrasalVerb("Break down", "To stop working",
                List.of("It broke down."), List.of("broke down"));
        entity.setId(1L);
        entity.setIsLearned(false);
        entity.setVersion(0L);

        PhrasalVerbResponse response = mapper.toResponse(entity);

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.verb()).isEqualTo("Break down");
        assertThat(response.definition()).isEqualTo("To stop working");
        assertThat(response.sentences()).containsExactly("It broke down.");
        assertThat(response.wordsToHide()).containsExactly("broke down");
        assertThat(response.isLearned()).isFalse();
    }

    @Test
    @DisplayName("toEntity maps request fields, ignores audit fields")
    void toEntity_mapsRequestFields() {
        PhrasalVerbRequest request = new PhrasalVerbRequest(
                "Get up", "To rise", List.of("I get up early."), List.of("get up"), true);

        PhrasalVerb entity = mapper.toEntity(request);

        assertThat(entity.getVerb()).isEqualTo("Get up");
        assertThat(entity.getDefinition()).isEqualTo("To rise");
        assertThat(entity.getSentences()).containsExactly("I get up early.");
        assertThat(entity.getIsLearned()).isTrue();
        assertThat(entity.getId()).isNull();
    }

    @Test
    @DisplayName("toResponse returns null for null entity")
    void toResponse_handlesNullEntity() {
        PhrasalVerbResponse response = mapper.toResponse(null);
        assertThat(response).isNull();
    }
}
