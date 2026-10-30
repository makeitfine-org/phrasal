package net.phrasal.domain.entity;

/**
 * Purpose of a one-time token. Stored by name ({@code EnumType.STRING}): {@code EMAIL_VERIFICATION} confirms an
 * address, {@code PASSWORD_RESET} authorises choosing a new password, {@code EMAIL_CHANGE} authorises moving the
 * account to the address stored with the token. Each purpose is looked up with its own type.
 */
public enum TokenType {

    EMAIL_VERIFICATION,
    PASSWORD_RESET,
    EMAIL_CHANGE
}
