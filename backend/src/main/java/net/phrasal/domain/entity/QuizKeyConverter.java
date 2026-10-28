package net.phrasal.domain.entity;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class QuizKeyConverter implements AttributeConverter<QuizKey, String> {

    @Override
    public String convertToDatabaseColumn(QuizKey attribute) {
        return attribute == null ? null : attribute.pathValue();
    }

    @Override
    public QuizKey convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return QuizKey.fromPathValue(dbData)
                .orElseThrow(() -> new IllegalStateException("Unknown quiz key in database"));
    }
}
