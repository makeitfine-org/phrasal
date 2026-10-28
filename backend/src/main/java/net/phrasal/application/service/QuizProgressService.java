package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.QuizProgressRequest;
import net.phrasal.application.dto.QuizProgressResponse;
import net.phrasal.application.mapper.QuizProgressMapper;
import net.phrasal.config.QuizProgressProperties;
import net.phrasal.domain.entity.QuizKey;
import net.phrasal.domain.repository.UserQuizProgressRepository;
import net.phrasal.infrastructure.exception.QuizProgressNotFoundException;
import net.phrasal.infrastructure.exception.QuizProgressTooLargeException;
import net.phrasal.infrastructure.exception.UnknownQuizKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tools.jackson.databind.json.JsonMapper;

import java.nio.charset.StandardCharsets;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizProgressService {

    private final UserQuizProgressRepository repository;
    private final QuizProgressMapper mapper;
    private final JsonMapper jsonMapper;
    private final QuizProgressProperties properties;

    public QuizProgressResponse get(Long userId, String quizKeyPath) {
        QuizKey quizKey = resolveKey(quizKeyPath);
        return repository.findByUserIdAndQuizKey(userId, quizKey)
                .map(mapper::toResponse)
                .orElseThrow(QuizProgressNotFoundException::new);
    }

    @Transactional
    public QuizProgressResponse save(Long userId, String quizKeyPath, QuizProgressRequest request) {
        QuizKey quizKey = resolveKey(quizKeyPath);
        byte[] json = jsonMapper.writeValueAsBytes(request.state());
        if (json.length > properties.maxStateBytes()) {
            throw new QuizProgressTooLargeException(properties.maxStateBytes());
        }
        repository.upsert(userId, quizKey.pathValue(), new String(json, StandardCharsets.UTF_8));
        log.debug("Saved quiz progress userId={} quizKey={} bytes={}", userId, quizKey.pathValue(), json.length);
        return repository.findByUserIdAndQuizKey(userId, quizKey)
                .map(mapper::toResponse)
                .orElseThrow(QuizProgressNotFoundException::new);
    }

    private QuizKey resolveKey(String quizKeyPath) {
        return QuizKey.fromPathValue(quizKeyPath).orElseThrow(UnknownQuizKeyException::new);
    }
}
