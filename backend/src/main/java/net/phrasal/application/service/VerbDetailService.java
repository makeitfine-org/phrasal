package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.application.mapper.VerbDetailMapper;
import net.phrasal.domain.entity.VerbDetail;
import net.phrasal.domain.repository.VerbDetailRepository;
import net.phrasal.infrastructure.exception.VerbDetailNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class VerbDetailService {

    private static final Logger LOG = LoggerFactory.getLogger(VerbDetailService.class);
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("verb", "label", "createdAt");

    private final VerbDetailRepository repository;
    private final VerbDetailMapper mapper;

    private Pageable sanitize(Pageable pageable) {
        Sort filtered = Sort.by(
            pageable.getSort().stream()
                .filter(o -> ALLOWED_SORT_FIELDS.contains(o.getProperty()))
                .toList()
        );
        if (filtered.isUnsorted()) {
            filtered = Sort.by(Sort.Direction.ASC, "verb");
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), filtered);
    }

    @Transactional(readOnly = true)
    public Page<VerbDetailSummaryResponse> getAll(Pageable pageable) {
        Pageable safe = sanitize(pageable);
        return repository.findAll(safe).map(mapper::toSummaryResponse);
    }

    @Transactional(readOnly = true)
    public List<VerbDetailResponse> getAllFull() {
        return repository.findAll(Sort.by(Sort.Direction.ASC, "verb")).stream()
                .map(mapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public VerbDetailResponse getByVerb(String verb) {
        VerbDetail entity = repository.findByVerb(verb)
                .orElseThrow(() -> new VerbDetailNotFoundException(verb));
        return mapper.toResponse(entity);
    }

    @Transactional(readOnly = true)
    public VerbDetailResponse getById(Long id) {
        VerbDetail entity = repository.findById(id)
                .orElseThrow(() -> new VerbDetailNotFoundException(id));
        return mapper.toResponse(entity);
    }

    public VerbDetailResponse create(VerbDetailRequest request) {
        VerbDetail entity = mapper.toEntity(request);
        VerbDetail saved = repository.save(entity);
        LOG.info("Created verb detail id={} verb='{}'", saved.getId(), saved.getVerb());
        return mapper.toResponse(saved);
    }

    public VerbDetailResponse update(Long id, VerbDetailRequest request) {
        VerbDetail entity = repository.findById(id)
                .orElseThrow(() -> new VerbDetailNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        VerbDetail updated = repository.save(entity);
        LOG.info("Updated verb detail id={}", id);
        return mapper.toResponse(updated);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new VerbDetailNotFoundException(id);
        }
        repository.deleteById(id);
        LOG.info("Deleted verb detail id={}", id);
    }
}
