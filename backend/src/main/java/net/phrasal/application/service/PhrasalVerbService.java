package net.phrasal.application.service;

import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.application.mapper.PhrasalVerbMapper;
import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
import net.phrasal.infrastructure.exception.PhrasalVerbNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@Transactional
public class PhrasalVerbService {

    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("verb", "definition", "isLearned", "createdAt");

    private final PhrasalVerbRepository repository;
    private final PhrasalVerbMapper mapper;

    public PhrasalVerbService(PhrasalVerbRepository repository, PhrasalVerbMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

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
    public Page<PhrasalVerbResponse> getAll(String q, Boolean learned, Pageable pageable) {
        Pageable safe = sanitize(pageable);
        return repository.search(q, learned, safe).map(mapper::toResponse);
    }

    @Transactional(readOnly = true)
    public PhrasalVerbResponse getById(Long id) {
        PhrasalVerb entity = repository.findById(id)
                .orElseThrow(() -> new PhrasalVerbNotFoundException(id));
        return mapper.toResponse(entity);
    }

    public PhrasalVerbResponse create(PhrasalVerbRequest request) {
        PhrasalVerb entity = mapper.toEntity(request);
        PhrasalVerb saved = repository.save(entity);
        return mapper.toResponse(saved);
    }

    public PhrasalVerbResponse update(Long id, PhrasalVerbRequest request) {
        PhrasalVerb entity = repository.findById(id)
                .orElseThrow(() -> new PhrasalVerbNotFoundException(id));
        mapper.updateEntityFromRequest(request, entity);
        PhrasalVerb updated = repository.save(entity);
        return mapper.toResponse(updated);
    }

    public void delete(Long id) {
        if (!repository.existsById(id)) {
            throw new PhrasalVerbNotFoundException(id);
        }
        repository.deleteById(id);
    }
}
