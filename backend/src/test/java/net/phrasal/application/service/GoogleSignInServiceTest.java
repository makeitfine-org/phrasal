package net.phrasal.application.service;

import net.phrasal.application.dto.GoogleIdentity;
import net.phrasal.application.service.GoogleSignInResult.Outcome;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.domain.repository.UserTokenRepository;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException;
import net.phrasal.infrastructure.exception.GoogleSignInRefusedException.Reason;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("GoogleSignInService")
class GoogleSignInServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-10-30T12:00:00Z");
    private static final LocalDateTime NOW = LocalDateTime.ofInstant(INSTANT, ZoneOffset.UTC);
    private static final LocalDateTime EARLIER = LocalDateTime.of(2026, 1, 1, 0, 0);
    private static final String SUBJECT = "google-sub-1";
    private static final String EMAIL = "bob@gmail.com";
    private static final String HASH = "{bcrypt}hash";
    private static final long USER_ID = 42L;

    @Mock
    private UserRepository userRepository;

    @Mock
    private UserTokenRepository userTokenRepository;

    private GoogleSignInService service() {
        return new GoogleSignInService(userRepository, userTokenRepository, Clock.fixed(INSTANT, ZoneOffset.UTC));
    }

    private static GoogleIdentity verified(String email) {
        return new GoogleIdentity(SUBJECT, email, true);
    }

    private static User account(Role role, boolean verified) {
        User user = new User(EMAIL, HASH, role);
        user.setId(USER_ID);
        if (verified) {
            user.markEmailVerified(EARLIER);
        }
        return user;
    }

    private void returnSavedArgument() {
        when(userRepository.saveAndFlush(any(User.class))).thenAnswer(invocation -> {
            User user = invocation.getArgument(0);
            if (user.getId() == null) {
                user.setId(USER_ID);
            }
            return user;
        });
    }

    @Test
    @DisplayName("a known subject signs in without saving and copies the 2FA and password flags")
    void knownSubjectSignsIn() {
        User user = User.fromGoogle(EMAIL, SUBJECT, EARLIER);
        user.setId(USER_ID);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.of(user));

        GoogleSignInResult result = service().signIn(new GoogleIdentity(SUBJECT, "changed@gmail.com", false));

        assertThat(result).isEqualTo(new GoogleSignInResult(
                new AuthenticatedUser(USER_ID, EMAIL, Role.USER, false, true), Outcome.SIGNED_IN));
        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).saveAndFlush(any());
        verifyNoInteractions(userTokenRepository);
    }

    @Test
    @DisplayName("a known subject of an account with 2FA gives a principal with 2FA on")
    void knownSubjectWithTwoFactor() {
        User user = account(Role.USER, true);
        user.linkGoogle(SUBJECT);
        user.startTwoFactorSetup("v1:secret");
        user.enableTwoFactor(EARLIER, 1L);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.of(user));

        AuthenticatedUser principal = service().signIn(verified(EMAIL)).principal();

        assertThat(principal.twoFactorEnabled()).isTrue();
        assertThat(principal.passwordless()).isFalse();
    }

    @Test
    @DisplayName("a known subject on an ADMIN account is refused")
    void knownSubjectAdminRefused() {
        User admin = account(Role.ADMIN, true);
        admin.linkGoogle(SUBJECT);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.of(admin));

        assertRefused(verified(EMAIL), Reason.ADMIN_ACCOUNT);
    }

    @Test
    @DisplayName("an unknown subject with an unverified email is refused before any email lookup")
    void unverifiedEmailRefused() {
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());

        assertRefused(new GoogleIdentity(SUBJECT, EMAIL, false), Reason.EMAIL_UNVERIFIED);
        verify(userRepository, never()).findByEmail(anyString());
        verify(userRepository, never()).saveAndFlush(any());
    }

    @Test
    @DisplayName("the verified email of a verified account links it and keeps its password")
    void linksVerifiedAccount() {
        User user = account(Role.USER, true);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        returnSavedArgument();

        GoogleSignInResult result = service().signIn(verified(EMAIL));

        assertThat(result.outcome()).isEqualTo(Outcome.LINKED);
        assertThat(result.principal()).isEqualTo(new AuthenticatedUser(USER_ID, EMAIL, Role.USER, false, false));
        assertThat(user.getGoogleSubject()).isEqualTo(SUBJECT);
        assertThat(user.getPasswordHash()).isEqualTo(HASH);
        assertThat(user.getEmailVerifiedAt()).isEqualTo(EARLIER);
        verifyNoInteractions(userTokenRepository);
    }

    @Test
    @DisplayName("the verified email of an unverified account links it, drops its password and its open links")
    void linksUnverifiedAccount() {
        User user = account(Role.USER, false);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));
        returnSavedArgument();

        GoogleSignInResult result = service().signIn(verified(EMAIL));

        assertThat(result.outcome()).isEqualTo(Outcome.LINKED);
        assertThat(result.principal().passwordless()).isTrue();
        assertThat(user.getGoogleSubject()).isEqualTo(SUBJECT);
        assertThat(user.hasPassword()).isFalse();
        assertThat(user.getEmailVerifiedAt()).isEqualTo(NOW);
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.EMAIL_VERIFICATION, NOW);
        verify(userTokenRepository).invalidateActive(USER_ID, TokenType.PASSWORD_RESET, NOW);
    }

    @Test
    @DisplayName("the verified email of an account linked to another subject is refused and nothing changes")
    void otherSubjectRefused() {
        User user = account(Role.USER, false);
        user.linkGoogle("another-sub");
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(user));

        assertRefused(verified(EMAIL), Reason.ACCOUNT_CONFLICT);
        assertUntouched(user, "another-sub");
    }

    @Test
    @DisplayName("the verified email of an ADMIN account is refused and nothing changes")
    void adminEmailRefused() {
        User admin = account(Role.ADMIN, false);
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(admin));

        assertRefused(verified(EMAIL), Reason.ADMIN_ACCOUNT);
        assertUntouched(admin, null);
    }

    @Test
    @DisplayName("a new verified email creates a verified USER account without a password, under the normalized email")
    void createsAccount() {
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        returnSavedArgument();

        GoogleSignInResult result = service().signIn(verified(" Bob@Gmail.COM "));

        ArgumentCaptor<User> saved = ArgumentCaptor.forClass(User.class);
        verify(userRepository).saveAndFlush(saved.capture());
        User user = saved.getValue();
        assertThat(user.getEmail()).isEqualTo(EMAIL);
        assertThat(user.getRole()).isEqualTo(Role.USER);
        assertThat(user.hasPassword()).isFalse();
        assertThat(user.getEmailVerifiedAt()).isEqualTo(NOW);
        assertThat(user.getGoogleSubject()).isEqualTo(SUBJECT);
        assertThat(result).isEqualTo(new GoogleSignInResult(
                new AuthenticatedUser(USER_ID, EMAIL, Role.USER, false, true), Outcome.CREATED));
    }

    @Test
    @DisplayName("a unique-index clash while creating becomes an IllegalStateException")
    void concurrentCreate() {
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.empty());
        DataIntegrityViolationException clash = new DataIntegrityViolationException("ux_users_google_subject");
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(clash);

        assertThatThrownBy(() -> service().signIn(verified(EMAIL)))
                .isInstanceOf(IllegalStateException.class)
                .hasCause(clash);
    }

    @Test
    @DisplayName("a unique-index clash while linking becomes an IllegalStateException")
    void concurrentLink() {
        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(EMAIL)).thenReturn(Optional.of(account(Role.USER, true)));
        when(userRepository.saveAndFlush(any(User.class))).thenThrow(new DataIntegrityViolationException("clash"));

        assertThatThrownBy(() -> service().signIn(verified(EMAIL))).isInstanceOf(IllegalStateException.class);
    }

    @ParameterizedTest(name = "subject \"{0}\"")
    @NullAndEmptySource
    @ValueSource(strings = {"  "})
    @DisplayName("a blank subject is an IllegalArgumentException")
    void blankSubject(String subject) {
        assertThatThrownBy(() -> service().signIn(new GoogleIdentity(subject, EMAIL, true)))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(userRepository);
    }

    @ParameterizedTest(name = "email \"{0}\"")
    @NullAndEmptySource
    @ValueSource(strings = {"  "})
    @DisplayName("a blank email is an IllegalArgumentException")
    void blankEmail(String email) {
        assertThatThrownBy(() -> service().signIn(new GoogleIdentity(SUBJECT, email, true)))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(userRepository);
    }

    @Test
    @DisplayName("an email longer than 254 characters is an IllegalArgumentException; 254 is accepted")
    void emailTooLong() {
        String domain = "@gmail.com";
        String longest = "a".repeat(254 - domain.length()) + domain;

        assertThatThrownBy(() -> service().signIn(verified("a" + longest)))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(userRepository);

        when(userRepository.findByGoogleSubject(SUBJECT)).thenReturn(Optional.empty());
        when(userRepository.findByEmail(longest)).thenReturn(Optional.empty());
        returnSavedArgument();
        assertThat(service().signIn(verified(longest)).outcome()).isEqualTo(Outcome.CREATED);
    }

    @Test
    @DisplayName("GoogleIdentity.toString hides the subject and the email")
    void identityToStringMasks() {
        assertThat(verified(EMAIL).toString())
                .doesNotContain(SUBJECT, EMAIL)
                .isEqualTo("GoogleIdentity[subject=*****, email=*****, emailVerified=true]");
    }

    @Test
    @DisplayName("each refusal reason has its login page error code")
    void refusalCodes() {
        assertThat(Reason.EMAIL_UNVERIFIED.code()).isEqualTo("google-email-unverified");
        assertThat(Reason.ACCOUNT_CONFLICT.code()).isEqualTo("google-account-conflict");
        assertThat(Reason.ADMIN_ACCOUNT.code()).isEqualTo("google-admin-account");
    }

    private void assertRefused(GoogleIdentity identity, Reason reason) {
        assertThatThrownBy(() -> service().signIn(identity))
                .isInstanceOfSatisfying(GoogleSignInRefusedException.class,
                        e -> assertThat(e.getReason()).isEqualTo(reason));
    }

    private void assertUntouched(User user, String subject) {
        assertThat(user.getGoogleSubject()).isEqualTo(subject);
        assertThat(user.getPasswordHash()).isEqualTo(HASH);
        assertThat(user.isEmailVerified()).isFalse();
        verify(userRepository, never()).saveAndFlush(any());
        verifyNoInteractions(userTokenRepository);
    }
}
