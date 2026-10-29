package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Asks for a password reset link. The email is only checked for presence, like {@link ResendVerificationRequest}, so
 * padded input reaches normalization. The length cap bounds the rate-limiter key.
 *
 * @param email address as typed by the user
 */
public record ForgotPasswordRequest(@NotBlank @Size(max = 254) String email) {

}
