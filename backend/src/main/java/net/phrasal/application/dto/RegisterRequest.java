package net.phrasal.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import net.phrasal.application.validation.PasswordNotContainingEmail;
import net.phrasal.application.validation.ValidPassword;

/**
 * Sign-up payload.
 *
 * @param email    account email, normalized before use
 * @param password raw password, validated by {@link ValidPassword}; never logged
 */
@PasswordNotContainingEmail
public record RegisterRequest(

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 254, message = "Email must not exceed 254 characters")
        String email,

        @NotBlank(message = "Password is required")
        @ValidPassword
        String password
) {

    @Override
    public String toString() {
        return "RegisterRequest[email=" + email + ", password=*****]";
    }
}
