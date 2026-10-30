package net.phrasal.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.ChangePasswordRequest;
import net.phrasal.application.service.AccountService;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.RateLimiter;
import net.phrasal.infrastructure.security.SessionRevoker;
import net.phrasal.presentation.security.SessionAuthenticator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** Account changes by the signed-in owner; every one asks for the current password again. */
@RestController
@RequestMapping("/api/v1/me")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final SessionAuthenticator sessionAuthenticator;
    private final SessionRevoker sessionRevoker;
    private final RateLimiter rateLimiter;
    private final RateLimitProperties rateLimits;

    @PostMapping("/password")
    public ResponseEntity<Void> changePassword(@AuthenticationPrincipal AuthenticatedUser user,
                                               @Valid @RequestBody ChangePasswordRequest request,
                                               HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        rateLimiter.check("reauth-per-user", rateLimits.reauthPerUser(), user.id().toString());
        // Spring Session renames the stored row only when the request commits, so the row to keep is still stored
        // under the id the request arrived with, not under the id changeSessionId() is about to assign.
        String storedSessionId = httpRequest.getSession().getId();
        accountService.changePassword(user.id(), request.currentPassword(), request.newPassword());
        sessionAuthenticator.refresh(user, httpRequest, httpResponse);
        sessionRevoker.revokeOthers(user.email(), storedSessionId);
        return ResponseEntity.noContent().build();
    }
}
