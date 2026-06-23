package net.phrasal.presentation.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.VerbDetailRequest;
import net.phrasal.application.dto.VerbDetailResponse;
import net.phrasal.application.dto.VerbDetailSummaryResponse;
import net.phrasal.application.service.VerbDetailService;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/verb-details")
@RequiredArgsConstructor
@Validated
public class VerbDetailController {

    private final VerbDetailService service;

    @GetMapping
    public ResponseEntity<Page<VerbDetailSummaryResponse>> getAll(
            @PageableDefault(size = 100, sort = "verb", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        Page<VerbDetailSummaryResponse> response = service.getAll(pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/all")
    public ResponseEntity<List<VerbDetailResponse>> getAll() {
        List<VerbDetailResponse> response = service.getAllFull();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/by-verb/{verb}")
    public ResponseEntity<VerbDetailResponse> getByVerb(@PathVariable String verb) {
        VerbDetailResponse response = service.getByVerb(verb);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VerbDetailResponse> getById(@PathVariable Long id) {
        VerbDetailResponse response = service.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<VerbDetailResponse> create(@Valid @RequestBody VerbDetailRequest request) {
        VerbDetailResponse response = service.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<VerbDetailResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody VerbDetailRequest request
    ) {
        VerbDetailResponse response = service.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
