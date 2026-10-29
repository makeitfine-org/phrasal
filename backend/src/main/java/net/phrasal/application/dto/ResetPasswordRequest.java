package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.phrasal.application.validation.ValidPassword;

/**
 * Sets a new password through an emailed reset link.
 *
 * @param token    raw token from the link; never logged
 * @param password new raw password, validated by {@link ValidPassword}; never logged
 */
public record ResetPasswordRequest(

        @NotBlank @Size(max = 100)
        String token,

        @NotBlank(message = "Password is required")
        @ValidPassword
        String password
) {

    @Override
    public String toString() {
        return "ResetPasswordRequest[token=*****, password=*****]";
    }
}
