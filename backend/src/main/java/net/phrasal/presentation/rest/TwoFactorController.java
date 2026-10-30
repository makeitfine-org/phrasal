package net.phrasal.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.RecoveryCodesResponse;
import net.phrasal.application.dto.TwoFactorCodeRequest;
import net.phrasal.application.dto.TwoFactorSetupRequest;
import net.phrasal.application.dto.TwoFactorSetupResponse;
import net.phrasal.application.dto.TwoFactorStatusResponse;
import net.phrasal.application.service.TwoFactorService;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.RateLimiter;
import net.phrasal.infrastructure.security.SessionRevoker;
import net.phrasal.presentation.security.SessionAuthenticator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Authenticator-app 2FA of the signed-in account. */
@RestController
@RequestMapping("/api/v1/me/2fa")
@RequiredArgsConstructor
public class TwoFactorController {

    private final TwoFactorService twoFactorService;
    private final SessionAuthenticator sessionAuthenticator;
    private final SessionRevoker sessionRevoker;
    private final RateLimiter rateLimiter;
    private final RateLimitProperties rateLimits;

    @GetMapping
    public TwoFactorStatusResponse status(@AuthenticationPrincipal AuthenticatedUser user) {
        return twoFactorService.status(user.id());
    }

    @PostMapping("/setup")
    public TwoFactorSetupResponse setup(@AuthenticationPrincipal AuthenticatedUser user,
                                        @Valid @RequestBody TwoFactorSetupRequest request) {
        rateLimiter.check("login-per-email", rateLimits.loginPerEmail(), user.email());
        return twoFactorService.setup(user.id(), request.password());
    }

    @PostMapping("/confirm")
    public RecoveryCodesResponse confirm(@AuthenticationPrincipal AuthenticatedUser user,
                                         @Valid @RequestBody TwoFactorCodeRequest request,
                                         HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        rateLimiter.check("two-factor-per-user", rateLimits.twoFactorPerUser(), user.id().toString());
        RecoveryCodesResponse codes = twoFactorService.confirm(user.id(), request.code());
        // Spring Session renames the stored row only when the request commits, so the row to keep is still stored
        // under the id the request arrived with, not under the id changeSessionId() just assigned.
        String storedSessionId = httpRequest.getSession().getId();
        sessionAuthenticator.refresh(user.withTwoFactor(true), httpRequest, httpResponse);
        sessionRevoker.revokeOthers(user.email(), storedSessionId);
        return codes;
    }

    @PostMapping("/recovery-codes")
    public RecoveryCodesResponse regenerateRecoveryCodes(@AuthenticationPrincipal AuthenticatedUser user,
                                                         @Valid @RequestBody TwoFactorCodeRequest request) {
        rateLimiter.check("two-factor-per-user", rateLimits.twoFactorPerUser(), user.id().toString());
        return twoFactorService.regenerateRecoveryCodes(user.id(), request.code());
    }

    @PostMapping("/disable")
    public ResponseEntity<Void> disable(@AuthenticationPrincipal AuthenticatedUser user,
                                        @Valid @RequestBody TwoFactorCodeRequest request,
                                        HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        rateLimiter.check("two-factor-per-user", rateLimits.twoFactorPerUser(), user.id().toString());
        twoFactorService.disable(user.id(), request.code());
        sessionAuthenticator.refresh(user.withTwoFactor(false), httpRequest, httpResponse);
        return ResponseEntity.noContent().build();
    }
}
