package net.phrasal.application.mapper;

import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.domain.entity.GrammarEntry;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class GrammarEntryMapperTest {

    private final GrammarEntryMapper mapper = Mappers.getMapper(GrammarEntryMapper.class);

    @Test
    void toResponse_mapsAllFields() {
        GrammarEntry entity = new GrammarEntry("i-wish", "Test sentence", List.of("Answer 1", "Answer 2"));
        entity.setId(1L);
        entity.setVersion(0L);

        GrammarEntryResponse response = mapper.toResponse(entity);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getCategory()).isEqualTo("i-wish");
        assertThat(response.getSentence()).isEqualTo("Test sentence");
        assertThat(response.getCorrectAnswers()).containsExactly("Answer 1", "Answer 2");
    }

    @Test
    void toEntity_mapsRequestFields() {
        GrammarEntryRequest request = new GrammarEntryRequest();
        request.setCategory("test");
        request.setSentence("Test");
        request.setCorrectAnswers(List.of("A"));

        GrammarEntry entity = mapper.toEntity(request);

        assertThat(entity.getCategory()).isEqualTo("test");
        assertThat(entity.getSentence()).isEqualTo("Test");
        assertThat(entity.getId()).isNull();
    }

    @Test
    void toResponse_handlesNullEntity() {
        GrammarEntryResponse response = mapper.toResponse(null);
        assertThat(response).isNull();
    }
}
