package net.phrasal.config;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("GoogleLoginProperties")
class GoogleLoginPropertiesTest {

    private static final String CLIENT_ID = "client-id.apps.googleusercontent.com";
    private static final String SECRET = "test-secret-that-must-not-leak";

    private static GoogleLoginProperties properties(boolean enabled, String clientId, String clientSecret) {
        return new GoogleLoginProperties(enabled, clientId, clientSecret, "", "", "", "", "");
    }

    @Test
    @DisplayName("disabled with blank or missing credentials is fine")
    void disabledWithoutCredentials() {
        assertThat(properties(false, "", "").enabled()).isFalse();
        assertThat(properties(false, null, null).clientId()).isNull();
    }

    @Test
    @DisplayName("enabled with both credentials is fine")
    void enabledWithCredentials() {
        GoogleLoginProperties google = properties(true, CLIENT_ID, SECRET);

        assertThat(google.enabled()).isTrue();
        assertThat(google.clientId()).isEqualTo(CLIENT_ID);
    }

    @Test
    @DisplayName("enabled with a blank client id fails and names GOOGLE_CLIENT_ID")
    void enabledWithoutClientId() {
        assertThatThrownBy(() -> properties(true, " ", SECRET))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("GOOGLE_CLIENT_ID")
                .hasMessageNotContaining(SECRET);
        assertThatThrownBy(() -> properties(true, null, SECRET))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("GOOGLE_CLIENT_ID");
    }

    @Test
    @DisplayName("enabled with a blank client secret fails and names GOOGLE_CLIENT_SECRET")
    void enabledWithoutClientSecret() {
        assertThatThrownBy(() -> properties(true, CLIENT_ID, ""))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("GOOGLE_CLIENT_SECRET")
                .hasMessageNotContaining(CLIENT_ID);
    }

    @Test
    @DisplayName("toString masks the client secret but keeps the other values")
    void toStringMasksSecret() {
        String text = new GoogleLoginProperties(true, CLIENT_ID, SECRET, "http://localhost:8090/default/authorize",
                "", "", "", "").toString();

        assertThat(text).doesNotContain(SECRET)
                .contains("clientSecret=*****", "clientId=" + CLIENT_ID, "enabled=true",
                        "authorizationUri=http://localhost:8090/default/authorize");
    }
}
