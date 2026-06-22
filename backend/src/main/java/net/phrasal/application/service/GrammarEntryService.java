package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.application.mapper.GrammarEntryMapper;
import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import net.phrasal.infrastructure.exception.GrammarEntryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
@RequiredArgsConstructor
public class GrammarEntryService {

    private static final Logger log = LoggerFactory.getLogger(GrammarEntryService.class);
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("category", "sentence", "createdAt");

    private final GrammarEntryRepository repository;
    private final GrammarEntryMapper mapper;

    private Pageable sanitize(Pageable pageable) {
        Sort filtered = Sort.by(
            pageable.getSort().stream()
                .filter(o -> ALLOWED_SORT_FIELDS.contains(o.getProperty()))
                .toList()
        );
        if (filtered.isUnsorted()) {
            filtered = Sort.by(Sort.Direction.ASC, "category");
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), filtered);
    }

    @Transactional(readOnly = true)
    public Page<GrammarEntryResponse> getAll(String category, Pageable pageable) {
        Pageable safe = sanitize(pageable);
        return repository.search(category, safe).map(mapper::toResponse);
    }

    @Transactional(readOnly = true)
    public GrammarEntryResponse getById(Long id) {
        GrammarEntry entity = repository.findById(id)
                .orElseThrow(() -> new GrammarEntryNotFoundException(id));
        return mapper.toResponse(entity);
    }

    public GrammarEntryResponse create(GrammarEntryRequest request) {
        GrammarEntry entity = mapper.toEntity(request);
        GrammarEntry saved = repository.save(entity);
        log.info("Created grammar entry id={} category='{}'", saved.getId(), saved.getCategory());
        return mapper.toResponse(saved);
    }

    public GrammarEntryResponse update(Long id, GrammarEntryRequest request) {
        GrammarEntry entity = repository.findById(id)
                .orElseThrow(() -> new GrammarEntryNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        GrammarEntry updated = repository.save(entity);
        log.info("Updated grammar entry id={}", id);
        return mapper.toResponse(updated);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new GrammarEntryNotFoundException(id);
        }
        repository.deleteById(id);
        log.info("Deleted grammar entry id={}", id);
    }
}
