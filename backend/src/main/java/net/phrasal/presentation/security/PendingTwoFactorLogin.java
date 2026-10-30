package net.phrasal.presentation.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import net.phrasal.config.TwoFactorProperties;
import org.springframework.stereotype.Component;

import java.time.Clock;
import java.time.Instant;
import java.util.Collections;
import java.util.Optional;

/**
 * The half-finished login of an account with 2FA: the first factor (password or Google) was right, the second factor
 * is still missing. The state lives in a session with a new id that holds nothing else, no security context either,
 * so it grants nothing by itself.
 */
@Component
@RequiredArgsConstructor
public class PendingTwoFactorLogin {

    static final String USER_ID_ATTRIBUTE = "PENDING_2FA_USER_ID";
    static final String SINCE_ATTRIBUTE = "PENDING_2FA_SINCE";

    private final Clock clock;
    private final TwoFactorProperties properties;

    /**
     * Opens a pending login. Any current session, including a signed-in one, is emptied and gets a new id first, so
     * the old id grants nothing and the pending state never sits under an id the browser had before.
     *
     * <p>Not {@code invalidate()} plus a new session: Spring Session JDBC changes an id only in memory until the
     * session is saved, and Spring's session-fixation strategy changes it before a Google sign-in reaches us. An
     * {@code invalidate()} after that deletes by the new id, the old row stays, and {@code getSession(true)} finds it
     * again through the cookie.
     *
     * @param request the login request
     * @param userId  the account whose first factor was verified
     */
    public void start(HttpServletRequest request, Long userId) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            session = request.getSession(true);
        } else {
            for (String name : Collections.list(session.getAttributeNames())) {
                session.removeAttribute(name);
            }
            request.changeSessionId();
        }
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
