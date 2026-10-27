package net.phrasal.application.dto;

/**
 * Public view of an account, returned by register, login and me.
 *
 * @param id    user id
 * @param email normalized email
 * @param role  role name, e.g. {@code USER} or {@code ADMIN}
 */
public record UserResponse(Long id, String email, String role) {

}
