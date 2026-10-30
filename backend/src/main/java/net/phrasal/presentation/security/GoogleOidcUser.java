package net.phrasal.presentation.security;

import net.phrasal.application.service.GoogleSignInResult;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;

import java.io.Serial;
import java.util.Collection;
import java.util.Objects;

/**
 * The OIDC user of a Google callback, plus the phrasal account it reached. It lives only during the callback
 * request: the success handler stores the {@code AuthenticatedUser} from {@link #getResult()} in the session instead.
 */
public class GoogleOidcUser extends DefaultOidcUser {

    @Serial
    private static final long serialVersionUID = 1L;

    private final GoogleSignInResult result;

    /**
     * Wraps the verified ID token together with the account it reached.
     *
     * @param authorities the authorities Spring derived from the ID token and the granted scopes
     * @param idToken     the verified ID token
     * @param result      the phrasal account and how it was reached
     */
    public GoogleOidcUser(Collection<? extends GrantedAuthority> authorities, OidcIdToken idToken,
                          GoogleSignInResult result) {
        super(authorities, idToken);
        this.result = Objects.requireNonNull(result, "result");
    }

    public GoogleSignInResult getResult() {
        return result;
    }
}
