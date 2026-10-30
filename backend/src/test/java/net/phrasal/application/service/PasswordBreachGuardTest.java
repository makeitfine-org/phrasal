package net.phrasal.application.service;

import net.phrasal.infrastructure.exception.PasswordPolicyViolationException;
import net.phrasal.infrastructure.security.BreachedPasswordChecker;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("PasswordBreachGuard")
class PasswordBreachGuardTest {

    @Mock
    private BreachedPasswordChecker checker;

    @Test
    @DisplayName("a breached password becomes a field error on the given field")
    void breached() {
        when(checker.isBreached("pw")).thenReturn(true);

        assertThatThrownBy(() -> new PasswordBreachGuard(checker).requireNotBreached("pw", "newPassword"))
                .isInstanceOfSatisfying(PasswordPolicyViolationException.class, ex -> {
                    assertThat(ex.field()).isEqualTo("newPassword");
                    assertThat(ex.getMessage()).isEqualTo(PasswordBreachGuard.BREACHED);
                });
    }

    @Test
    @DisplayName("any other password passes")
    void clean() {
        assertThatCode(() -> new PasswordBreachGuard(checker).requireNotBreached("pw", "password"))
                .doesNotThrowAnyException();
    }
}
