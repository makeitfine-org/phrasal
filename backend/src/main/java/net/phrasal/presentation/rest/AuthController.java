package net.phrasal.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.AcceptedResponse;
import net.phrasal.application.dto.ConfirmEmailChangeRequest;
import net.phrasal.application.dto.ForgotPasswordRequest;
import net.phrasal.application.dto.LoginChallengeResponse;
import net.phrasal.application.dto.LoginRequest;
import net.phrasal.application.dto.RegisterRequest;
import net.phrasal.application.dto.ResendVerificationRequest;
import net.phrasal.application.dto.ResetPasswordRequest;
import net.phrasal.application.dto.TwoFactorCodeRequest;
import net.phrasal.application.dto.UserResponse;
import net.phrasal.application.dto.VerifyEmailRequest;
import net.phrasal.application.service.AuthService;
import net.phrasal.application.service.EmailChangeService;
import net.phrasal.application.service.EmailVerificationService;
import net.phrasal.application.service.PasswordResetService;
import net.phrasal.application.service.TwoFactorService;
import net.phrasal.application.service.TwoFactorService.SecondFactor;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.infrastructure.exception.TwoFactorLoginExpiredException;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.RateLimiter;
import net.phrasal.presentation.security.LoginOutcome;
import net.phrasal.presentation.security.PendingTwoFactorLogin;
import net.phrasal.presentation.security.SessionAuthenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailVerificationService emailVerificationService;
    private final PasswordResetService passwordResetService;
    private final EmailChangeService emailChangeService;
    private final TwoFactorService twoFactorService;
    private final SessionAuthenticator sessionAuthenticator;
    private final PendingTwoFactorLogin pendingTwoFactorLogin;
    private final RateLimiter rateLimiter;
    private final RateLimitProperties rateLimits;

    @PostMapping("/register")
    public ResponseEntity<AcceptedResponse> register(@Valid @RequestBody RegisterRequest request,
                                                 HttpServletRequest httpRequest) {
        rateLimiter.check("register-per-ip", rateLimits.registerPerIp(), httpRequest.getRemoteAddr());
        rateLimiter.check("register-per-email", rateLimits.registerPerEmail(),
                EmailNormalizer.normalize(request.email()));
        authService.register(request);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(AcceptedResponse.CHECK_INBOX);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest,
                                   HttpServletResponse httpResponse) {
        rateLimiter.check("login-per-ip", rateLimits.loginPerIp(), httpRequest.getRemoteAddr());
        rateLimiter.check("login-per-email", rateLimits.loginPerEmail(), EmailNormalizer.normalize(request.email()));
        LoginOutcome outcome = sessionAuthenticator.login(request, httpRequest, httpResponse);
        if (outcome instanceof LoginOutcome.Authenticated authenticated) {
            return ResponseEntity.ok(authenticated.user());
        }
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(LoginChallengeResponse.REQUIRED);
    }

    @PostMapping("/login/2fa")
    public UserResponse loginTwoFactor(@Valid @RequestBody TwoFactorCodeRequest request,
                                       HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        rateLimiter.check("two-factor-per-ip", rateLimits.twoFactorPerIp(), httpRequest.getRemoteAddr());
        Long userId = pendingTwoFactorLogin.userId(httpRequest).orElseThrow(TwoFactorLoginExpiredException::new);
        rateLimiter.check("two-factor-per-user", rateLimits.twoFactorPerUser(), userId.toString());
        AuthenticatedUser principal = twoFactorService.loadPrincipal(userId);
        SecondFactor factor = twoFactorService.verifyCode(userId, request.code());
        log.info("Logged in user id={} secondFactor={}", userId, factor);
        return sessionAuthenticator.completeTwoFactorLogin(principal, httpRequest, httpResponse);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequest request,
                                            HttpServletRequest httpRequest) {
        rateLimiter.check("verify-per-ip", rateLimits.verifyPerIp(), httpRequest.getRemoteAddr());
        emailVerificationService.verify(request.token());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/confirm-email-change")
    public ResponseEntity<Void> confirmEmailChange(@Valid @RequestBody ConfirmEmailChangeRequest request,
                                                   HttpServletRequest httpRequest) {
        rateLimiter.check("verify-per-ip", rateLimits.verifyPerIp(), httpRequest.getRemoteAddr());
        emailChangeService.confirmChange(request.token());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<AcceptedResponse> resendVerification(@Valid @RequestBody ResendVerificationRequest request,
                                                               HttpServletRequest httpRequest) {
        rateLimiter.check("resend-per-ip", rateLimits.resendPerIp(), httpRequest.getRemoteAddr());
        rateLimiter.check("resend-per-email", rateLimits.resendPerEmail(),
                EmailNormalizer.normalize(request.email()));
        emailVerificationService.resend(request.email());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(AcceptedResponse.CHECK_INBOX);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<AcceptedResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request,
                                                           HttpServletRequest httpRequest) {
        rateLimiter.check("forgot-per-ip", rateLimits.forgotPerIp(), httpRequest.getRemoteAddr());
        rateLimiter.check("forgot-per-email", rateLimits.forgotPerEmail(),
                EmailNormalizer.normalize(request.email()));
        passwordResetService.requestReset(request.email());
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(AcceptedResponse.CHECK_INBOX);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Void> resetPassword(@Valid @RequestBody ResetPasswordRequest request,
                                              HttpServletRequest httpRequest) {
        rateLimiter.check("reset-per-ip", rateLimits.resetPerIp(), httpRequest.getRemoteAddr());
        passwordResetService.reset(request.token(), request.password());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal AuthenticatedUser user) {
        return UserResponse.from(user);
    }
}
