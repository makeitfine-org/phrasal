package net.phrasal.presentation.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.QuizProgressRequest;
import net.phrasal.application.dto.QuizProgressResponse;
import net.phrasal.application.service.QuizProgressService;
import net.phrasal.infrastructure.security.AuthenticatedUser;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/me/quiz-progress")
@RequiredArgsConstructor
public class QuizProgressController {

    private final QuizProgressService service;

    @GetMapping("/{quizKey}")
    public QuizProgressResponse get(@AuthenticationPrincipal AuthenticatedUser user,
                                    @PathVariable String quizKey) {
        return service.get(user.id(), quizKey);
    }

    // Idempotent: creates or replaces the whole document and always answers 200.
    @PutMapping(path = "/{quizKey}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public QuizProgressResponse save(@AuthenticationPrincipal AuthenticatedUser user,
                                     @PathVariable String quizKey,
                                     @Valid @RequestBody QuizProgressRequest request) {
        return service.save(user.id(), quizKey, request);
    }
}
