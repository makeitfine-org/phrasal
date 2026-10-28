package net.phrasal.application.service;

import net.phrasal.application.dto.RegisterRequest;
import net.phrasal.application.dto.UserResponse;
import net.phrasal.application.mapper.UserMapper;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.EmailAlreadyRegisteredException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthService")
class AuthServiceTest {

    private static final String PASSWORD = "correct horse battery";
    private static final String HASH = "{bcrypt}encoded";

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private EmailVerificationService emailVerificationService;

    private final UserMapper userMapper = Mappers.getMapper(UserMapper.class);

    private AuthService service() {
        return new AuthService(userRepository, passwordEncoder, userMapper, emailVerificationService);
    }

    @Test
    @DisplayName("register stores a USER with a normalized email and an encoded password")
    void registerSuccess() {
        when(userRepository.existsByEmail("a@b.com")).thenReturn(false);
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(inv -> {
            User saved = inv.getArgument(0);
            saved.setId(9L);
            return saved;
        });

        UserResponse response = service().register(new RegisterRequest("  A@B.com ", PASSWORD));

        ArgumentCaptor<User> captor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(captor.capture());
        User saved = captor.getValue();
        assertThat(saved.getEmail()).isEqualTo("a@b.com");
        assertThat(saved.getRole()).isEqualTo(Role.USER);
        assertThat(saved.getPasswordHash()).isEqualTo(HASH).isNotEqualTo(PASSWORD);
        assertThat(response).isEqualTo(new UserResponse(9L, "a@b.com", "USER"));
        verify(emailVerificationService).issueFor(saved);
    }

    @Test
    @DisplayName("register rejects an existing email without saving")
    void registerDuplicate() {
        when(userRepository.existsByEmail("a@b.com")).thenReturn(true);

        assertThatThrownBy(() -> service().register(new RegisterRequest("a@b.com", PASSWORD)))
                .isInstanceOf(EmailAlreadyRegisteredException.class);

        verify(userRepository, never()).saveAndFlush(any());
        verify(emailVerificationService, never()).issueFor(any());
    }

    @Test
    @DisplayName("register maps a unique-constraint race to EmailAlreadyRegisteredException")
    void registerRace() {
        when(userRepository.existsByEmail("a@b.com")).thenReturn(false);
        when(passwordEncoder.encode(PASSWORD)).thenReturn(HASH);
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(new DataIntegrityViolationException("dup"));

        assertThatThrownBy(() -> service().register(new RegisterRequest("a@b.com", PASSWORD)))
                .isInstanceOf(EmailAlreadyRegisteredException.class);
        verify(emailVerificationService, never()).issueFor(any());
    }
}
