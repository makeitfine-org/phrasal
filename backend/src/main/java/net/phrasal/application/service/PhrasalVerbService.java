package net.phrasal.application.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.application.mapper.PhrasalVerbMapper;
import net.phrasal.application.util.PageableUtils;
import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
import net.phrasal.infrastructure.exception.PhrasalVerbNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PhrasalVerbService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("verb", "definition", "isLearned", "createdAt");

    private final PhrasalVerbRepository repository;
    private final PhrasalVerbMapper mapper;

    public Page<PhrasalVerbResponse> getAll(String q, Boolean learned, Pageable pageable) {
        Pageable safe = PageableUtils.sanitize(pageable, ALLOWED_SORT_FIELDS, "verb");
        return repository.search(q, learned, safe).map(mapper::toResponse);
    }

    public PhrasalVerbResponse getById(Long id) {
        PhrasalVerb entity = repository.findById(id)
                .orElseThrow(() -> new PhrasalVerbNotFoundException(id));
        return mapper.toResponse(entity);
    }

    @Transactional
    public PhrasalVerbResponse create(PhrasalVerbRequest request) {
        PhrasalVerb entity = mapper.toEntity(request);
        PhrasalVerb saved = repository.save(entity);
        log.info("Created phrasal verb id={} verb='{}'", saved.getId(), saved.getVerb());
        return mapper.toResponse(saved);
    }

    @Transactional
    public PhrasalVerbResponse update(Long id, PhrasalVerbRequest request) {
        PhrasalVerb entity = repository.findById(id)
                .orElseThrow(() -> new PhrasalVerbNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        PhrasalVerb updated = repository.save(entity);
        log.info("Updated phrasal verb id={}", id);
        return mapper.toResponse(updated);
    }

    @Transactional
    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new PhrasalVerbNotFoundException(id);
        }
        repository.deleteById(id);
        log.info("Deleted phrasal verb id={}", id);
    }
}
