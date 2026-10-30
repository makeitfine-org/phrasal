package net.phrasal.application.mapper;

import net.phrasal.application.dto.UserResponse;
import net.phrasal.domain.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "twoFactorEnrollmentRequired",
            expression = "java(entity.getRole() == net.phrasal.domain.entity.Role.ADMIN "
                    + "&& !entity.isTwoFactorEnabled())")
    @Mapping(target = "hasPassword", expression = "java(entity.hasPassword())")
    UserResponse toResponse(User entity);
}
