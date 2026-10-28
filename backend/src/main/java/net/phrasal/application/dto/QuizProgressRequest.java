package net.phrasal.application.dto;

import jakarta.validation.constraints.NotNull;

import java.util.Map;

/**
 * Body of a quiz progress save.
 *
 * @param state opaque progress object owned by the client
 */
public record QuizProgressRequest(

        @NotNull(message = "State is required")
        Map<String, Object> state
) {

}
