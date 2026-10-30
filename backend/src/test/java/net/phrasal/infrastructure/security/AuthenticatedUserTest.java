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

    /**
     * A principal written by the record before {@code passwordless} existed (id 11, older@example.com, USER, 2FA on).
     * Sessions in {@code spring_session} hold such bytes, so they must still load, with a password.
     */
    private static final String PRE_PASSWORDLESS_STREAM = "rO0ABXNyADVuZXQucGhyYXNhbC5pbmZyYXN0cnVjdHVyZS5zZWN1cml0eS5BdXRoZW50aWNhdGVkVXNlcgAAAAAAAAABAgAEWgAQdHdvRmFjdG9yRW5hYmxlZEwABWVtYWlsdAASTGphdmEvbGFuZy9TdHJpbmc7TAACaWR0ABBMamF2YS9sYW5nL0xvbmc7TAAEcm9sZXQAIExuZXQvcGhyYXNhbC9kb21haW4vZW50aXR5L1JvbGU7eHABdAARb2xkZXJAZXhhbXBsZS5jb21zcgAOamF2YS5sYW5nLkxvbmc7i+SQzI8j3wIAAUoABXZhbHVleHIAEGphdmEubGFuZy5OdW1iZXKGrJUdC5TgiwIAAHhwAAAAAAAAAAt+cgAebmV0LnBocmFzYWwuZG9tYWluLmVudGl0eS5Sb2xlAAAAAAAAAAASAAB4cgAOamF2YS5sYW5nLkVudW0AAAAAAAAAABIAAHhwdAAEVVNFUg==";

    @Test
    void authorities_userWithOrWithoutTwoFactor_hasRoleUser() {
        for (boolean twoFactor : new boolean[] {false, true}) {
            AuthenticatedUser user = new AuthenticatedUser(1L, "a@b.com", Role.USER, twoFactor, false);

            assertThat(user.authorities()).extracting("authority").containsExactly("ROLE_USER");
        }
    }

    @Test
    void authorities_adminWithTwoFactor_hasRoleAdmin() {
        AuthenticatedUser admin = new AuthenticatedUser(2L, "admin@b.com", Role.ADMIN, true, false);

        assertThat(admin.authorities()).extracting("authority").containsExactly("ROLE_ADMIN");
    }

    @Test
    void authorities_adminWithoutTwoFactor_hasOnlyRoleUser() {
        AuthenticatedUser admin = new AuthenticatedUser(2L, "admin@b.com", Role.ADMIN, false, false);

        assertThat(admin.authorities()).extracting("authority").containsExactly("ROLE_USER");
    }

    @Test
    void twoFactorEnrollmentRequired_onlyForAdminWithoutTwoFactor() {
        assertThat(principal(Role.ADMIN, false).twoFactorEnrollmentRequired()).isTrue();
        assertThat(principal(Role.ADMIN, true).twoFactorEnrollmentRequired()).isFalse();
        assertThat(principal(Role.USER, false).twoFactorEnrollmentRequired()).isFalse();
        assertThat(principal(Role.USER, true).twoFactorEnrollmentRequired()).isFalse();
    }

    @Test
    void withTwoFactor_changesOnlyTheFlag() {
        AuthenticatedUser user = new AuthenticatedUser(4L, "e@f.com", Role.ADMIN, false, false);

        AuthenticatedUser enabled = user.withTwoFactor(true);

        assertThat(enabled).isEqualTo(new AuthenticatedUser(4L, "e@f.com", Role.ADMIN, true, false));
        assertThat(user.twoFactorEnabled()).isFalse();
    }

    @Test
    void withTwoFactor_keepsPasswordless() {
        AuthenticatedUser googleOnly = new AuthenticatedUser(5L, "g@f.com", Role.USER, false, true);

        assertThat(googleOnly.withTwoFactor(true))
                .isEqualTo(new AuthenticatedUser(5L, "g@f.com", Role.USER, true, true));
        assertThat(googleOnly.withTwoFactor(false).passwordless()).isTrue();
    }

    @Test
    void serialization_roundTrip_givesEqualRecord() throws IOException, ClassNotFoundException {
        for (boolean passwordless : new boolean[] {false, true}) {
            AuthenticatedUser original = new AuthenticatedUser(3L, "c@d.com", Role.ADMIN, true, passwordless);

            Object copy = read(write(original));

            assertThat(copy).isEqualTo(original).isNotSameAs(original);
        }
    }

    @Test
    void deserialization_streamFromFourComponentRecord_readsPasswordlessAsFalse()
            throws IOException, ClassNotFoundException {
        Object copy = read(Base64.getDecoder().decode(PRE_PASSWORDLESS_STREAM));

        assertThat(copy).isEqualTo(new AuthenticatedUser(11L, "older@example.com", Role.USER, true, false));
    }

    @Test
    void deserialization_streamFromThreeComponentRecord_readsTwoFactorAsDisabled()
            throws IOException, ClassNotFoundException {
        Object copy = read(Base64.getDecoder().decode(PRE_2FA_STREAM));

        assertThat(copy).isEqualTo(new AuthenticatedUser(9L, "old@example.com", Role.ADMIN, false, false));
    }

    private static AuthenticatedUser principal(Role role, boolean twoFactor) {
        return new AuthenticatedUser(1L, "a@b.com", role, twoFactor, false);
    }

    private static byte[] write(Object value) throws IOException {
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(value);
        }
        return bytes.toByteArray();
    }

    private static Object read(byte[] bytes) throws IOException, ClassNotFoundException {
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes))) {
            return in.readObject();
        }
    }
}
