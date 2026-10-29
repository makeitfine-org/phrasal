package net.phrasal.domain.entity;

/**
 * Purpose of a one-time token. Stored by name ({@code EnumType.STRING}): {@code EMAIL_VERIFICATION} confirms an
 * address, {@code PASSWORD_RESET} authorises choosing a new password. Each purpose is looked up with its own type.
 */
public enum TokenType {

    EMAIL_VERIFICATION,
    PASSWORD_RESET
}
