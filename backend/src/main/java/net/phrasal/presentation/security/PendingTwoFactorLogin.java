package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.phrasal.config.TwoFactorProperties;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.Optional;

/**
 * The half-finished login of an account with 2FA: the password was right, the second factor is still missing. The
 * state lives in a fresh session that holds no security context, so it grants nothing by itself.
 */
@Component
@RequiredArgsConstructor
public class PendingTwoFactorLogin {

    static final String USER_ID_ATTRIBUTE = "PENDING_2FA_USER_ID";
    static final String SINCE_ATTRIBUTE = "PENDING_2FA_SINCE";

    private final Clock clock;
    private final TwoFactorProperties properties;

    /**
     * Opens a pending login. Any current session, including a signed-in one, is ended first.
     *
     * @param request the login request
     * @param userId  the account whose password was verified
     */
    public void start(HttpServletRequest request, Long userId) {
        HttpSession current = request.getSession(false);
        if (current != null) {
            current.invalidate();
        }
        HttpSession session = request.getSession(true);
        session.setAttribute(USER_ID_ATTRIBUTE, userId);
        session.setAttribute(SINCE_ATTRIBUTE, clock.instant());
    }

    /**
     * Reads the account of the pending login.
     *
     * @param request the second-step request
     * @return the user id, or empty when there is no pending login or it is older than the login timeout; an
     *         expired state is removed
     */
    public Optional<Long> userId(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            return Optional.empty();
        }
        Object userId = session.getAttribute(USER_ID_ATTRIBUTE);
        Object since = session.getAttribute(SINCE_ATTRIBUTE);
        if (!(userId instanceof Long id) || !(since instanceof Instant started)) {
            return Optional.empty();
        }
        if (clock.instant().isAfter(started.plus(properties.loginTimeout()))) {
            clear(request);
            return Optional.empty();
        }
        return Optional.of(id);
    }

    /**
     * Forgets the pending login.
     *
     * @param request the request whose session holds it
     */
    public void clear(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute(USER_ID_ATTRIBUTE);
            session.removeAttribute(SINCE_ATTRIBUTE);
        }
    }
}
