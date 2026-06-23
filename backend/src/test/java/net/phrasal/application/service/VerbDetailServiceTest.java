package net.phrasal.application.service;

import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.application.mapper.VerbDetailMapper;
import net.phrasal.domain.entity.VerbDetail;
import net.phrasal.domain.entity.VerbDetailMeaning;
import net.phrasal.domain.entity.VerbDetailSection;
import net.phrasal.domain.repository.VerbDetailRepository;
import net.phrasal.infrastructure.exception.VerbDetailNotFoundException;
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
@DisplayName("VerbDetailService")
class VerbDetailServiceTest {

    @Mock
    private VerbDetailRepository repository;

    @Mock
    private VerbDetailMapper mapper;

    @InjectMocks
    private VerbDetailService service;

    private VerbDetail entity;
    private VerbDetailResponse response;
    private VerbDetailSummaryResponse summaryResponse;
    private VerbDetailRequest request;

    @BeforeEach
    void setUp() {
        VerbDetailMeaning meaning = new VerbDetailMeaning("def", "ex", "img.png", "alt");
        VerbDetailSection section = new VerbDetailSection("on", "actOn", List.of(meaning));

        entity = new VerbDetail("act", "Act", List.of("on", "up"), List.of(section));
        entity.setId(1L);

        response = new VerbDetailResponse(1L, "act", "Act",
                List.of("on", "up"), List.of(section), null, null, 0L);

        summaryResponse = new VerbDetailSummaryResponse(1L, "act", "Act", List.of("on", "up"));

        request = new VerbDetailRequest("act", "Act", List.of("on", "up"), List.of(section));
    }

    @Test
    @DisplayName("getAll returns page of summaries")
    void getAll_returnsPage() {
        Page<VerbDetail> page = new PageImpl<>(List.of(entity));
        when(repository.findAll(any(Pageable.class))).thenReturn(page);
        when(mapper.toSummaryResponse(entity)).thenReturn(summaryResponse);

        Page<VerbDetailSummaryResponse> result = service.getAll(PageRequest.of(0, 100, Sort.by("verb")));

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).verb()).isEqualTo("act");
    }

    @Test
    @DisplayName("getAll sanitizes invalid sort fields")
    void getAll_sanitizesInvalidSortField() {
        Page<VerbDetail> page = new PageImpl<>(List.of(entity));
        when(repository.findAll(any(Pageable.class))).thenReturn(page);
        when(mapper.toSummaryResponse(entity)).thenReturn(summaryResponse);

        service.getAll(PageRequest.of(0, 100, Sort.by("invalidField")));

        verify(repository).findAll(argThat((Pageable p) ->
                p.getSort().getOrderFor("verb") != null
        ));
    }

    @Test
    @DisplayName("getByVerb returns detail when found")
    void getByVerb_returnsWhenFound() {
        when(repository.findByVerb("act")).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        VerbDetailResponse result = service.getByVerb("act");

        assertThat(result.verb()).isEqualTo("act");
    }

    @Test
    @DisplayName("getByVerb throws when not found")
    void getByVerb_throwsWhenNotFound() {
        when(repository.findByVerb("xyz")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getByVerb("xyz"))
                .isInstanceOf(VerbDetailNotFoundException.class);
    }

    @Test
    @DisplayName("getById returns detail when found")
    void getById_returnsWhenFound() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(mapper.toResponse(entity)).thenReturn(response);

        VerbDetailResponse result = service.getById(1L);

        assertThat(result.verb()).isEqualTo("act");
    }

    @Test
    @DisplayName("getById throws when not found")
    void getById_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.getById(99L))
                .isInstanceOf(VerbDetailNotFoundException.class);
    }

    @Test
    @DisplayName("create saves and returns detail")
    void create_savesAndReturns() {
        when(mapper.toEntity(request)).thenReturn(entity);
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        VerbDetailResponse result = service.create(request);

        assertThat(result.id()).isEqualTo(1L);
        verify(repository).save(entity);
    }

    @Test
    @DisplayName("update modifies existing detail")
    void update_updatesExisting() {
        when(repository.findById(1L)).thenReturn(Optional.of(entity));
        when(repository.save(entity)).thenReturn(entity);
        when(mapper.toResponse(entity)).thenReturn(response);

        VerbDetailResponse result = service.update(1L, request);

        assertThat(result).isNotNull();
        verify(mapper).updateEntityFromRequest(request, entity);
    }

    @Test
    @DisplayName("update throws when not found")
    void update_throwsWhenNotFound() {
        when(repository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.update(99L, request))
                .isInstanceOf(VerbDetailNotFoundException.class);
    }

    @Test
    @DisplayName("delete removes detail")
    void delete_removesDetail() {
        when(repository.existsById(1L)).thenReturn(true);

        service.delete(1L);

        verify(repository).deleteById(1L);
    }

    @Test
    @DisplayName("delete throws when not found")
    void delete_throwsWhenNotFound() {
        when(repository.existsById(99L)).thenReturn(false);

        assertThatThrownBy(() -> service.delete(99L))
                .isInstanceOf(VerbDetailNotFoundException.class);
    }
}
