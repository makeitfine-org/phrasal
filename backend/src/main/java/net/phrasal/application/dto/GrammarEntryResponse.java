package net.phrasal.application.dto;

import java.time.LocalDateTime;
import java.util.List;

public record GrammarEntryResponse(
        Long id,
        String category,
        String sentence,
        List<String> correctAnswers,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long version
) {
}
