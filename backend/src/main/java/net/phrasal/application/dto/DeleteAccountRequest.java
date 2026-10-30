package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Asks to delete the account for good.
 *
 * @param password the account's current password; never logged
 * @param code     a TOTP or recovery code; needed only when two-factor authentication is on; never logged
 */
public record DeleteAccountRequest(@NotBlank @Size(max = 200) String password, @Size(max = 50) String code) {

    @Override
    public String toString() {
        return "DeleteAccountRequest[password=*****, code=*****]";
    }
}
