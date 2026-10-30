package net.phrasal.infrastructure.security;

import net.phrasal.config.PasswordBreachCheckProperties;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.password.CompromisedPasswordChecker;
import org.springframework.security.authentication.password.CompromisedPasswordDecision;
import org.springframework.web.client.RestClientException;

import java.time.Duration;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("BreachedPasswordChecker")
class BreachedPasswordCheckerTest {

    private static final String PASSWORD = "correct horse battery";
    private static final Duration TIMEOUT = Duration.ofSeconds(2);

    @Mock
    private CompromisedPasswordChecker delegate;

    private BreachedPasswordChecker checker(boolean enabled) {
        return new BreachedPasswordChecker(new PasswordBreachCheckProperties(enabled, TIMEOUT), delegate);
    }

    @Test
    @DisplayName("a compromised password is breached")
    void compromised() {
        when(delegate.check(PASSWORD)).thenReturn(new CompromisedPasswordDecision(true));

        assertThat(checker(true).isBreached(PASSWORD)).isTrue();
    }

    @Test
    @DisplayName("a clean password is not breached")
    void clean() {
        when(delegate.check(PASSWORD)).thenReturn(new CompromisedPasswordDecision(false));

        assertThat(checker(true).isBreached(PASSWORD)).isFalse();
    }

    @Test
    @DisplayName("a failing lookup is accepted and nothing propagates")
    void failsOpen() {
        when(delegate.check(PASSWORD)).thenThrow(new RestClientException("connection refused"));

        assertThat(checker(true).isBreached(PASSWORD)).isFalse();
    }

    @Test
    @DisplayName("when disabled there is no lookup")
    void disabled() {
        assertThat(checker(false).isBreached(PASSWORD)).isFalse();

        verify(delegate, never()).check(anyString());
    }
}
