package net.phrasal.application.validation;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PasswordPolicy")
class PasswordPolicyTest {

    @ParameterizedTest
    @ValueSource(strings = {"password123", "PASSWORD123", "PassWord123", "1q2w3e4r5t", "qwertyuiop", "1234567890"})
    @DisplayName("common passwords are rejected, ignoring case")
    void commonPasswordsRejected(String password) {
        assertThat(PasswordPolicy.violation(password)).contains(PasswordPolicy.TOO_COMMON);
    }

    @ParameterizedTest
    @ValueSource(strings = {"1111111111", "aaaaaaaaaaaa", "€€€€€€€€€€"})
    @DisplayName("a single repeated character is rejected")
    void repeatedCharacterRejected(String password) {
        assertThat(PasswordPolicy.violation(password)).contains(PasswordPolicy.REPEATED);
    }

    @Test
    @DisplayName("length rules win over the blocklist")
    void lengthFirst() {
        assertThat(PasswordPolicy.violation("qwerty")).hasValueSatisfying(m -> assertThat(m).contains("at least 10"));
    }

    @ParameterizedTest
    @ValueSource(strings = {"correct horse battery", "admin-dev-password", "e2e-password-123", "Tr0ub4dor&3-xyz"})
    @DisplayName("uncommon passwords pass without any symbol, digit or case requirement")
    void acceptable(String password) {
        assertThat(PasswordPolicy.violation(password)).isEmpty();
    }

    @Test
    @DisplayName("password containing the full email is rejected")
    void containsFullEmail() {
        assertThat(PasswordPolicy.violation("x-jane@site.org-x", "Jane@Site.org"))
                .contains(PasswordPolicy.CONTAINS_EMAIL);
    }

    @Test
    @DisplayName("password containing the email local part is rejected, ignoring case")
    void containsLocalPart() {
        assertThat(PasswordPolicy.violation("My-JANEDOE-secret", "janedoe@site.org"))
                .contains(PasswordPolicy.CONTAINS_EMAIL);
    }

    @Test
    @DisplayName("local parts shorter than 4 characters are not matched")
    void shortLocalPartIgnored() {
        assertThat(PasswordPolicy.violation("my-bob-is-secret", "bob@site.org")).isEmpty();
    }

    @Test
    @DisplayName("null or blank email skips the email rule")
    void noEmail() {
        assertThat(PasswordPolicy.violation("correct horse battery", null)).isEmpty();
        assertThat(PasswordPolicy.violation("correct horse battery", " ")).isEmpty();
    }

    @Test
    @DisplayName("two-argument form still applies the account-independent rules first")
    void independentRulesFirst() {
        assertThat(PasswordPolicy.violation("password123", "password123@x.org")).contains(PasswordPolicy.TOO_COMMON);
    }
}
