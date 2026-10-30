package net.phrasal.presentation.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("NoOpAuthorizedClientRepository")
class NoOpAuthorizedClientRepositoryTest {

    private final NoOpAuthorizedClientRepository repository = new NoOpAuthorizedClientRepository();
    private final TestingAuthenticationToken principal = new TestingAuthenticationToken("someone", null);
    private final MockHttpServletRequest request = new MockHttpServletRequest();
    private final MockHttpServletResponse response = new MockHttpServletResponse();

    @Test
    @DisplayName("a saved client is not kept, so loading it gives null and touches no session")
    void saveKeepsNothing() {
        Instant now = Instant.now();
        OAuth2AuthorizedClient client = new OAuth2AuthorizedClient(
                CommonOAuth2Provider.GOOGLE.getBuilder("google").clientId("c").clientSecret("s").build(),
                "someone", new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER, "t", now, now.plusSeconds(60)));

        repository.saveAuthorizedClient(client, principal, request, response);

        OAuth2AuthorizedClient loaded = repository.loadAuthorizedClient("google", principal, request);
        assertThat(loaded).isNull();
        assertThat(request.getSession(false)).isNull();
        assertThat(response.getCookies()).isEmpty();
    }

    @Test
    @DisplayName("removing a client that was never kept does nothing")
    void removeDoesNothing() {
        repository.removeAuthorizedClient("google", principal, request, response);

        OAuth2AuthorizedClient loaded = repository.loadAuthorizedClient("google", principal, request);
        assertThat(loaded).isNull();
        assertThat(request.getSession(false)).isNull();
    }
}
