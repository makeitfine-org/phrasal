package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import net.phrasal.domain.entity.VerbDetailSection;

import java.util.List;

public record VerbDetailRequest(

        @NotBlank(message = "Verb is required")
        @Size(max = 50, message = "Verb must not exceed 50 characters")
        String verb,

        @NotBlank(message = "Label is required")
        @Size(max = 50, message = "Label must not exceed 50 characters")
        String label,

        @NotNull(message = "Particles are required")
        List<String> particles,

        @NotNull(message = "Sections are required")
        List<VerbDetailSection> sections
) {

}
