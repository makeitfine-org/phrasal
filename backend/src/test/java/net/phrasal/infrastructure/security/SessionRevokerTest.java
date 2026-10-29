package net.phrasal.infrastructure.security;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.session.FindByIndexNameSessionRepository;
import org.springframework.session.Session;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("SessionRevoker")
class SessionRevokerTest {

    private static final String EMAIL = "a@b.com";

    @Mock
    private FindByIndexNameSessionRepository<Session> repository;

    @Test
    @DisplayName("deletes every session of the account and returns the count")
    void revokesAll() {
        when(repository.findByPrincipalName(EMAIL))
                .thenReturn(Map.of("s1", mock(Session.class), "s2", mock(Session.class)));

        int revoked = new SessionRevoker(repository).revokeAll(EMAIL);

        assertThat(revoked).isEqualTo(2);
        verify(repository).deleteById("s1");
        verify(repository).deleteById("s2");
    }

    @Test
    @DisplayName("deletes nothing when the account has no sessions")
    void noSessions() {
        when(repository.findByPrincipalName(EMAIL)).thenReturn(Map.of());

        int revoked = new SessionRevoker(repository).revokeAll(EMAIL);

        assertThat(revoked).isZero();
        verify(repository, never()).deleteById(anyString());
    }

    @Test
    @DisplayName("looks sessions up by the given email only")
    void onlyThatEmail() {
        when(repository.findByPrincipalName(EMAIL)).thenReturn(Map.of("mine", mock(Session.class)));

        new SessionRevoker(repository).revokeAll(EMAIL);

        verify(repository).findByPrincipalName(EMAIL);
        verify(repository).deleteById("mine");
        verify(repository, never()).deleteById("other-users-session");
    }
}
