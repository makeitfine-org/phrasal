package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.LoginRequest;
import net.phrasal.application.dto.UserResponse;
import net.phrasal.infrastructure.security.AppUserDetails;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.EmailNormalizer;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolderStrategy;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.stereotype.Component;

/**
 * Authenticates credentials and stores the result in the HTTP session.
 * Kept in one place so other sign-in flows can reuse the session handling.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SessionAuthenticator {

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;
    private final PendingTwoFactorLogin pendingLogin;
    private final SecurityContextHolderStrategy securityContextHolderStrategy =
            SecurityContextHolder.getContextHolderStrategy();

    /**
     * Checks the password. An account without 2FA is signed in; an account with 2FA only gets a pending login.
     *
     * @param request      email and password
     * @param httpRequest  the current request
     * @param httpResponse the current response
     * @return the signed-in account, or a note that the second factor is still required
     */
    public LoginOutcome login(LoginRequest request, HttpServletRequest httpRequest,
                              HttpServletResponse httpResponse) {
        Authentication result = authenticationManager.authenticate(
                UsernamePasswordAuthenticationToken.unauthenticated(
                        EmailNormalizer.normalize(request.email()), request.password()));
        AuthenticatedUser principal = ((AppUserDetails) result.getPrincipal()).toAuthenticatedUser();
        if (principal.twoFactorEnabled()) {
            pendingLogin.start(httpRequest, principal.id());
            log.debug("Two-factor login challenge userId={}", principal.id());
            return new LoginOutcome.TwoFactorRequired();
        }
        UserResponse response = establish(principal, httpRequest, httpResponse);
        log.info("Logged in user id={}", principal.id());
        return new LoginOutcome.Authenticated(response);
    }

    /**
     * Finishes a login whose second factor was accepted.
     *
     * @param principal    the account, rebuilt from the database
     * @param httpRequest  the current request
     * @param httpResponse the current response, which receives the new session cookie
     * @return the signed-in account
     */
    public UserResponse completeTwoFactorLogin(AuthenticatedUser principal, HttpServletRequest httpRequest,
                                               HttpServletResponse httpResponse) {
        pendingLogin.clear(httpRequest);
        return establish(principal.withTwoFactor(true), httpRequest, httpResponse);
    }

    /**
     * Opens a pending login for a sign-in flow other than the password form, so that flow can demand the second
     * factor too. Same effect as a password login of a 2FA account.
     *
     * @param httpRequest the current request
     * @param userId      the account that already proved its first factor
     */
    public void startTwoFactorChallenge(HttpServletRequest httpRequest, Long userId) {
        pendingLogin.start(httpRequest, userId);
    }

    /**
     * Replaces the principal of the current session, e.g. after 2FA was turned on or off.
     *
     * @param principal    the new principal
     * @param httpRequest  the current request
     * @param httpResponse the current response, which receives the new session cookie
     * @return the public view of the new principal
     */
    public UserResponse refresh(AuthenticatedUser principal, HttpServletRequest httpRequest,
                                HttpServletResponse httpResponse) {
        return establish(principal, httpRequest, httpResponse);
    }

    private UserResponse establish(AuthenticatedUser principal, HttpServletRequest httpRequest,
                                   HttpServletResponse httpResponse) {
        Authentication token = UsernamePasswordAuthenticationToken.authenticated(
                principal, null, principal.authorities());

        if (httpRequest.getSession(false) != null) {
            httpRequest.changeSessionId();
        }
        SecurityContext context = securityContextHolderStrategy.createEmptyContext();
        context.setAuthentication(token);
        securityContextHolderStrategy.setContext(context);
        securityContextRepository.saveContext(context, httpRequest, httpResponse);
        return UserResponse.from(principal);
    }
}
