package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PhrasalVerbRequest(

        @NotBlank(message = "Verb is required")
        @Size(max = 100, message = "Verb must not exceed 100 characters")
        String verb,

        @NotBlank(message = "Definition is required")
        String definition,

        @NotNull(message = "Sentences are required")
        List<String> sentences,

        @NotNull(message = "Words to hide are required")
        List<String> wordsToHide,

        Boolean isLearned
) {

    public PhrasalVerbRequest {
        if (isLearned == null) {
            isLearned = false;
        }
    }
}
