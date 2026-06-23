package net.phrasal.application.mapper;

import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.domain.entity.VerbDetail;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface VerbDetailMapper {

    VerbDetailResponse toResponse(VerbDetail entity);

    VerbDetailSummaryResponse toSummaryResponse(VerbDetail entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    VerbDetail toEntity(VerbDetailRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    void updateEntityFromRequest(VerbDetailRequest request, @MappingTarget VerbDetail entity);
}
