package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Limits for per-user quiz progress.
 *
 * @param maxStateBytes maximum size of the serialized {@code state} JSON, in bytes
 */
@ConfigurationProperties("phrasal.quiz-progress")
public record QuizProgressProperties(int maxStateBytes) {

}
