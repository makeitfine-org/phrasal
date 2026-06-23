package net.phrasal.application.service;

import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.application.mapper.GrammarEntryMapper;
import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import net.phrasal.infrastructure.exception.GrammarEntryNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("GrammarEntryService")
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

        response = new GrammarEntryResponse(1L, "i-wish", "Test sentence",
                List.of("Answer"), null, null, 0L);

        request = new GrammarEntryRequest("i-wish", "Test sentence", List.of("Answer"));
    }

    @Test
    @DisplayName("getAll returns page of entries")
    void getAll_returnsPageOfEntries() {
        Page<GrammarEntry> page = new PageImpl<>(List.of(entity));
        when(repository.search(any(), any(Pageable.class))).thenReturn(page);
        when(mapper.toResponse(entity)).thenReturn(response);

        Page<GrammarEntryResponse> result = service.getAll(null, PageRequest.of(0, 20, Sort.by("category")));

        assertThat(result.getContent()).hasSize(1);
    }

    @Test
    @DisplayName("getAll sanitizes invalid sort fields")
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
    @DisplayName("getById returns entry when found")
    void getById_returnsEntryWhenFound() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.getById(1L);

        assertThat(result.category()).isEqualTo("i-wish");
    }

    @Test
    @DisplayName("getById throws when not found")
    void getById_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }

    @Test
    @DisplayName("create saves and returns entry")
    void create_savesAndReturnsEntry() {
        when(mapper.toEntity(request)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.create(request);

        assertThat(result.id()).isEqualTo(1L);
        verify(repository).save(entity);
    }

    @Test
    @DisplayName("update modifies existing entry")
    void update_updatesExistingEntry() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        GrammarEntryResponse result = service.update(1L, request);

        assertThat(result).isNotNull();
        verify(mapper).updateEntityFromRequest(request, entity);
    }

    @Test
    @DisplayName("update throws when not found")
    void update_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(99L, request))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }

    @Test
    @DisplayName("delete removes entry")
    void delete_removesEntry() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    @DisplayName("delete throws when not found")
    void delete_throwsWhenNotFound() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(GrammarEntryNotFoundException.class);
    }
}
