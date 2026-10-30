package net.phrasal.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Asks to move the account to a new address.
 *
 * @param newEmail        the address to move to, as typed by the user
 * @param currentPassword the account's current password; never logged
 */
public record ChangeEmailRequest(@NotBlank @Email @Size(max = 254) String newEmail,
                                 @NotBlank @Size(max = 200) String currentPassword) {

    @Override
    public String toString() {
        return "ChangeEmailRequest[newEmail=" + newEmail + ", currentPassword=*****]";
    }
}
