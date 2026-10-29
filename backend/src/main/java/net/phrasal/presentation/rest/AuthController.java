package net.phrasal.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.AcceptedResponse;
import net.phrasal.application.dto.ForgotPasswordRequest;
import net.phrasal.application.dto.LoginRequest;
import net.phrasal.application.dto.RegisterRequest;
import net.phrasal.application.dto.ResendVerificationRequest;
import net.phrasal.application.dto.UserResponse;
import net.phrasal.application.dto.VerifyEmailRequest;
import net.phrasal.application.service.AuthService;
import net.phrasal.application.service.EmailVerificationService;
import net.phrasal.application.service.PasswordResetService;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.RateLimiter;
import net.phrasal.presentation.security.SessionAuthenticator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final EmailVerificationService emailVerificationService;
    private final PasswordResetService passwordResetService;
    private final SessionAuthenticator sessionAuthenticator;
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
    public UserResponse login(@Valid @RequestBody LoginRequest request, HttpServletRequest httpRequest,
                              HttpServletResponse httpResponse) {
        rateLimiter.check("login-per-ip", rateLimits.loginPerIp(), httpRequest.getRemoteAddr());
        rateLimiter.check("login-per-email", rateLimits.loginPerEmail(), EmailNormalizer.normalize(request.email()));
        return sessionAuthenticator.login(request, httpRequest, httpResponse);
    }

    @PostMapping("/verify-email")
    public ResponseEntity<Void> verifyEmail(@Valid @RequestBody VerifyEmailRequest request,
                                            HttpServletRequest httpRequest) {
        rateLimiter.check("verify-per-ip", rateLimits.verifyPerIp(), httpRequest.getRemoteAddr());
        emailVerificationService.verify(request.token());
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

    @GetMapping("/me")
    public UserResponse me(@AuthenticationPrincipal AuthenticatedUser user) {
        return new UserResponse(user.id(), user.email(), user.role().name());
    }
}
