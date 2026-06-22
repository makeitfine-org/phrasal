package net.phrasal.application.mapper;

import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.domain.entity.GrammarEntry;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface GrammarEntryMapper {

    GrammarEntryResponse toResponse(GrammarEntry entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    GrammarEntry toEntity(GrammarEntryRequest request);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "version", ignore = true)
    void updateEntityFromRequest(GrammarEntryRequest request, @MappingTarget GrammarEntry entity);
}
