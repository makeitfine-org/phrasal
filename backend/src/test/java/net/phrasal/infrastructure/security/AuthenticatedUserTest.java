package net.phrasal.infrastructure.security;

import net.phrasal.domain.entity.Role;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;

import static org.assertj.core.api.Assertions.assertThat;

class AuthenticatedUserTest {

    @Test
    void authorities_user_hasRoleUser() {
        AuthenticatedUser user = new AuthenticatedUser(1L, "a@b.com", Role.USER);

        assertThat(user.authorities()).extracting("authority").containsExactly("ROLE_USER");
    }

    @Test
    void authorities_admin_hasRoleAdmin() {
        AuthenticatedUser admin = new AuthenticatedUser(2L, "admin@b.com", Role.ADMIN);

        assertThat(admin.authorities()).extracting("authority").containsExactly("ROLE_ADMIN");
        assertThat(admin.authorities()).extracting("authority").doesNotContain("ROLE_USER");
    }

    @Test
    void serialization_roundTrip_givesEqualRecord() throws IOException, ClassNotFoundException {
        AuthenticatedUser original = new AuthenticatedUser(3L, "c@d.com", Role.ADMIN);
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        try (ObjectOutputStream out = new ObjectOutputStream(bytes)) {
            out.writeObject(original);
        }

        Object copy;
        try (ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(bytes.toByteArray()))) {
            copy = in.readObject();
        }

        assertThat(copy).isEqualTo(original).isNotSameAs(original);
    }
}
