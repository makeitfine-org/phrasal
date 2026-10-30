package net.phrasal.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnBooleanProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;

import java.net.URI;
import java.util.function.Consumer;

/**
 * Client registration for "Sign in with Google", built here instead of from {@code spring.security.oauth2.client.*}
 * so the whole feature can be switched off with {@code phrasal.google.enabled}.
 */
@Configuration
@ConditionalOnBooleanProperty("phrasal.google.enabled")
public class GoogleLoginConfig {

    static final String REGISTRATION_ID = "google";
    static final String AUTHORIZATION_BASE_URI = "/api/v1/auth/oauth2/authorization";
    static final String CALLBACK_BASE_URI = "/api/v1/auth/oauth2/code/";
    static final String REDIRECT_PATH = CALLBACK_BASE_URI + "{registrationId}";

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(GoogleLoginProperties google,
                                                                     AppProperties app) {
        return new InMemoryClientRegistrationRepository(registration(google, app.baseUrl()));
    }

    /**
     * Builds the Google registration. The redirect URI comes from the configured public address, not from forwarded
     * headers. {@link AppProperties} rejects a base URL with a trailing slash, so the path never starts with two.
     *
     * @param google  client credentials and optional endpoint overrides
     * @param baseUrl public origin of the web app
     * @return the registration
     */
    static ClientRegistration registration(GoogleLoginProperties google, URI baseUrl) {
        ClientRegistration.Builder builder = CommonOAuth2Provider.GOOGLE.getBuilder(REGISTRATION_ID)
                .clientId(google.clientId())
                .clientSecret(google.clientSecret())
                .redirectUri(baseUrl + REDIRECT_PATH)
                .scope("openid", "email", "profile");
        override(google.authorizationUri(), builder::authorizationUri);
        override(google.tokenUri(), builder::tokenUri);
        override(google.jwkSetUri(), builder::jwkSetUri);
        override(google.issuerUri(), builder::issuerUri);
        override(google.userInfoUri(), builder::userInfoUri);
        return builder.build();
    }

    private static void override(String value, Consumer<String> setter) {
        if (value != null && !value.isBlank()) {
            setter.accept(value);
        }
    }
}
