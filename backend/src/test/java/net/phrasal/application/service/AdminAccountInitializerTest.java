package net.phrasal.application.service;

import net.phrasal.config.AdminAccountProperties;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AdminAccountInitializer")
class AdminAccountInitializerTest {

    private static final String EMAIL = "admin@example.com";
    private static final String PASSWORD = "a-strong-admin-password";
    private static final String HASH = "{bcrypt}hash";

    @Mock
    private UserRepository userRepository;
    @Mock
    private PasswordEncoder passwordEncoder;

    private AdminAccountInitializer initializer(String email, String password) {
        return new AdminAccountInitializer(new AdminAccountProperties(email, password), userRepository,
                passwordEncoder);
    }

    @Test
    @DisplayName("blank config does nothing")
    void blankConfig() {
        initializer("", "").run(null);
        initializer(null, null).run(null);

        verifyNoInteractions(userRepository, passwordEncoder);
    }

    @Test
    @DisplayName("weak password fails startup")
    void weakPassword() {
        assertThatThrownBy(() -> initializer(EMAIL, "short").run(null))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageNotContaining("short\"");
        verifyNoInteractions(userRepository);
    }

    @Test
    @DisplayName("missing account is created as ADMIN with an encoded password")
    void createsAdmin() {
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);
        when(userRepository.save(any(User.class))).thenAnswer(call -> call.getArgument(0));

        initializer(" Admin@Example.com ", PASSWORD).run(null);

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(captor.capture());
        assertThat(captor.getValue().getEmail()).isEqualTo(EMAIL);
        assertThat(captor.getValue().getRole()).isEqualTo(Role.ADMIN);
        assertThat(captor.getValue().getPasswordHash()).isEqualTo(HASH);
    }

    @Test
    @DisplayName("existing USER is promoted and gets the configured password")
    void promotesAndResets() {
        User existing = new User(EMAIL, "{bcrypt}old", Role.USER);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(existing));
        when(passwordEncoder.matches(PASSWORD, "{bcrypt}old")).thenReturn(false);
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);

        initializer(EMAIL, PASSWORD).run(null);

        assertThat(existing.getRole()).isEqualTo(Role.ADMIN);
        assertThat(existing.getPasswordHash()).isEqualTo(HASH);
        verify(userRepository).save(existing);
    }

    @Test
    @DisplayName("account already in sync is not saved")
    void alreadyInSync() {
        User existing = new User(EMAIL, HASH, Role.ADMIN);
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(existing));
        when(passwordEncoder.matches(PASSWORD, HASH)).thenReturn(true);

        initializer(EMAIL, PASSWORD).run(null);

        verify(userRepository, never()).save(any());
    }
}
