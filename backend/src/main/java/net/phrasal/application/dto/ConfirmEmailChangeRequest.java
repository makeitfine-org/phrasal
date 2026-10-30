package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Redeems an emailed email change link.
 *
 * @param token raw token from the link; never logged
 */
public record ConfirmEmailChangeRequest(@NotBlank @Size(max = 100) String token) {

    @Override
    public String toString() {
        return "ConfirmEmailChangeRequest[token=*****]";
    }
}
