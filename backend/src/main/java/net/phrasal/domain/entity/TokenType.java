package net.phrasal.domain.entity;

/**
 * Purpose of a one-time token. Stored by name ({@code EnumType.STRING}); password reset (task-100)
 * adds {@code PASSWORD_RESET}.
 */
public enum TokenType {

    EMAIL_VERIFICATION
}
