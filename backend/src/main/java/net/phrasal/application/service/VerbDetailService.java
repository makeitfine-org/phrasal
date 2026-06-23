package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.application.mapper.VerbDetailMapper;
import net.phrasal.application.util.PageableUtils;
import net.phrasal.domain.entity.VerbDetail;
import net.phrasal.domain.repository.VerbDetailRepository;
import net.phrasal.infrastructure.exception.VerbDetailNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class VerbDetailService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("verb", "label", "createdAt");

    private final VerbDetailRepository repository;
    private final VerbDetailMapper mapper;

    public Page<VerbDetailSummaryResponse> getAll(Pageable pageable) {
        Pageable safe = PageableUtils.sanitize(pageable, ALLOWED_SORT_FIELDS, "verb");
        return repository.findAll(safe).map(mapper::toSummaryResponse);
    }

    public List<VerbDetailResponse> getAllFull() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "verb")).stream()
                .map(mapper::toResponse)
                .toList();
    }

    public VerbDetailResponse getByVerb(String verb) {
        VerbDetail entity = repository.findByVerb(verb)
                .orElseThrow(() -> new VerbDetailNotFoundException(verb));
        return mapper.toResponse(entity);
    }

    public VerbDetailResponse getById(Long id) {
        VerbDetail entity = repository.findById(id)
                .orElseThrow(() -> new VerbDetailNotFoundException(id));
        return mapper.toResponse(entity);
    }

    @Transactional
    public VerbDetailResponse create(VerbDetailRequest request) {
        VerbDetail entity = mapper.toEntity(request);
        VerbDetail saved = repository.save(entity);
        log.info("Created verb detail id={} verb='{}'", saved.getId(), saved.getVerb());
        return mapper.toResponse(saved);
    }

    @Transactional
    public VerbDetailResponse update(Long id, VerbDetailRequest request) {
        VerbDetail entity = repository.findById(id)
                .orElseThrow(() -> new VerbDetailNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        VerbDetail updated = repository.save(entity);
        log.info("Updated verb detail id={}", id);
        return mapper.toResponse(updated);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new VerbDetailNotFoundException(id);
        }
        repository.deleteById(id);
        log.info("Deleted verb detail id={}", id);
    }
}
