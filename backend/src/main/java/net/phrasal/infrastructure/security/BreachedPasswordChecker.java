package net.phrasal.infrastructure.security;

import lombok.extern.slf4j.Slf4j;
import net.phrasal.config.PasswordBreachCheckProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.web.authentication.password.HaveIBeenPwnedRestApiPasswordChecker;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

/**
 * Asks Have I Been Pwned whether a password appears in a known data breach. Only the first 5 characters of the
 * password's SHA-1 hash leave the server (k-anonymity range lookup), never the password.
 *
 * <p>The lookup fails open: when the service is slow, down or unreachable the password is accepted, because a
 * third-party outage must not block registration. The check runs only where a password is chosen (register, reset,
 * change), never at login.
 *
 * <p>Never expose a {@code CompromisedPasswordChecker} bean: Spring Security would then check every login with it.
 */
@Slf4j
@Component
public class BreachedPasswordChecker {

    private static final String HIBP_RANGE_URL = "https://api.pwnedpasswords.com/range/";

    private final PasswordBreachCheckProperties properties;
    private final CompromisedPasswordChecker delegate;

    @Autowired
    public BreachedPasswordChecker(PasswordBreachCheckProperties properties) {
        this(properties, hibpChecker(properties, HIBP_RANGE_URL));
    }

    /**
     * Same checker against another range endpoint, for tests that stand in for the real service.
     *
     * @param properties settings of the check
     * @param rangeUrl   base URL of the range endpoint, ending in a slash
     * @return a checker that calls that endpoint
     */
    static BreachedPasswordChecker forRangeUrl(PasswordBreachCheckProperties properties, String rangeUrl) {
        return new BreachedPasswordChecker(properties, hibpChecker(properties, rangeUrl));
    }

    BreachedPasswordChecker(PasswordBreachCheckProperties properties, CompromisedPasswordChecker delegate) {
        this.properties = properties;
        this.delegate = delegate;
    }

    /**
     * Checks a password against known breaches.
     *
     * @param password the raw password; never logged
     * @return true only when the password was found in a breach; false when it was not, the check is off, or the
     *         lookup failed
     */
    public boolean isBreached(String password) {
        if (!properties.enabled()) {
            return false;
        }
        try {
            return delegate.check(password).isCompromised();
        } catch (RuntimeException ex) {
            log.warn("Breached-password check unavailable: {}", ex.getClass().getSimpleName());
            return false;
        }
    }

    private static CompromisedPasswordChecker hibpChecker(PasswordBreachCheckProperties properties,
                                                         String rangeUrl) {
        SimpleClientHttpRequestFactory requestFactory = new SimpleClientHttpRequestFactory();
        requestFactory.setConnectTimeout(properties.timeout());
        requestFactory.setReadTimeout(properties.timeout());
        // The default client carries the API's base URL, so the replacement must set it again.
        RestClient restClient = RestClient.builder().baseUrl(rangeUrl).requestFactory(requestFactory).build();
        HaveIBeenPwnedRestApiPasswordChecker checker = new HaveIBeenPwnedRestApiPasswordChecker();
        checker.setRestClient(restClient);
        return checker;
    }
}
