package net.phrasal.presentation.security;

import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.GoogleIdentity;
import net.phrasal.application.service.GoogleSignInResult;
import net.phrasal.application.service.GoogleSignInService;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2Error;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;

/**
 * Turns the verified Google ID token into a phrasal account. The userinfo endpoint is never called: the signed ID
 * token already carries {@code sub}, {@code email} and {@code email_verified}. Every failure becomes an
 * {@link OAuth2AuthenticationException}, so it ends in the failure handler with a known error code.
 */
@Slf4j
@Component
public class GoogleOidcUserService implements OAuth2UserService<OidcUserRequest, OidcUser> {

    /** Error code for any failure that is not one of the refusals. */
    public static final String GENERIC_ERROR = "google";

    private final GoogleSignInService googleSignInService;
    private final OidcUserService delegate = new OidcUserService();

    /**
     * Creates the service around the account matching rules.
     *
     * @param googleSignInService finds, links or creates the account
     */
    public GoogleOidcUserService(GoogleSignInService googleSignInService) {
        this.googleSignInService = googleSignInService;
        this.delegate.setRetrieveUserInfo(request -> false);
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) {
        OidcUser oidcUser = delegate.loadUser(userRequest);
        OidcIdToken idToken = userRequest.getIdToken();
        GoogleIdentity identity = new GoogleIdentity(idToken.getSubject(), idToken.getEmail(),
                Boolean.TRUE.equals(idToken.getEmailVerified()));
        try {
            GoogleSignInResult result = googleSignInService.signIn(identity);
            return new GoogleOidcUser(oidcUser.getAuthorities(), idToken, result);
        } catch (GoogleSignInRefusedException e) {
            throw failure(e.getReason().code(), e);
        } catch (IllegalArgumentException | IllegalStateException e) {
            log.warn("Google sign-in could not reach an account: {}", e.getMessage());
            throw failure(GENERIC_ERROR, e);
        }
    }

    private static OAuth2AuthenticationException failure(String code, RuntimeException cause) {
        return new OAuth2AuthenticationException(new OAuth2Error(code), cause);
    }
}
