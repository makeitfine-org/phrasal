package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Base64;

import static org.assertj.core.api.Assertions.assertThat;

class AuthenticatedUserTest {

    /**
     * A principal written by the record before {@code twoFactorEnabled} existed (id 9, old@example.com, ADMIN).
     * Sessions in {@code spring_session} hold such bytes, so they must still load, with 2FA off.
     */
    private static final String PRE_2FA_STREAM = "rO0ABXNyADVuZXQucGhyYXNhbC5pbmZyYXN0cnVjdHVyZS5zZWN1cml0eS5BdXRoZW50aWNhdGVkVXNlcgAAAAAAAAABAgADTAAFZW1haWx0ABJMamF2YS9sYW5nL1N0cmluZztMAAJpZHQAEExqYXZhL2xhbmcvTG9uZztMAARyb2xldAAgTG5ldC9waHJhc2FsL2RvbWFpbi9lbnRpdHkvUm9sZTt4cHQAD29sZEBleGFtcGxlLmNvbXNyAA5qYXZhLmxhbmcuTG9uZzuL5JDMjyPfAgABSgAFdmFsdWV4cgAQamF2YS5sYW5nLk51bWJlcoaslR0LlOCLAgAAeHAAAAAAAAAACX5yAB5uZXQucGhyYXNhbC5kb21haW4uZW50aXR5LlJvbGUAAAAAAAAAABIAAHhyAA5qYXZhLmxhbmcuRW51bQAAAAAAAAAAEgAAeHB0AAVBRE1JTg==";

    @Test
    void authorities_user_hasRoleUser() {
        AuthenticatedUser user = new AuthenticatedUser(1L, "a@b.com", Role.USER, false);

        assertThat(user.authorities()).extracting("authority").containsExactly("ROLE_USER");
    }

    @Test
    void authorities_admin_hasRoleAdmin() {
        AuthenticatedUser admin = new AuthenticatedUser(2L, "admin@b.com", Role.ADMIN, false);

        assertThat(admin.authorities()).extracting("authority").containsExactly("ROLE_ADMIN");
        assertThat(admin.authorities()).extracting("authority").doesNotContain("ROLE_USER");
    }

    @Test
    void twoFactorEnrollmentRequired_onlyForAdminWithoutTwoFactor() {
        assertThat(new AuthenticatedUser(1L, "a@b.com", Role.ADMIN, false).twoFactorEnrollmentRequired()).isTrue();
        assertThat(new AuthenticatedUser(1L, "a@b.com", Role.ADMIN, true).twoFactorEnrollmentRequired()).isFalse();
        assertThat(new AuthenticatedUser(1L, "a@b.com", Role.USER, false).twoFactorEnrollmentRequired()).isFalse();
        assertThat(new AuthenticatedUser(1L, "a@b.com", Role.USER, true).twoFactorEnrollmentRequired()).isFalse();
    }

    @Test
    void withTwoFactor_changesOnlyTheFlag() {
        AuthenticatedUser user = new AuthenticatedUser(4L, "e@f.com", Role.ADMIN, false);

        AuthenticatedUser enabled = user.withTwoFactor(true);

        assertThat(enabled).isEqualTo(new AuthenticatedUser(4L, "e@f.com", Role.ADMIN, true));
        assertThat(user.twoFactorEnabled()).isFalse();
    }

    @Test
    void serialization_roundTrip_givesEqualRecord() throws IOException, ClassNotFoundException {
        AuthenticatedUser original = new AuthenticatedUser(3L, "c@d.com", Role.ADMIN, true);
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(original);
        }

        Object copy = read(bytes.toByteArray());

        assertThat(copy).isEqualTo(original).isNotSameAs(original);
    }

    @Test
    void deserialization_streamFromThreeComponentRecord_readsTwoFactorAsDisabled()
            throws IOException, ClassNotFoundException {
        Object copy = read(Base64.getDecoder().decode(PRE_2FA_STREAM));

        assertThat(copy).isEqualTo(new AuthenticatedUser(9L, "old@example.com", Role.ADMIN, false));
    }

    private static Object read(byte[] bytes) throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes))) {
            return in.readObject();
        }
    }
}
