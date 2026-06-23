package net.phrasal.application.mapper;

import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.domain.entity.VerbDetail;
import net.phrasal.domain.entity.VerbDetailMeaning;
import net.phrasal.domain.entity.VerbDetailSection;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("VerbDetailMapper")
class VerbDetailMapperTest {

    private final VerbDetailMapper mapper = Mappers.getMapper(VerbDetailMapper.class);

    private VerbDetailSection sampleSection() {
        return new VerbDetailSection("on", "actOn",
                List.of(new VerbDetailMeaning("def", "ex", "img.png", "alt")));
    }

    @Test
    @DisplayName("toResponse maps all fields from entity")
    void toResponse_mapsAllFields() {
        VerbDetail entity = new VerbDetail("act", "Act", List.of("on", "up"), List.of(sampleSection()));
        entity.setId(1L);
        entity.setVersion(0L);

        VerbDetailResponse response = mapper.toResponse(entity);

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.verb()).isEqualTo("act");
        assertThat(response.label()).isEqualTo("Act");
        assertThat(response.particles()).containsExactly("on", "up");
        assertThat(response.sections()).hasSize(1);
        assertThat(response.sections().get(0).particle()).isEqualTo("on");
    }

    @Test
    @DisplayName("toSummaryResponse maps summary fields only")
    void toSummaryResponse_mapsSummaryFields() {
        VerbDetail entity = new VerbDetail("act", "Act", List.of("on", "up"), List.of(sampleSection()));
        entity.setId(1L);

        VerbDetailSummaryResponse response = mapper.toSummaryResponse(entity);

        assertThat(response.id()).isEqualTo(1L);
        assertThat(response.verb()).isEqualTo("act");
        assertThat(response.label()).isEqualTo("Act");
        assertThat(response.particles()).containsExactly("on", "up");
    }

    @Test
    @DisplayName("toEntity maps request fields, ignores audit fields")
    void toEntity_mapsRequestFields() {
        VerbDetailRequest request = new VerbDetailRequest(
                "go", "Go", List.of("off", "on"), List.of(sampleSection()));

        VerbDetail entity = mapper.toEntity(request);

        assertThat(entity.getVerb()).isEqualTo("go");
        assertThat(entity.getLabel()).isEqualTo("Go");
        assertThat(entity.getParticles()).containsExactly("off", "on");
        assertThat(entity.getSections()).hasSize(1);
        assertThat(entity.getId()).isNull();
    }

    @Test
    @DisplayName("toResponse returns null for null entity")
    void toResponse_handlesNullEntity() {
        assertThat(mapper.toResponse(null)).isNull();
    }
}
