package net.phrasal.application.mapper;

import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.domain.entity.GrammarEntry;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GrammarEntryMapper")
class GrammarEntryMapperTest {

    private final GrammarEntryMapper mapper = Mappers.getMapper(GrammarEntryMapper.class);

    @Test
    @DisplayName("toResponse maps all fields from entity")
    void toResponse_mapsAllFields() {
        GrammarEntry entity = new GrammarEntry("i-wish", "Test sentence", List.of("Answer 1", "Answer 2"));
        entity.setId(1L);
        entity.setVersion(0L);

        GrammarEntryResponse response = mapper.toResponse(entity);

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.category()).isEqualTo("i-wish");
        assertThat(response.sentence()).isEqualTo("Test sentence");
        assertThat(response.correctAnswers()).containsExactly("Answer 1", "Answer 2");
    }

    @Test
    @DisplayName("toEntity maps request fields, ignores audit fields")
    void toEntity_mapsRequestFields() {
        GrammarEntryRequest request = new GrammarEntryRequest("test", "Test", List.of("A"));

        GrammarEntry entity = mapper.toEntity(request);

        assertThat(entity.getCategory()).isEqualTo("test");
        assertThat(entity.getSentence()).isEqualTo("Test");
        assertThat(entity.getId()).isNull();
    }

    @Test
    @DisplayName("toResponse returns null for null entity")
    void toResponse_handlesNullEntity() {
        GrammarEntryResponse response = mapper.toResponse(null);
        assertThat(response).isNull();
    }
}
