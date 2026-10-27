package net.phrasal.application.mapper;

import net.phrasal.application.dto.UserResponse;
import net.phrasal.domain.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserResponse toResponse(User entity);
}
