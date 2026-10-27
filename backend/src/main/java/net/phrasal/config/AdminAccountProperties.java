package net.phrasal.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Credentials of the bootstrap admin account. Both blank means no admin is managed.
 *
 * @param email    admin email, normalized before use
 * @param password admin password, must satisfy the password policy
 */
@ConfigurationProperties("phrasal.security.admin")
public record AdminAccountProperties(String email, String password) {

    @Override
    public String toString() {
        return "AdminAccountProperties[email=" + email + ", password=*****]";
    }

    public boolean isConfigured() {
        return email != null && !email.isBlank() && password != null && !password.isBlank();
    }
}
