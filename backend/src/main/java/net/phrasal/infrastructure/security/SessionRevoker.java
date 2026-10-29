package net.phrasal.infrastructure.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;
import org.springframework.stereotype.Component;

/**
 * Ends every server-side session of one account.
 *
 * <p>Sessions are indexed by principal name, which is the account email ({@link AuthenticatedUser#getName()}). Keep
 * it that way, or this class silently finds nothing.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SessionRevoker {

    private final FindByIndexNameSessionRepository<? extends Session> sessions;

    /**
     * Deletes all sessions of an account.
     *
     * @param email normalized account email, the session principal name
     * @return number of sessions deleted
     */
    public int revokeAll(String email) {
        var ids = sessions.findByPrincipalName(email).keySet();
        ids.forEach(sessions::deleteById);
        log.debug("Sessions revoked count={}", ids.size());
        return ids.size();
    }
}
