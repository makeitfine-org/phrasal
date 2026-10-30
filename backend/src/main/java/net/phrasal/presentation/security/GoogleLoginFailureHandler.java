package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException.Reason;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Arrays;
import java.util.Set;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

/**
 * Sends a failed Google sign-in back to the login page with an error code, e.g. {@code /login?error=google}. Only the
 * refusal codes pass through; a cancel, a missing or replayed state, a bad token or any other failure becomes
 * {@code google}.
 */
@Slf4j
@Component
public class GoogleLoginFailureHandler implements AuthenticationFailureHandler {

    static final String LOGIN_ERROR = "/login?error=";

    private static final Set<String> REFUSAL_CODES = Arrays.stream(Reason.values()).map(Reason::code)
            .collect(Collectors.toUnmodifiableSet());
    // The error code can come straight from the callback's query string, so only plain codes reach the log.
    private static final Pattern LOGGABLE_CODE = Pattern.compile("[a-z0-9_-]{1,64}");

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {
        String code = exception instanceof OAuth2AuthenticationException oauth2
                ? oauth2.getError().getErrorCode() : null;
        // Never the message at INFO: it can hold the token endpoint's answer.
        log.info("Google sign-in failed code={}", loggable(code));
        log.debug("Google sign-in failure", exception);
        String target = code != null && REFUSAL_CODES.contains(code) ? code : GoogleOidcUserService.GENERIC_ERROR;
        redirectStrategy.sendRedirect(request, response, LOGIN_ERROR + target);
    }

    private static String loggable(String code) {
        if (code == null) {
            return "none";
        }
        return LOGGABLE_CODE.matcher(code).matches() ? code : "unrecognized";
    }
}
