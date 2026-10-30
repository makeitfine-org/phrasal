package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.phrasal.application.validation.ValidPassword;

/**
 * Changes the password of the signed-in account.
 *
 * @param currentPassword the password as it is now; proves the person at the keyboard owns the account; never logged
 * @param newPassword     the new raw password, validated by {@link ValidPassword}; never logged
 */
public record ChangePasswordRequest(

        @NotBlank(message = "Current password is required") @Size(max = 200)
        String currentPassword,

        @NotBlank(message = "New password is required")
        @ValidPassword
        String newPassword
) {

    @Override
    public String toString() {
        return "ChangePasswordRequest[currentPassword=*****, newPassword=*****]";
    }
}
