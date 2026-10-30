package net.phrasal.presentation.security;

import net.phrasal.application.dto.GoogleIdentity;
import net.phrasal.application.service.GoogleSignInResult;
import net.phrasal.application.service.GoogleSignInResult.Outcome;
import net.phrasal.application.service.GoogleSignInService;
import net.phrasal.domain.entity.Role;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException.Reason;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.config.oauth2.client.CommonOAuth2Provider;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("GoogleOidcUserService")
class GoogleOidcUserServiceTest {

    private static final String SUBJECT = "google-sub-1";
    private static final String EMAIL = "Bob@Gmail.com";
    private static final GoogleSignInResult RESULT = new GoogleSignInResult(
            new AuthenticatedUser(42L, "bob@gmail.com", Role.USER, false, true), Outcome.CREATED);

    @Mock
    private GoogleSignInService googleSignInService;

    private GoogleOidcUserService service() {
        return new GoogleOidcUserService(googleSignInService);
    }

    private static OidcUserRequest request(Map<String, Object> claims) {
        Instant now = Instant.now();
        OidcIdToken idToken = OidcIdToken.withTokenValue("id-token")
                .issuer("https://accounts.google.com")
                .subject(SUBJECT)
                .audience(List.of("test-client"))
                .issuedAt(now)
                .expiresAt(now.plusSeconds(300))
                .claims(all -> all.putAll(claims))
                .build();
        OAuth2AccessToken accessToken = new OAuth2AccessToken(OAuth2AccessToken.TokenType.BEARER, "access-token",
                now, now.plusSeconds(300), Set.of("openid", "email", "profile"));
        return new OidcUserRequest(CommonOAuth2Provider.GOOGLE.getBuilder("google")
                .clientId("test-client").clientSecret("test-secret").build(), accessToken, idToken);
    }

    @Test
    @DisplayName("verified claims reach the service unchanged and the result is attached to the OIDC user")
    void verifiedClaims() {
        when(googleSignInService.signIn(any())).thenReturn(RESULT);
        OidcUserRequest request = request(Map.of("email", EMAIL, "email_verified", true));

        OidcUser user = service().loadUser(request);

        verify(googleSignInService).signIn(new GoogleIdentity(SUBJECT, EMAIL, true));
        assertThat(user).isInstanceOfSatisfying(GoogleOidcUser.class,
                google -> assertThat(google.getResult()).isEqualTo(RESULT));
        assertThat(user.getName()).isEqualTo(SUBJECT);
        assertThat(user.getIdToken()).isSameAs(request.getIdToken());
        assertThat(user.getAuthorities()).extracting("authority").contains("OIDC_USER", "SCOPE_openid");
    }

    @Test
    @DisplayName("a missing email_verified claim counts as unverified")
    void missingEmailVerified() {
        when(googleSignInService.signIn(any())).thenReturn(RESULT);

        service().loadUser(request(Map.of("email", EMAIL)));

        verify(googleSignInService).signIn(new GoogleIdentity(SUBJECT, EMAIL, false));
    }

    @Test
    @DisplayName("email_verified=false counts as unverified")
    void falseEmailVerified() {
        when(googleSignInService.signIn(any())).thenReturn(RESULT);

        service().loadUser(request(Map.of("email", EMAIL, "email_verified", false)));

        verify(googleSignInService).signIn(new GoogleIdentity(SUBJECT, EMAIL, false));
    }

    @ParameterizedTest(name = "{0}")
    @EnumSource(Reason.class)
    @DisplayName("a refusal becomes an OAuth2AuthenticationException with its error code")
    void refusal(Reason reason) {
        GoogleSignInRefusedException refusal = new GoogleSignInRefusedException(reason);
        when(googleSignInService.signIn(any())).thenThrow(refusal);

        assertThatThrownBy(() -> service().loadUser(request(Map.of("email", EMAIL, "email_verified", true))))
                .isInstanceOfSatisfying(OAuth2AuthenticationException.class,
                        e -> assertThat(e.getError().getErrorCode()).isEqualTo(reason.code()))
                .hasCause(refusal);
    }

    @Test
    @DisplayName("an unexpected IllegalStateException becomes the generic google error")
    void illegalState() {
        when(googleSignInService.signIn(any())).thenThrow(new IllegalStateException("concurrent sign-in"));

        assertGenericError(Map.of("email", EMAIL, "email_verified", true));
    }

    @Test
    @DisplayName("an IllegalArgumentException (no email claim) becomes the generic google error")
    void illegalArgument() {
        when(googleSignInService.signIn(any())).thenThrow(new IllegalArgumentException("no email"));

        assertGenericError(Map.of("email_verified", true));
        verify(googleSignInService).signIn(new GoogleIdentity(SUBJECT, null, true));
    }

    private void assertGenericError(Map<String, Object> claims) {
        assertThatThrownBy(() -> service().loadUser(request(claims)))
                .isInstanceOfSatisfying(OAuth2AuthenticationException.class,
                        e -> assertThat(e.getError().getErrorCode()).isEqualTo("google"));
    }
}
