package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Starts 2FA enrollment; the password proves the person at the keyboard owns the account.
 *
 * @param password the current account password
 */
public record TwoFactorSetupRequest(@NotBlank @Size(max = 200) String password) {

    @Override
    public String toString() {
        return "TwoFactorSetupRequest[password=*****]";
    }
}
