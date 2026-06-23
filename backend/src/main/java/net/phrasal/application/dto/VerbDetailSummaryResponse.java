package net.phrasal.application.dto;

import java.util.List;

public record VerbDetailSummaryResponse(
        Long id,
        String verb,
        String label,
        List<String> particles
) {
}
