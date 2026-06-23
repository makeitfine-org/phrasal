package net.phrasal.application.dto;

import java.time.LocalDateTime;
import java.util.List;

public record PhrasalVerbResponse(
        Long id,
        String verb,
        String definition,
        List<String> sentences,
        List<String> wordsToHide,
        Boolean isLearned,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Long version
) {

}
