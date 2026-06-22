package net.phrasal.presentation.rest;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import net.phrasal.application.dto.GrammarEntryRequest;
import net.phrasal.application.dto.GrammarEntryResponse;
import net.phrasal.application.service.GrammarEntryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/grammar-entries")
@RequiredArgsConstructor
@Validated
public class GrammarEntryController {

    private final GrammarEntryService service;

    @GetMapping
    public ResponseEntity<Page<GrammarEntryResponse>> getAll(
            @RequestParam(required = false) String category,
            @PageableDefault(size = 20, sort = "category", direction = Sort.Direction.ASC) Pageable pageable
    ) {
        Page<GrammarEntryResponse> response = service.getAll(category, pageable);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GrammarEntryResponse> getById(@PathVariable Long id) {
        GrammarEntryResponse response = service.getById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<GrammarEntryResponse> create(@Valid @RequestBody GrammarEntryRequest request) {
        GrammarEntryResponse response = service.create(request);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(response.id())
                .toUri();
        return ResponseEntity.created(location).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<GrammarEntryResponse> update(
            @PathVariable Long id,
            @Valid @RequestBody GrammarEntryRequest request
    ) {
        GrammarEntryResponse response = service.update(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
