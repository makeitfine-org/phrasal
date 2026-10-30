package net.phrasal.presentation.security;

import net.phrasal.application.dto.UserResponse;
import net.phrasal.application.service.GoogleSignInResult;
import net.phrasal.application.service.GoogleSignInResult.Outcome;
import net.phrasal.domain.entity.Role;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;

import java.io.IOException;
import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("GoogleLoginSuccessHandler")
class GoogleLoginSuccessHandlerTest {

    private static final AuthenticatedUser PRINCIPAL =
            new AuthenticatedUser(42L, "bob@gmail.com", Role.USER, false, true);

    @Mock
    private SessionAuthenticator sessionAuthenticator;

    private final MockHttpServletRequest request = new MockHttpServletRequest();
    private final MockHttpServletResponse response = new MockHttpServletResponse();

    private static TestingAuthenticationToken googleAuthentication(AuthenticatedUser principal) {
        Instant now = Instant.now();
        OidcIdToken idToken = OidcIdToken.withTokenValue("id-token").subject("google-sub-1")
                .issuedAt(now).expiresAt(now.plusSeconds(300)).build();
        GoogleOidcUser user = new GoogleOidcUser(AuthorityUtils.createAuthorityList("OIDC_USER"), idToken,
                new GoogleSignInResult(principal, Outcome.SIGNED_IN));
        return new TestingAuthenticationToken(user, null);
    }

    private void handle(TestingAuthenticationToken authentication) throws IOException {
        new GoogleLoginSuccessHandler(sessionAuthenticator).onAuthenticationSuccess(request, response, authentication);
    }

    @Test
    @DisplayName("an account without 2FA is signed in with the principal from the result and sent to /")
    void signedIn() throws IOException {
        when(sessionAuthenticator.signInVerified(any(), any(), any())).thenReturn(
                new LoginOutcome.Authenticated(UserResponse.from(PRINCIPAL)));

        handle(googleAuthentication(PRINCIPAL));

        verify(sessionAuthenticator).signInVerified(PRINCIPAL, request, response);
        assertThat(response.getStatus()).isEqualTo(302);
        assertThat(response.getRedirectedUrl()).isEqualTo("/");
    }

    @Test
    @DisplayName("an account with 2FA is sent to /login/2fa")
    void twoFactorRequired() throws IOException {
        when(sessionAuthenticator.signInVerified(any(), any(), any())).thenReturn(new LoginOutcome.TwoFactorRequired());

        handle(googleAuthentication(PRINCIPAL));

        assertThat(response.getRedirectedUrl()).isEqualTo("/login/2fa");
    }

    @Test
    @DisplayName("a principal that is not a GoogleOidcUser is sent to /login?error=google and signs nobody in")
    void foreignPrincipal() throws IOException {
        handle(new TestingAuthenticationToken("someone", null));

        assertThat(response.getRedirectedUrl()).isEqualTo("/login?error=google");
        verifyNoInteractions(sessionAuthenticator);
    }
}
