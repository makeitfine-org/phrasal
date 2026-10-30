package net.phrasal.presentation.rest;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.AcceptedResponse;
import net.phrasal.application.dto.ChangeEmailRequest;
import net.phrasal.application.dto.ChangePasswordRequest;
import net.phrasal.application.dto.DeleteAccountRequest;
import net.phrasal.application.service.AccountService;
import net.phrasal.application.service.EmailChangeService;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import net.phrasal.infrastructure.security.EmailNormalizer;
import net.phrasal.infrastructure.security.RateLimiter;
import net.phrasal.infrastructure.security.SessionRevoker;
import net.phrasal.presentation.security.SessionAuthenticator;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
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
    private final EmailChangeService emailChangeService;
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

    @PostMapping("/email")
    public ResponseEntity<AcceptedResponse> changeEmail(@AuthenticationPrincipal AuthenticatedUser user,
                                                        @Valid @RequestBody ChangeEmailRequest request) {
        rateLimiter.check("reauth-per-user", rateLimits.reauthPerUser(), user.id().toString());
        rateLimiter.check("email-change-per-email", rateLimits.emailChangePerEmail(),
                EmailNormalizer.normalize(request.newEmail()));
        emailChangeService.requestChange(user.id(), request.newEmail(), request.currentPassword());
        return ResponseEntity.accepted().body(AcceptedResponse.CHECK_INBOX);
    }

    @PostMapping("/delete")
    public ResponseEntity<Void> deleteAccount(@AuthenticationPrincipal AuthenticatedUser user,
                                              @Valid @RequestBody DeleteAccountRequest request,
                                              Authentication authentication, HttpServletRequest httpRequest,
                                              HttpServletResponse httpResponse) {
        rateLimiter.check("reauth-per-user", rateLimits.reauthPerUser(), user.id().toString());
        accountService.deleteAccount(user.id(), request.password(), request.code());
        // Clears the security context and invalidates the HttpSession; the session cookie serializer then answers
        // with Max-Age=0, so the browser drops the SESSION cookie too.
        new SecurityContextLogoutHandler().logout(httpRequest, httpResponse, authentication);
        return ResponseEntity.noContent().build();
    }
}
