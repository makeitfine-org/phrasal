package net.phrasal.application.service;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import net.phrasal.application.dto.RecoveryCodesResponse;
import net.phrasal.application.dto.TwoFactorSetupResponse;
import net.phrasal.application.event.TwoFactorChangedNoticeRequested;
import net.phrasal.application.dto.TwoFactorStatusResponse;
import net.phrasal.application.service.TwoFactorService.SecondFactor;
import net.phrasal.config.TwoFactorProperties;
import net.phrasal.domain.entity.RecoveryCode;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import net.phrasal.domain.repository.RecoveryCodeRepository;
import net.phrasal.domain.repository.UserRepository;
import net.phrasal.infrastructure.exception.InvalidTwoFactorCodeException;
import net.phrasal.infrastructure.exception.TwoFactorLoginExpiredException;
import net.phrasal.infrastructure.exception.TwoFactorStateException;
import net.phrasal.infrastructure.exception.TwoFactorStateException.Reason;
import net.phrasal.infrastructure.exception.WrongPasswordException;
import net.phrasal.infrastructure.security.AesGcmEncryptor;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.RecoveryCodes;
import net.phrasal.infrastructure.security.TotpVerifier;
import net.phrasal.infrastructure.security.TwoFactorSecrets;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.Clock;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyIterable;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("TwoFactorService")
class TwoFactorServiceTest {

    private static final Instant INSTANT = Instant.parse("2026-01-10T12:00:00Z");
    private static final long USER_ID = 5L;
    private static final String EMAIL = "user@example.com";
    private static final String PASSWORD = "correct-horse-battery";
    private static final String HASH = "{bcrypt}hash";

    @Mock
    private UserRepository userRepository;
    @Mock
    private RecoveryCodeRepository recoveryCodeRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private ApplicationEventPublisher publisher;

    private final TwoFactorProperties properties = new TwoFactorProperties(
            Base64.getEncoder().encodeToString(new byte[32]), "Phrasal", Duration.ofMinutes(5));
    private final AesGcmEncryptor encryptor = new AesGcmEncryptor(properties);
    private final TotpVerifier totpVerifier = new TotpVerifier();
    private final TwoFactorSecrets secrets = new TwoFactorSecrets();
    private final RecoveryCodes recoveryCodes = new RecoveryCodes();
    private final Clock clock = Clock.fixed(INSTANT, ZoneOffset.UTC);

    private final Logger logger = (Logger) LoggerFactory.getLogger(TwoFactorService.class);
    private ListAppender<ILoggingEvent> appender;

    private User user;

