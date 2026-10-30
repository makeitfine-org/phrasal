package net.phrasal.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistration.ProviderDetails;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("GoogleLoginConfig")
class GoogleLoginConfigTest {

    private static final String CLIENT_ID = "test-client";
    private static final String SECRET = "test-secret";
    private static final URI BASE_URL = URI.create("https://phrasalbox.com");
    private static final String GOOGLE_AUTHORIZATION = "https://accounts.google.com/o/oauth2/v2/auth";
    private static final String GOOGLE_TOKEN = "https://www.googleapis.com/oauth2/v4/token";
    private static final String GOOGLE_JWKS = "https://www.googleapis.com/oauth2/v3/certs";
    private static final String GOOGLE_ISSUER = "https://accounts.google.com";
    private static final String GOOGLE_USER_INFO = "https://www.googleapis.com/oauth2/v3/userinfo";
    private static final String MOCK = "http://mock-oauth2:8080/default";

    private final ApplicationContextRunner contextRunner = new ApplicationContextRunner()
            .withUserConfiguration(GoogleLoginConfig.class)
            .withBean(GoogleLoginProperties.class, () -> google("", "", "", "", ""))
            .withBean(AppProperties.class, () -> new AppProperties(BASE_URL));

    private static GoogleLoginProperties google(String authorizationUri, String tokenUri, String jwkSetUri,
                                                String issuerUri, String userInfoUri) {
        return new GoogleLoginProperties(true, CLIENT_ID, SECRET, authorizationUri, tokenUri, jwkSetUri, issuerUri,
                userInfoUri);
    }

    @Test
    @DisplayName("without overrides the registration uses Google's endpoints, our scopes and APP_BASE_URL")
    void googleDefaults() {
        ClientRegistration registration = GoogleLoginConfig.registration(google("", "", "", "", ""), BASE_URL);

        ProviderDetails provider = registration.getProviderDetails();
        assertThat(registration.getRegistrationId()).isEqualTo("google");
        assertThat(registration.getClientId()).isEqualTo(CLIENT_ID);
        assertThat(registration.getClientSecret()).isEqualTo(SECRET);
        assertThat(registration.getScopes()).containsExactlyInAnyOrder("openid", "email", "profile");
        assertThat(registration.getRedirectUri())
                .isEqualTo("https://phrasalbox.com/api/v1/auth/oauth2/code/{registrationId}");
        assertThat(provider.getAuthorizationUri()).isEqualTo(GOOGLE_AUTHORIZATION);
        assertThat(provider.getTokenUri()).isEqualTo(GOOGLE_TOKEN);
        assertThat(provider.getJwkSetUri()).isEqualTo(GOOGLE_JWKS);
        assertThat(provider.getIssuerUri()).isEqualTo(GOOGLE_ISSUER);
        assertThat(provider.getUserInfoEndpoint().getUri()).isEqualTo(GOOGLE_USER_INFO);
    }

    @Test
    @DisplayName("every override replaces Google's endpoint")
    void allOverrides() {
        ClientRegistration registration = GoogleLoginConfig.registration(google(
                "http://localhost:8090/default/authorize", MOCK + "/token", MOCK + "/jwks", MOCK,
                MOCK + "/userinfo"), URI.create("http://localhost:3100"));

        ProviderDetails provider = registration.getProviderDetails();
        assertThat(provider.getAuthorizationUri()).isEqualTo("http://localhost:8090/default/authorize");
        assertThat(provider.getTokenUri()).isEqualTo(MOCK + "/token");
        assertThat(provider.getJwkSetUri()).isEqualTo(MOCK + "/jwks");
        assertThat(provider.getIssuerUri()).isEqualTo(MOCK);
        assertThat(provider.getUserInfoEndpoint().getUri()).isEqualTo(MOCK + "/userinfo");
        assertThat(registration.getRedirectUri())
                .isEqualTo("http://localhost:3100/api/v1/auth/oauth2/code/{registrationId}");
    }

    @Test
    @DisplayName("a partial override keeps Google's other endpoints; blank and missing values are ignored")
    void partialOverride() {
        ClientRegistration registration = GoogleLoginConfig.registration(
                google(null, MOCK + "/token", " ", null, ""), BASE_URL);

        ProviderDetails provider = registration.getProviderDetails();
        assertThat(provider.getTokenUri()).isEqualTo(MOCK + "/token");
        assertThat(provider.getAuthorizationUri()).isEqualTo(GOOGLE_AUTHORIZATION);
        assertThat(provider.getJwkSetUri()).isEqualTo(GOOGLE_JWKS);
        assertThat(provider.getIssuerUri()).isEqualTo(GOOGLE_ISSUER);
        assertThat(provider.getUserInfoEndpoint().getUri()).isEqualTo(GOOGLE_USER_INFO);
    }

    @Test
    @DisplayName("with phrasal.google.enabled=true the repository holds the google registration")
    void enabledRegistersRepository() {
        contextRunner.withPropertyValues("phrasal.google.enabled=true").run(context -> {
            ClientRegistrationRepository repository = context.getBean(ClientRegistrationRepository.class);

            assertThat(repository.findByRegistrationId("google").getClientId()).isEqualTo(CLIENT_ID);
            assertThat(repository.findByRegistrationId("github")).isNull();
        });
    }

    @Test
    @DisplayName("with phrasal.google.enabled=false or unset there is no client registration repository")
    void disabledRegistersNothing() {
        contextRunner.withPropertyValues("phrasal.google.enabled=false")
                .run(context -> assertThat(context).doesNotHaveBean(ClientRegistrationRepository.class));
        contextRunner.run(context -> assertThat(context).doesNotHaveBean(ClientRegistrationRepository.class));
    }
}
