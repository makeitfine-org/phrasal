package net.phrasal.application.mapper;

import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.domain.entity.PhrasalVerb;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

class PhrasalVerbMapperTest {

    private final PhrasalVerbMapper mapper = Mappers.getMapper(PhrasalVerbMapper.class);

    @Test
    void toResponse_mapsAllFields() {
        PhrasalVerb entity = new PhrasalVerb("Break down", "To stop working",
                List.of("It broke down."), List.of("broke down"));
        entity.setId(1L);
        entity.setIsLearned(false);
        entity.setVersion(0L);

        PhrasalVerbResponse response = mapper.toResponse(entity);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getVerb()).isEqualTo("Break down");
        assertThat(response.getDefinition()).isEqualTo("To stop working");
        assertThat(response.getSentences()).containsExactly("It broke down.");
        assertThat(response.getWordsToHide()).containsExactly("broke down");
        assertThat(response.getIsLearned()).isFalse();
    }

    @Test
    void toEntity_mapsRequestFields() {
        PhrasalVerbRequest request = new PhrasalVerbRequest();
        request.setVerb("Get up");
        request.setDefinition("To rise");
        request.setSentences(List.of("I get up early."));
        request.setWordsToHide(List.of("get up"));
        request.setIsLearned(true);

        PhrasalVerb entity = mapper.toEntity(request);

        assertThat(entity.getVerb()).isEqualTo("Get up");
        assertThat(entity.getDefinition()).isEqualTo("To rise");
        assertThat(entity.getSentences()).containsExactly("I get up early.");
        assertThat(entity.getIsLearned()).isTrue();
        assertThat(entity.getId()).isNull();
    }

    @Test
    void toResponse_handlesNullEntity() {
        PhrasalVerbResponse response = mapper.toResponse(null);
        assertThat(response).isNull();
    }
}
