package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * Credentials for password login. The email is only checked for presence: format is validated at
 * registration, and padded input must reach normalization instead of failing here.
 *
 * @param email    account email, normalized before lookup
 * @param password raw password, never logged
 */
public record LoginRequest(@NotBlank String email, @NotBlank String password) {

    @Override
    public String toString() {
        return "LoginRequest[email=" + email + ", password=*****]";
    }
}
