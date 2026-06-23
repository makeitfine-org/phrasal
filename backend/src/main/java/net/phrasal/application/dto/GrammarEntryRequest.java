package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record GrammarEntryRequest(

        @NotBlank(message = "Category is required")
        @Size(max = 100, message = "Category must not exceed 100 characters")
        String category,

        @NotBlank(message = "Sentence is required")
        String sentence,

        @NotNull(message = "Correct answers are required")
        List<String> correctAnswers
) {

}
