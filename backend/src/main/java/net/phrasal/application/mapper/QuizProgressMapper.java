package net.phrasal.application.mapper;

import net.phrasal.application.dto.QuizProgressResponse;
import net.phrasal.domain.entity.UserQuizProgress;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuizProgressMapper {

    @Mapping(target = "quizKey", expression = "java(entity.getQuizKey().pathValue())")
    QuizProgressResponse toResponse(UserQuizProgress entity);
}
