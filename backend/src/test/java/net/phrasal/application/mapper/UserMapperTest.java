package net.phrasal.application.mapper;

import net.phrasal.application.dto.UserResponse;
import net.phrasal.domain.entity.Role;
import net.phrasal.domain.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("UserMapper")
class UserMapperTest {

    private final UserMapper mapper = Mappers.getMapper(UserMapper.class);

    @Test
    @DisplayName("toResponse maps id, email and role name without the hash")
    void toResponse() {
        User user = new User("a@b.com", "{bcrypt}hash", Role.ADMIN);
        user.setId(5L);

        UserResponse response = mapper.toResponse(user);

        assertThat(response).isEqualTo(new UserResponse(5L, "a@b.com", "ADMIN"));
    }

    @Test
    @DisplayName("toResponse maps null to null")
    void toResponseNull() {
        assertThat(mapper.toResponse(null)).isNull();
    }
}
