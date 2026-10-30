package net.phrasal.application.mapper;

import net.phrasal.application.dto.UserResponse;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("UserMapper")
class UserMapperTest {

    private final UserMapper mapper = Mappers.getMapper(UserMapper.class);

    @Test
    @DisplayName("toResponse maps id, email, role name, 2FA flags and hasPassword without the hash")
    void toResponse() {
        User user = new User("a@b.com", "{bcrypt}hash", Role.ADMIN);
        user.setId(5L);

        UserResponse response = mapper.toResponse(user);

        assertThat(response).isEqualTo(new UserResponse(5L, "a@b.com", "ADMIN", false, true, true));
    }

    @Test
    @DisplayName("toResponse reports hasPassword false for a Google account")
    void toResponseGoogleAccount() {
        User user = User.fromGoogle("g@b.com", "google-subject", LocalDateTime.of(2026, 10, 30, 9, 0));
        user.setId(6L);

        assertThat(mapper.toResponse(user)).isEqualTo(new UserResponse(6L, "g@b.com", "USER", false, false, false));
    }

    @Test
    @DisplayName("toResponse maps null to null")
    void toResponseNull() {
        assertThat(mapper.toResponse(null)).isNull();
    }
}
