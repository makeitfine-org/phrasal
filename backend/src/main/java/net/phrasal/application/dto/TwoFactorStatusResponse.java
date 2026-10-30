package net.phrasal.application.dto;

import java.time.LocalDateTime;

/**
 * 2FA state of the signed-in account.
 *
 * @param enabled                whether 2FA is on
 * @param enabledAt              when it was turned on, or {@code null}
 * @param recoveryCodesRemaining unused recovery codes
 */
public record TwoFactorStatusResponse(boolean enabled, LocalDateTime enabledAt, long recoveryCodesRemaining) {

}
