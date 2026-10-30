package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * A code from the authenticator app, or a recovery code where the endpoint allows it.
 *
 * @param code the submitted code
 */
public record TwoFactorCodeRequest(@NotBlank @Size(max = 64) String code) {

    @Override
    public String toString() {
        return "TwoFactorCodeRequest[code=*****]";
    }
}
