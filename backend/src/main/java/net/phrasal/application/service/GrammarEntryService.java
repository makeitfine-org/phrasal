package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.application.mapper.GrammarEntryMapper;
import net.phrasal.application.util.PageableUtils;
import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import net.phrasal.infrastructure.exception.GrammarEntryNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class GrammarEntryService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("category", "sentence", "createdAt");

    private final GrammarEntryRepository repository;
    private final GrammarEntryMapper mapper;

    public Page<GrammarEntryResponse> getAll(String category, Pageable pageable) {
        Pageable safe = PageableUtils.sanitize(pageable, ALLOWED_SORT_FIELDS, "category");
        return repository.search(category, safe).map(mapper::toResponse);
    }

    public GrammarEntryResponse getById(Long id) {
        GrammarEntry entity = repository.findById(id)
                .orElseThrow(() -> new GrammarEntryNotFoundException(id));
        return mapper.toResponse(entity);
    }

    @Transactional
    public GrammarEntryResponse create(GrammarEntryRequest request) {
        GrammarEntry entity = mapper.toEntity(request);
        GrammarEntry saved = repository.save(entity);
        log.info("Created grammar entry id={} category='{}'", saved.getId(), saved.getCategory());
        return mapper.toResponse(saved);
    }

    @Transactional
    public GrammarEntryResponse update(Long id, GrammarEntryRequest request) {
        GrammarEntry entity = repository.findById(id)
                .orElseThrow(() -> new GrammarEntryNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        GrammarEntry updated = repository.save(entity);
        log.info("Updated grammar entry id={}", id);
        return mapper.toResponse(updated);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new GrammarEntryNotFoundException(id);
        }
        repository.deleteById(id);
        log.info("Deleted grammar entry id={}", id);
    }
}
