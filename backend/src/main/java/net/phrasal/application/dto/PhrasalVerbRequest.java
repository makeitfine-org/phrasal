package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class PhrasalVerbRequest {

    @NotBlank(message = "Verb is required")
    @Size(max = 100, message = "Verb must not exceed 100 characters")
    private String verb;

    @NotBlank(message = "Definition is required")
    private String definition;

    @NotNull(message = "Sentences are required")
    private List<String> sentences;

    @NotNull(message = "Words to hide are required")
    private List<String> wordsToHide;

    private Boolean isLearned = false;
}
