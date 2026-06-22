package net.phrasal.application.service;

import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.application.mapper.PhrasalVerbMapper;
import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
import net.phrasal.infrastructure.exception.PhrasalVerbNotFoundException;
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
class PhrasalVerbServiceTest {

    @Mock
    private PhrasalVerbRepository repository;

    @Mock
    private PhrasalVerbMapper mapper;

    @InjectMocks
    private PhrasalVerbService service;

    private PhrasalVerb entity;
    private PhrasalVerbResponse response;
    private PhrasalVerbRequest request;

    @BeforeEach
    void setUp() {
        entity = new PhrasalVerb("Break down", "To stop working", List.of("It broke down."), List.of("broke down"));
        entity.setId(1L);

        response = new PhrasalVerbResponse();
        response.setId(1L);
        response.setVerb("Break down");

        request = new PhrasalVerbRequest();
        request.setVerb("Break down");
        request.setDefinition("To stop working");
        request.setSentences(List.of("It broke down."));
        request.setWordsToHide(List.of("broke down"));
    }

    @Test
    void getAll_returnsPageOfVerbs() {
        Page<PhrasalVerb> page = new PageImpl<>(List.of(entity));
        when(repository.search(any(), any(), any(Pageable.class))).thenReturn(page);
        when(mapper.toResponse(entity)).thenReturn(response);

        Page<PhrasalVerbResponse> result = service.getAll(null, null, PageRequest.of(0, 20, Sort.by("verb")));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getVerb()).isEqualTo("Break down");
    }

    @Test
    void getAll_sanitizesInvalidSortField() {
        Page<PhrasalVerb> page = new PageImpl<>(List.of(entity));
        when(repository.search(any(), any(), any(Pageable.class))).thenReturn(page);
        when(mapper.toResponse(entity)).thenReturn(response);

        service.getAll(null, null, PageRequest.of(0, 20, Sort.by("invalidField")));

        verify(repository).search(any(), any(), argThat(p ->
            p.getSort().getOrderFor("verb") != null
        ));
    }

    @Test
    void getById_returnsVerbWhenFound() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        PhrasalVerbResponse result = service.getById(1L);

        assertThat(result.getVerb()).isEqualTo("Break down");
    }

    @Test
    void getById_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(PhrasalVerbNotFoundException.class);
    }

    @Test
    void create_savesAndReturnsVerb() {
        when(mapper.toEntity(request)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        PhrasalVerbResponse result = service.create(request);

        assertThat(result.getId()).isEqualTo(1L);
        verify(repository).save(entity);
    }

    @Test
    void update_updatesExistingVerb() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        PhrasalVerbResponse result = service.update(1L, request);

        assertThat(result).isNotNull();
        verify(mapper).updateEntityFromRequest(request, entity);
    }

    @Test
    void update_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(99L, request))
                .isInstanceOf(PhrasalVerbNotFoundException.class);
    }

    @Test
    void delete_removesVerb() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    void delete_throwsWhenNotFound() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(PhrasalVerbNotFoundException.class);
    }
}
