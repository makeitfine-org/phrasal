package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * Ends a successful Google callback the way a password login ends: the session gets the {@code AuthenticatedUser},
 * or a pending login when the account has 2FA. Redirects are relative, so they stay on the origin of the callback.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class GoogleLoginSuccessHandler implements AuthenticationSuccessHandler {

    static final String HOME = "/";
    static final String TWO_FACTOR = "/login/2fa";
    static final String FAILED = GoogleLoginFailureHandler.LOGIN_ERROR + GoogleOidcUserService.GENERIC_ERROR;

    private final SessionAuthenticator sessionAuthenticator;
    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        if (!(authentication.getPrincipal() instanceof GoogleOidcUser googleUser)) {
            log.warn("Google sign-in ended with an unexpected principal type");
            redirectStrategy.sendRedirect(request, response, FAILED);
            return;
        }
        LoginOutcome outcome = sessionAuthenticator.signInVerified(googleUser.getResult().principal(), request,
                response);
        String target = outcome instanceof LoginOutcome.TwoFactorRequired ? TWO_FACTOR : HOME;
        redirectStrategy.sendRedirect(request, response, target);
    }
}
