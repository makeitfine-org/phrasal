package net.phrasal.application.dto;

/**
 * What the authenticator app needs to import the account.
 *
 * @param secret     Base32 shared secret, for manual entry
 * @param otpauthUri URI to render as a QR code
 */
public record TwoFactorSetupResponse(String secret, String otpauthUri) {

    @Override
    public String toString() {
        return "TwoFactorSetupResponse[secret=*****, otpauthUri=*****]";
    }
}
