package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Settings of "Sign in with Google". The URI fields override Google's own endpoints for a stand-in provider (the
 * docker-compose mock); blank means Google's endpoint.
 *
 * @param enabled          whether Google sign-in is offered at all
 * @param clientId         OAuth client id, required when enabled
 * @param clientSecret     OAuth client secret, required when enabled
 * @param authorizationUri override of the authorization endpoint, the only one the browser visits
 * @param tokenUri         override of the token endpoint
 * @param jwkSetUri        override of the key set that signs the ID token
 * @param issuerUri        override of the expected {@code iss} claim
 * @param userInfoUri      override of the userinfo endpoint
 */
@ConfigurationProperties("phrasal.google")
public record GoogleLoginProperties(boolean enabled, String clientId, String clientSecret, String authorizationUri,
                                    String tokenUri, String jwkSetUri, String issuerUri, String userInfoUri) {

    /**
     * Fails startup when Google sign-in is on without credentials. The message names the env var, never a value.
     *
     * @throws IllegalStateException if enabled with a blank client id or secret
     */
    public GoogleLoginProperties {
        if (enabled) {
            requireValue(clientId, "GOOGLE_CLIENT_ID");
            requireValue(clientSecret, "GOOGLE_CLIENT_SECRET");
        }
    }

    @Override
    public String toString() {
        return "GoogleLoginProperties[enabled=" + enabled + ", clientId=" + clientId + ", clientSecret=*****"
                + ", authorizationUri=" + authorizationUri + ", tokenUri=" + tokenUri + ", jwkSetUri=" + jwkSetUri
                + ", issuerUri=" + issuerUri + ", userInfoUri=" + userInfoUri + "]";
    }

    private static void requireValue(String value, String envVar) {
        if (value == null || value.isBlank()) {
            throw new IllegalStateException(envVar + " must be set when GOOGLE_LOGIN_ENABLED is true");
        }
    }
}
