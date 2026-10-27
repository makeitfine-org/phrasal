package net.phrasal.presentation.security;

import net.phrasal.application.dto.LoginRequest;
import net.phrasal.application.dto.UserResponse;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.infrastructure.security.AppUserDetails;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.test.util.ReflectionTestUtils;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("SessionAuthenticator")
class SessionAuthenticatorTest {

    private static final long USER_ID = 7L;
    private static final String EMAIL = "user@example.com";

    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private SecurityContextRepository securityContextRepository;

    private SessionAuthenticator authenticator() {
        return new SessionAuthenticator(authenticationManager, securityContextRepository);
    }

    private UsernamePasswordAuthenticationToken authenticatedByManager() {
        User user = new User(EMAIL, "{bcrypt}hash", Role.USER);
        ReflectionTestUtils.setField(user, "id", USER_ID);
        AppUserDetails details = new AppUserDetails(user);
        return UsernamePasswordAuthenticationToken.authenticated(details, null, details.getAuthorities());
    }

    @Test
    @DisplayName("success saves a context whose principal is the AuthenticatedUser record")
    void successSavesContext() {
        when(authenticationManager.authenticate(any())).thenReturn(authenticatedByManager());
        MockHttpServletRequest request = new MockHttpServletRequest();
        MockHttpServletResponse response = new MockHttpServletResponse();

        UserResponse result = authenticator().login(new LoginRequest("  USER@Example.com ", "pw"), request, response);

        assertThat(result).isEqualTo(new UserResponse(USER_ID, EMAIL, "USER"));
        ArgumentCaptor<SecurityContext> captor = ArgumentCaptor.forClass(SecurityContext.class);
        verify(securityContextRepository).saveContext(captor.capture(), any(), any());
        var saved = captor.getValue().getAuthentication();
        assertThat(saved.getPrincipal()).isEqualTo(new AuthenticatedUser(USER_ID, EMAIL, Role.USER));
        assertThat(saved.getCredentials()).isNull();
        assertThat(saved.isAuthenticated()).isTrue();
    }

    @Test
    @DisplayName("normalizes the email before authenticating")
    void normalizesEmail() {
        when(authenticationManager.authenticate(any())).thenReturn(authenticatedByManager());

        authenticator().login(new LoginRequest("  USER@Example.com ", "pw"),
                new MockHttpServletRequest(), new MockHttpServletResponse());

        ArgumentCaptor<org.springframework.security.core.Authentication> captor =
                ArgumentCaptor.forClass(org.springframework.security.core.Authentication.class);
        verify(authenticationManager).authenticate(captor.capture());
        assertThat(captor.getValue().getPrincipal()).isEqualTo(EMAIL);
    }

    @Test
    @DisplayName("an existing session gets a new id")
    void existingSessionIdChanges() {
        when(authenticationManager.authenticate(any())).thenReturn(authenticatedByManager());
        MockHttpServletRequest request = new MockHttpServletRequest();
        String before = request.getSession().getId();

        authenticator().login(new LoginRequest(EMAIL, "pw"), request, new MockHttpServletResponse());

        assertThat(request.getSession(false).getId()).isNotEqualTo(before);
    }

    @Test
    @DisplayName("bad credentials propagate and nothing is saved")
    void badCredentials() {
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("bad"));

        assertThatThrownBy(() -> authenticator().login(new LoginRequest(EMAIL, "pw"),
                new MockHttpServletRequest(), new MockHttpServletResponse()))
                .isInstanceOf(BadCredentialsException.class);
        verify(securityContextRepository, never()).saveContext(any(), any(), any());
    }
}
