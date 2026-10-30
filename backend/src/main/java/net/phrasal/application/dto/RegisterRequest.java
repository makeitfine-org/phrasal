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
 * @param website  honeypot; people never see or fill it
 */
@PasswordNotContainingEmail
public record RegisterRequest(

        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        @Size(max = 254, message = "Email must not exceed 254 characters")
        String email,

        @NotBlank(message = "Password is required")
        @ValidPassword
        String password,

        @Size(max = 200, message = "Website must not exceed 200 characters")
        String website
) {

    /**
     * Payload without the honeypot field.
     *
     * @param email    account email
     * @param password raw password
     */
    public RegisterRequest(String email, String password) {
        this(email, password, null);
    }

    /**
     * Tells whether the honeypot was filled, which only a bot does.
     *
     * @return true when {@code website} has any non-blank text
     */
    public boolean honeypotFilled() {
        return website != null && !website.isBlank();
    }

    @Override
    public String toString() {
        return "RegisterRequest[email=" + email + ", password=*****, website="
                + (honeypotFilled() ? "filled" : "empty") + "]";
    }
}
