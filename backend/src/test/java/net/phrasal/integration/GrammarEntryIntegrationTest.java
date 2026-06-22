package net.phrasal.integration;

import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
class GrammarEntryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("phrasaldb_test")
            .withUsername("test")
            .withPassword("test");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GrammarEntryRepository repository;

    @Test
    void shouldReturnSeededEntriesOnGetAll() throws Exception {
        mockMvc.perform(get("/api/grammar-entries"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements", greaterThanOrEqualTo(3)));
    }

    @Test
    void shouldFilterByCategory() throws Exception {
        mockMvc.perform(get("/api/grammar-entries")
                        .param("category", "i-wish-if-only"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThanOrEqualTo(3))));
    }

    @Test
    void shouldReturnEntryById() throws Exception {
        GrammarEntry entry = repository.findAll().get(0);

        mockMvc.perform(get("/api/grammar-entries/{id}", entry.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value(entry.getCategory()))
                .andExpect(jsonPath("$.sentence").value(entry.getSentence()));
    }

    @Test
    void shouldReturn404ForNonExistentEntry() throws Exception {
        mockMvc.perform(get("/api/grammar-entries/{id}", 99999))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Grammar Entry Not Found"));
    }

    @Test
    void shouldCreateNewEntry() throws Exception {
        String json = """
                {
                    "category": "test-category",
                    "sentence": "Test sentence",
                    "correctAnswers": ["Answer one", "Answer two"]
                }
                """;

        mockMvc.perform(post("/api/grammar-entries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.category").value("test-category"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    void shouldUpdateExistingEntry() throws Exception {
        GrammarEntry entry = repository.findAll().get(0);

        String json = """
                {
                    "category": "updated-category",
                    "sentence": "Updated sentence",
                    "correctAnswers": ["New answer"]
                }
                """;

        mockMvc.perform(put("/api/grammar-entries/{id}", entry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value("updated-category"));
    }

    @Test
    void shouldDeleteEntry() throws Exception {
        GrammarEntry entry = new GrammarEntry("delete-me", "To delete", List.of("answer"));
        entry = repository.save(entry);

        mockMvc.perform(delete("/api/grammar-entries/{id}", entry.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/grammar-entries/{id}", entry.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturn400ForInvalidRequest() throws Exception {
        String json = """
                {
                    "category": "",
                    "sentence": "",
                    "correctAnswers": null
                }
                """;

        mockMvc.perform(post("/api/grammar-entries")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
