package net.phrasal.application.service;

import net.phrasal.application.dto.QuizProgressRequest;
import net.phrasal.application.dto.QuizProgressResponse;
import net.phrasal.application.mapper.QuizProgressMapper;
import net.phrasal.config.QuizProgressProperties;
import net.phrasal.domain.entity.QuizKey;
import net.phrasal.domain.entity.UserQuizProgress;
import net.phrasal.domain.repository.UserQuizProgressRepository;
import net.phrasal.infrastructure.exception.QuizProgressNotFoundException;
import net.phrasal.infrastructure.exception.QuizProgressTooLargeException;
import net.phrasal.infrastructure.exception.UnknownQuizKeyException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import tools.jackson.databind.json.JsonMapper;

import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("QuizProgressService")
class QuizProgressServiceTest {

    private static final long USER_ID = 5L;
    private static final String KEY = "phrasal-verbs";
    // {"k":"..."} has 8 bytes of JSON overhead around the value
    private static final int JSON_OVERHEAD = 8;
    private static final int MAX_BYTES = 100;

    @Mock
    private UserQuizProgressRepository repository;

    @Mock
    private QuizProgressMapper mapper;

    private QuizProgressService service;
    private UserQuizProgress entity;
    private QuizProgressResponse response;

    @BeforeEach
    void setUp() {
        service = new QuizProgressService(repository, mapper, JsonMapper.builder().build(),
                new QuizProgressProperties(MAX_BYTES));
        entity = new UserQuizProgress(USER_ID, QuizKey.PHRASAL_VERBS, Map.of("a", 1));
        response = new QuizProgressResponse(KEY, Map.of("a", 1), 0L, null);
    }

    private static QuizProgressRequest requestOfBytes(int totalBytes) {
        return new QuizProgressRequest(Map.of("k", "x".repeat(totalBytes - JSON_OVERHEAD)));
    }

    @Test
    @DisplayName("get returns the stored progress")
    void get_returnsProgress() {
        when(repository.findByUserIdAndQuizKey(USER_ID, QuizKey.PHRASAL_VERBS)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        assertThat(service.get(USER_ID, KEY)).isSameAs(response);
    }

    @Test
    @DisplayName("get throws when nothing is stored")
    void get_throwsWhenMissing() {
        when(repository.findByUserIdAndQuizKey(USER_ID, QuizKey.PHRASAL_VERBS)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.get(USER_ID, KEY)).isInstanceOf(QuizProgressNotFoundException.class);
    }

    @Test
    @DisplayName("get rejects an unknown key without touching the repository")
    void get_unknownKey() {
        assertThatThrownBy(() -> service.get(USER_ID, "nope")).isInstanceOf(UnknownQuizKeyException.class);

        verifyNoInteractions(repository);
    }

    @Test
    @DisplayName("save upserts compact JSON under the path value and returns the re-read row")
    void save_upsertsAndReturns() {
        when(repository.findByUserIdAndQuizKey(USER_ID, QuizKey.PHRASAL_VERBS)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        QuizProgressResponse result = service.save(USER_ID, KEY, new QuizProgressRequest(Map.of("a", 1)));

        assertThat(result).isSameAs(response);
        verify(repository).upsert(USER_ID, KEY, "{\"a\":1}");
    }

    @Test
    @DisplayName("save accepts a state of exactly the maximum size")
    void save_acceptsExactlyMax() {
        when(repository.findByUserIdAndQuizKey(USER_ID, QuizKey.PHRASAL_VERBS)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        service.save(USER_ID, KEY, requestOfBytes(MAX_BYTES));

        verify(repository).upsert(anyLong(), anyString(), anyString());
    }

    @Test
    @DisplayName("save rejects a state one byte over the maximum")
    void save_rejectsOverMax() {
        assertThatThrownBy(() -> service.save(USER_ID, KEY, requestOfBytes(MAX_BYTES + 1)))
                .isInstanceOf(QuizProgressTooLargeException.class)
                .hasMessage("Quiz progress must not exceed " + MAX_BYTES + " bytes");

        verify(repository, never()).upsert(anyLong(), anyString(), anyString());
    }

    @Test
    @DisplayName("save rejects an unknown key before serializing or writing")
    void save_unknownKey() {
        assertThatThrownBy(() -> service.save(USER_ID, "nope", new QuizProgressRequest(Map.of())))
                .isInstanceOf(UnknownQuizKeyException.class);

        verifyNoInteractions(repository);
        verifyNoInteractions(mapper);
    }

    @Test
    @DisplayName("save fails when the row cannot be re-read")
    void save_throwsWhenRowVanishes() {
        when(repository.findByUserIdAndQuizKey(USER_ID, QuizKey.PHRASAL_VERBS)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.save(USER_ID, KEY, new QuizProgressRequest(Map.of())))
                .isInstanceOf(QuizProgressNotFoundException.class);
        verify(repository).upsert(any(), anyString(), anyString());
    }
}
