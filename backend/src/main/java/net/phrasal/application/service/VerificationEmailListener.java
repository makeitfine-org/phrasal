package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.event.AccountExistsNoticeRequested;
import net.phrasal.application.event.VerificationEmailRequested;
import net.phrasal.infrastructure.mail.EmailMessage;
import net.phrasal.infrastructure.mail.EmailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

/**
 * Sends account emails after the publishing transaction commits, off the request thread. A failure is logged with
 * the user id only and never reaches the HTTP response; the user can ask for a new link.
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class VerificationEmailListener {

    private final VerificationEmailComposer composer;
    private final EmailSender emailSender;

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onVerificationEmailRequested(VerificationEmailRequested event) {
        deliver(event.userId(), composer.verification(event.email(), event.rawToken()));
    }

    @Async
    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    public void onAccountExistsNoticeRequested(AccountExistsNoticeRequested event) {
        deliver(event.userId(), composer.accountExists(event.email()));
    }

    private void deliver(Long userId, EmailMessage message) {
        try {
            emailSender.send(message);
            log.info("Verification email sent userId={}", userId);
        } catch (RuntimeException ex) {
            log.warn("Verification email failed userId={}: {}", userId, ex.getClass().getSimpleName());
        }
    }
}
