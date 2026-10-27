package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JpaUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private JpaUserDetailsService service;

    @Test
    void loadUserByUsername_found_returnsDetails() {
        when(userRepository.findByEmail("bob@x.com"))
                .thenReturn(Optional.of(new User("bob@x.com", "{bcrypt}h", Role.USER)));

        UserDetails details = service.loadUserByUsername("bob@x.com");

        assertThat(details.getUsername()).isEqualTo("bob@x.com");
        assertThat(details.getPassword()).isEqualTo("{bcrypt}h");
    }

    @Test
    void loadUserByUsername_normalizesEmailBeforeLookup() {
        when(userRepository.findByEmail("bob@x.com"))
                .thenReturn(Optional.of(new User("bob@x.com", "{bcrypt}h", Role.USER)));

        service.loadUserByUsername(" Bob@X.com ");

        verify(userRepository).findByEmail("bob@x.com");
    }

    @Test
    void loadUserByUsername_missing_throws() {
        when(userRepository.findByEmail("none@x.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.loadUserByUsername("none@x.com"))
                .isInstanceOf(UsernameNotFoundException.class);
    }

    @Test
    void loadUserByUsername_nullHash_throws() {
        when(userRepository.findByEmail("g@x.com")).thenReturn(Optional.of(new User("g@x.com", null, Role.USER)));

        assertThatThrownBy(() -> service.loadUserByUsername("g@x.com"))
                .isInstanceOf(UsernameNotFoundException.class);
    }
}