    @BeforeEach
    void setUp() {
        appender = new ListAppender<>();
        appender.start();
        logger.addAppender(appender);
        user = new User(EMAIL, HASH, Role.USER);
        ReflectionTestUtils.setField(user, "id", USER_ID);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));
    }

    @AfterEach
    void detachAppender() {
        logger.detachAppender(appender);
    }

    private TwoFactorService service() {
        return new TwoFactorService(userRepository, recoveryCodeRepository, encryptor, totpVerifier, secrets,
                recoveryCodes, new AccountChecks(userRepository, passwordEncoder), properties, clock, publisher);
    }

    private String startSetup() {
        when(passwordEncoder.matches(PASSWORD, HASH)).thenReturn(true);
        return service().setup(USER_ID, PASSWORD).secret();
    }

    private byte[] storedSecret() {
        return encryptor.decrypt(user.getTotpSecretEnc(), "user:" + USER_ID);
    }

    private String currentCode() {
        return totpVerifier.codeAt(storedSecret(), totpVerifier.stepAt(INSTANT));
    }

    @Test
    @DisplayName("status of an account without 2FA")
    void statusOff() {
        TwoFactorStatusResponse status = service().status(USER_ID);

        assertThat(status).isEqualTo(new TwoFactorStatusResponse(false, null, 0));
    }

    @Test
    @DisplayName("status of an account with 2FA reports the remaining recovery codes")
    void statusOn() {
        LocalDateTime enabledAt = LocalDateTime.of(2026, 1, 1, 8, 0);
        user.startTwoFactorSetup("v1:x");
        user.enableTwoFactor(enabledAt, 1L);
        when(recoveryCodeRepository.countByUserIdAndUsedAtIsNull(USER_ID)).thenReturn(7L);

        TwoFactorStatusResponse status = service().status(USER_ID);

        assertThat(status).isEqualTo(new TwoFactorStatusResponse(true, enabledAt, 7));
    }

    @Test
    @DisplayName("setup with the right password stores an encrypted secret and returns the URI")
    void setupStoresEncryptedSecret() {
        when(passwordEncoder.matches(PASSWORD, HASH)).thenReturn(true);

        TwoFactorSetupResponse response = service().setup(USER_ID, PASSWORD);

        assertThat(response.secret()).hasSize(32).matches("[A-Z2-7]+");
        assertThat(response.otpauthUri()).startsWith("otpauth://totp/Phrasal:user%40example.com")
                .contains("secret=" + response.secret()).contains("issuer=Phrasal");
        assertThat(user.getTotpSecretEnc()).startsWith("v1:").doesNotContain(response.secret());
        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(TwoFactorSecrets.toBase32(storedSecret())).isEqualTo(response.secret());
    }

    @Test
    @DisplayName("setup with a wrong password stores nothing")
    void setupWrongPassword() {
        when(passwordEncoder.matches("nope", HASH)).thenReturn(false);

        assertThatThrownBy(() -> service().setup(USER_ID, "nope")).isInstanceOf(WrongPasswordException.class);

        assertThat(user.getTotpSecretEnc()).isNull();
    }

    @Test
    @DisplayName("setup for an account without a password hash is a wrong password")
    void setupNullHash() {
        user.setPasswordHash(null);

        assertThatThrownBy(() -> service().setup(USER_ID, PASSWORD)).isInstanceOf(WrongPasswordException.class);

        assertThat(user.getTotpSecretEnc()).isNull();
    }

    @Test
    @DisplayName("setup when 2FA is already on is a state conflict")
    void setupAlreadyEnabled() {
        user.startTwoFactorSetup("v1:x");
        user.enableTwoFactor(LocalDateTime.of(2026, 1, 1, 8, 0), 1L);

        assertThatThrownBy(() -> service().setup(USER_ID, PASSWORD))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.ALREADY_ENABLED));
    }

    @Test
    @DisplayName("a second setup replaces the first secret")
    void setupTwiceReplacesSecret() {
        String first = startSetup();
        String firstStored = user.getTotpSecretEnc();

        String second = service().setup(USER_ID, PASSWORD).secret();

        assertThat(second).isNotEqualTo(first);
        assertThat(user.getTotpSecretEnc()).isNotEqualTo(firstStored);
        assertThat(TwoFactorSecrets.toBase32(storedSecret())).isEqualTo(second);
    }

    @Test
    @DisplayName("confirm with a valid code enables 2FA and saves ten hashed recovery codes")
    void confirmEnables() {
        startSetup();

        RecoveryCodesResponse response = service().confirm(USER_ID, currentCode());

        assertThat(user.isTwoFactorEnabled()).isTrue();
        assertThat(user.getTotpLastStep()).isEqualTo(totpVerifier.stepAt(INSTANT));
        assertThat(response.recoveryCodes()).hasSize(RecoveryCodes.CODE_COUNT);
        verify(recoveryCodeRepository).deleteAllByUserId(USER_ID);
        @SuppressWarnings("unchecked")
        ArgumentCaptor<List<RecoveryCode>> saved = ArgumentCaptor.forClass(List.class);
        verify(recoveryCodeRepository).saveAll(saved.capture());
        assertThat(saved.getValue()).hasSize(RecoveryCodes.CODE_COUNT);
        List<String> hashes = saved.getValue().stream().map(RecoveryCode::getCodeHash).toList();
        assertThat(hashes).doesNotContainAnyElementsOf(response.recoveryCodes())
                .containsExactlyInAnyOrderElementsOf(response.recoveryCodes().stream().map(RecoveryCodes::hash).toList());
        assertThat(appender.list).extracting(ILoggingEvent::getFormattedMessage)
                .contains("Two-factor enabled userId=5");
        verify(publisher).publishEvent(new TwoFactorChangedNoticeRequested(USER_ID, EMAIL, true));
    }

    @Test
    @DisplayName("confirm with a wrong code keeps 2FA off")
    void confirmWrongCode() {
        startSetup();
        String wrong = "000000".equals(currentCode()) ? "000001" : "000000";

        assertThatThrownBy(() -> service().confirm(USER_ID, wrong))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        assertThat(user.isTwoFactorEnabled()).isFalse();
        verify(recoveryCodeRepository, never()).saveAll(anyIterable());
    }

    @Test
    @DisplayName("confirm with a recovery-code-shaped input is rejected")
    void confirmRecoveryCodeShape() {
        startSetup();

        assertThatThrownBy(() -> service().confirm(USER_ID, "ABCD-EFGH-JKLM-NPQR"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        assertThat(user.isTwoFactorEnabled()).isFalse();
    }

    @Test
    @DisplayName("confirm before setup is a state conflict")
    void confirmNoSetup() {
        assertThatThrownBy(() -> service().confirm(USER_ID, "123456"))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.SETUP_NOT_STARTED));
    }

    @Test
    @DisplayName("confirm when 2FA is already on is a state conflict")
    void confirmAlreadyEnabled() {
        user.startTwoFactorSetup("v1:x");
        user.enableTwoFactor(LocalDateTime.of(2026, 1, 1, 8, 0), 1L);

        assertThatThrownBy(() -> service().confirm(USER_ID, "123456"))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.ALREADY_ENABLED));
    }

    @Test
    @DisplayName("confirm with an undecryptable secret is an invalid code and logs an error without the secret")
    void confirmDecryptionFails() {
        String base32 = startSetup();
        String stored = user.getTotpSecretEnc();
        ReflectionTestUtils.setField(user, "totpSecretEnc", "v1:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");

        assertThatThrownBy(() -> service().confirm(USER_ID, "123456"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(appender.list).filteredOn(event -> event.getLevel() == Level.ERROR).hasSize(1)
                .allSatisfy(event -> assertThat(event.getFormattedMessage())
                        .doesNotContain(base32).doesNotContain(stored));
    }

    private void enabledUser() {
        startSetup();
        user.enableTwoFactor(LocalDateTime.of(2026, 1, 1, 8, 0), 1L);
    }

    @Test
    @DisplayName("verifyCode accepts a valid TOTP and records its step")
    void verifyTotp() {
        enabledUser();
        long step = totpVerifier.stepAt(INSTANT);
        when(userRepository.advanceTotpStep(USER_ID, step)).thenReturn(1);

        SecondFactor factor = service().verifyCode(USER_ID, currentCode());

        assertThat(factor).isEqualTo(SecondFactor.TOTP);
        verify(userRepository).advanceTotpStep(USER_ID, step);
    }

    @Test
    @DisplayName("verifyCode rejects a TOTP whose step was already used")
    void verifyTotpReplay() {
        enabledUser();
        when(userRepository.advanceTotpStep(eq(USER_ID), anyLong())).thenReturn(0);

        assertThatThrownBy(() -> service().verifyCode(USER_ID, currentCode()))
                .isInstanceOf(InvalidTwoFactorCodeException.class);
    }

    @Test
    @DisplayName("verifyCode accepts the code of the next step as clock drift")
    void verifyTotpDrift() {
        enabledUser();
        long next = totpVerifier.stepAt(INSTANT) + 1;
        when(userRepository.advanceTotpStep(USER_ID, next)).thenReturn(1);

        SecondFactor factor = service().verifyCode(USER_ID, totpVerifier.codeAt(storedSecret(), next));

        assertThat(factor).isEqualTo(SecondFactor.TOTP);
    }

    @Test
    @DisplayName("verifyCode rejects a wrong TOTP without touching the stored step")
    void verifyTotpWrong() {
        enabledUser();
        String wrong = "000000".equals(currentCode()) ? "000001" : "000000";

        assertThatThrownBy(() -> service().verifyCode(USER_ID, wrong))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        verify(userRepository, never()).advanceTotpStep(anyLong(), anyLong());
    }

    @Test
    @DisplayName("verifyCode accepts a recovery code in any case, with or without dashes")
    void verifyRecoveryCode() {
        enabledUser();
        String raw = "ABCD-EFGH-JKLM-NPQR";
        when(recoveryCodeRepository.markUsed(eq(USER_ID), eq(RecoveryCodes.hash(raw)), any())).thenReturn(1);

        assertThat(service().verifyCode(USER_ID, raw)).isEqualTo(SecondFactor.RECOVERY_CODE);
        assertThat(service().verifyCode(USER_ID, "abcdefghjklmnpqr")).isEqualTo(SecondFactor.RECOVERY_CODE);
        assertThat(service().verifyCode(USER_ID, " abcd efgh-jklm-npqr ")).isEqualTo(SecondFactor.RECOVERY_CODE);
    }

    @Test
    @DisplayName("verifyCode rejects a recovery code that was already used")
    void verifyRecoveryCodeReplay() {
        enabledUser();
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(0);

        assertThatThrownBy(() -> service().verifyCode(USER_ID, "ABCD-EFGH-JKLM-NPQR"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);
    }

    @Test
    @DisplayName("verifyCode with 2FA off is a state conflict")
    void verifyNotEnabled() {
        assertThatThrownBy(() -> service().verifyCode(USER_ID, "123456"))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.NOT_ENABLED));
    }

    @Test
    @DisplayName("a recovery code still works when the TOTP secret cannot be decrypted")
    void recoveryCodeWorksWithBrokenSecret() {
        enabledUser();
        ReflectionTestUtils.setField(user, "totpSecretEnc", "v1:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(1);

        assertThat(service().verifyCode(USER_ID, "ABCD-EFGH-JKLM-NPQR")).isEqualTo(SecondFactor.RECOVERY_CODE);
        assertThatThrownBy(() -> service().verifyCode(USER_ID, "123456"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);
    }

    @Test
    @DisplayName("loadPrincipal rebuilds the principal with 2FA on")
    void loadPrincipal() {
        enabledUser();

        assertThat(service().loadPrincipal(USER_ID))
                .isEqualTo(new AuthenticatedUser(USER_ID, EMAIL, Role.USER, true));
    }

    @Test
    @DisplayName("loadPrincipal fails when 2FA was turned off or the account is gone")
    void loadPrincipalExpired() {
        assertThatThrownBy(() -> service().loadPrincipal(USER_ID))
                .isInstanceOf(TwoFactorLoginExpiredException.class);
        when(userRepository.findById(99L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service().loadPrincipal(99L)).isInstanceOf(TwoFactorLoginExpiredException.class);
    }

    @Test
    @DisplayName("disable with a TOTP clears the 2FA fields, deletes the codes and publishes the off notice")
    void disableWithTotp() {
        enabledUser();
        when(userRepository.advanceTotpStep(eq(USER_ID), anyLong())).thenReturn(1);

        service().disable(USER_ID, currentCode());

        assertThat(user.isTwoFactorEnabled()).isFalse();
        assertThat(user.getTotpSecretEnc()).isNull();
        assertThat(user.getTotpLastStep()).isNull();
        verify(recoveryCodeRepository).deleteAllByUserId(USER_ID);
        verify(publisher).publishEvent(new TwoFactorChangedNoticeRequested(USER_ID, EMAIL, false));
    }

    @Test
    @DisplayName("disable with a recovery code works too")
    void disableWithRecoveryCode() {
        enabledUser();
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(1);

        service().disable(USER_ID, "ABCD-EFGH-JKLM-NPQR");

        assertThat(user.isTwoFactorEnabled()).isFalse();
        verify(publisher).publishEvent(new TwoFactorChangedNoticeRequested(USER_ID, EMAIL, false));
    }

    @Test
    @DisplayName("disable with a wrong code changes nothing and publishes nothing")
    void disableWrongCode() {
        enabledUser();
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(0);

        assertThatThrownBy(() -> service().disable(USER_ID, "WRONG-WRONG-WRONG-WRNG"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        assertThat(user.isTwoFactorEnabled()).isTrue();
        assertThat(user.getTotpSecretEnc()).isNotNull();
        verify(recoveryCodeRepository, never()).deleteAllByUserId(anyLong());
        verify(publisher, never()).publishEvent(any(TwoFactorChangedNoticeRequested.class));
    }

    @Test
    @DisplayName("disable and regenerate while 2FA is off are state conflicts")
    void disableAndRegenerateWhileOff() {
        assertThatThrownBy(() -> service().disable(USER_ID, "123456"))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.NOT_ENABLED));
        assertThatThrownBy(() -> service().regenerateRecoveryCodes(USER_ID, "123456"))
                .isInstanceOfSatisfying(TwoFactorStateException.class,
                        ex -> assertThat(ex.getReason()).isEqualTo(Reason.NOT_ENABLED));
    }

    @Test
    @DisplayName("regenerate deletes the old codes first, then saves ten new hashed ones")
    void regenerate() {
        enabledUser();
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(1);

        RecoveryCodesResponse response = service().regenerateRecoveryCodes(USER_ID, "ABCD-EFGH-JKLM-NPQR");

        assertThat(response.recoveryCodes()).hasSize(RecoveryCodes.CODE_COUNT);
        InOrder order = inOrder(recoveryCodeRepository);
        order.verify(recoveryCodeRepository).markUsed(eq(USER_ID), anyString(), any());
        order.verify(recoveryCodeRepository).deleteAllByUserId(USER_ID);
        order.verify(recoveryCodeRepository).saveAll(anyIterable());
        verify(publisher, never()).publishEvent(any(TwoFactorChangedNoticeRequested.class));
    }

    @Test
    @DisplayName("regenerate with a wrong code leaves the old codes untouched")
    void regenerateWrongCode() {
        enabledUser();
        when(recoveryCodeRepository.markUsed(eq(USER_ID), anyString(), any())).thenReturn(0);

        assertThatThrownBy(() -> service().regenerateRecoveryCodes(USER_ID, "WRONG-WRONG-WRONG-WRNG"))
                .isInstanceOf(InvalidTwoFactorCodeException.class);

        verify(recoveryCodeRepository, never()).deleteAllByUserId(anyLong());
        verify(recoveryCodeRepository, never()).saveAll(anyIterable());
    }
}
