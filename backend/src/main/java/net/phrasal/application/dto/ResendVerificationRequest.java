package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Asks for a new verification link. The email is only checked for presence, like {@link LoginRequest}, so padded
 * input reaches normalization. The length cap bounds the rate-limiter key.
 *
 * @param email address as typed by the user
 */
public record ResendVerificationRequest(@NotBlank @Size(max = 254) String email) {

}
