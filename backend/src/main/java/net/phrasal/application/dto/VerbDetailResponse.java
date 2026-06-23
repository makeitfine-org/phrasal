package net.phrasal.application.dto;

import net.phrasal.domain.entity.VerbDetailSection;

import java.time.LocalDateTime;
import java.util.List;

public record VerbDetailResponse(
        Long id,
        String verb,
        String label,
        List<String> particles,
        List<VerbDetailSection> sections,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long version
) {

}
