package net.phrasal.application.service;

import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.application.mapper.GrammarEntryMapper;
import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import net.phrasal.infrastructure.exception.GrammarEntryNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class GrammarEntryServiceTest {

    @Mock
    private GrammarEntryRepository repository;

    @Mock
    private GrammarEntryMapper mapper;

    @InjectMocks
    private GrammarEntryService service;

    private GrammarEntry entity;
    private GrammarEntryResponse response;
    private GrammarEntryRequest request;

    @BeforeEach
    void setUp() {
        entity = new GrammarEntry("i-wish", "Test sentence", List.of("Answer"));
        entity.setId(1L);

        response = new GrammarEntryResponse();
        response.setId(1L);
        response.setCategory("i-wish");

        request = new GrammarEntryRequest();
        request.setCategory("i-wish");
        request.setSentence("Test sentence");
        request.setCorrectAnswers(List.of("Answer"));
    }

    @Test
    void getAll_returnsPageOfEntries() {
        Page<GrammarEntry> page = new PageImpl<>(List.of(entity));
        when(repository.search(any(), any(Pageable.class))).thenReturn(page);
        when(mapper.toResponse(entity)).thenReturn(response);

        Page<GrammarEntryResponse> result = service.getAll(null, PageRequest.of(0, 20, Sort.by("category")));

        assertThat(result.getContent()).hasSize(1);
    }

    @Test
    void getAll_sanitizesInvalidSortField() {
        Page<GrammarEntry> page = new PageImpl<>(List.of(entity));
        when(repository.search(any(), any(Pageable.class))).thenReturn(page);
        when(mapper.toResponse(entity)).thenReturn(response);

        service.getAll(null, PageRequest.of(0, 20, Sort.by("invalidField")));

        verify(repository).search(any(), argThat(p ->
            p.getSort().getOrderFor("category") != null
        ));
    }

    @Test
    void getById_returnsEntryWhenFound() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.getById(1L);

        assertThat(result.getCategory()).isEqualTo("i-wish");
    }

    @Test
    void getById_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }

    @Test
    void create_savesAndReturnsEntry() {
        when(mapper.toEntity(request)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.create(request);

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository).save(entity);
    }

    @Test
    void update_updatesExistingEntry() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.update(1L, request);

        assertThat(result).isNotNull();
        verify(mapper).updateEntityFromRequest(request, entity);
    }

    @Test
    void update_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(99L, request))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }

    @Test
    void delete_removesEntry() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void delete_throwsWhenNotFound() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }
}
