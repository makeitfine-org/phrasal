package net.phrasal.application.dto;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Stored quiz progress of the current user.
 *
 * @param quizKey   quiz identifier as used in the URL path
 * @param state     opaque progress object owned by the client
 * @param version   optimistic version, incremented on every save
 * @param updatedAt time of the last save
 */
public record QuizProgressResponse(
        String quizKey,
        Map<String, Object> state,
        Long version,
        LocalDateTime updatedAt
) {

}
