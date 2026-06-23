package net.phrasal.presentation.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.PhrasalVerbRequest;
import net.phrasal.application.dto.PhrasalVerbResponse;
import net.phrasal.application.service.PhrasalVerbService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/phrasal-verbs")
@RequiredArgsConstructor
@Validated
public class PhrasalVerbController {

    private final PhrasalVerbService service;

    @GetMapping
    public ResponseEntity<Page<PhrasalVerbResponse>> getAll(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) Boolean learned,
            @PageableDefault(size = 20, sort = "verb", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        Page<PhrasalVerbResponse> response = service.getAll(q, learned, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PhrasalVerbResponse> getById(@PathVariable Long id) {
        PhrasalVerbResponse response = service.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<PhrasalVerbResponse> create(@Valid @RequestBody PhrasalVerbRequest request) {
        PhrasalVerbResponse response = service.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PhrasalVerbResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody PhrasalVerbRequest request
    ) {
        PhrasalVerbResponse response = service.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
