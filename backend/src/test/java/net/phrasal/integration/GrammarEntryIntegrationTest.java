package net.phrasal.integration;

import net.phrasal.domain.entity.GrammarEntry;
import net.phrasal.domain.repository.GrammarEntryRepository;
import org.junit.jupiter.api.DisplayName;
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

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
@DisplayName("Grammar Entries API Integration")
class GrammarEntryIntegrationTest {

    private static final String BASE_URL = "/api/v1/grammar-entries";

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("phrasaldb_test")
            .withUsername("test")
            .withPassword("test");

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private GrammarEntryRepository repository;

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    @DisplayName("GET / returns paginated seeded entries")
    void shouldReturnSeededEntriesOnGetAll() throws Exception {
        mockMvc.perform(get(BASE_URL))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.totalElements", greaterThanOrEqualTo(3)));
    }

    @Test
    @DisplayName("GET /?category= filters by category")
    void shouldFilterByCategory() throws Exception {
        mockMvc.perform(get(BASE_URL).param("category", "i-wish-if-only"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThanOrEqualTo(3))));
    }

    @Test
    @DisplayName("GET /{id} returns entry by id")
    void shouldReturnEntryById() throws Exception {
        GrammarEntry entry = repository.findAll().get(0);

        mockMvc.perform(get(BASE_URL + "/{id}", entry.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value(entry.getCategory()))
                .andExpect(jsonPath("$.sentence").value(entry.getSentence()));
    }

    @Test
    @DisplayName("GET /{id} returns 404 for non-existent entry")
    void shouldReturn404ForNonExistentEntry() throws Exception {
        mockMvc.perform(get(BASE_URL + "/{id}", 99999))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Grammar Entry Not Found"));
    }

    @Test
    @DisplayName("POST / creates entry and returns 201 with Location header")
    void shouldCreateNewEntry() throws Exception {
        String json = """
                {
                    "category": "test-category",
                    "sentence": "Test sentence",
                    "correctAnswers": ["Answer one", "Answer two"]
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.category").value("test-category"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    @DisplayName("PUT /{id} updates existing entry")
    void shouldUpdateExistingEntry() throws Exception {
        GrammarEntry entry = repository.findAll().get(0);

        String json = """
                {
                    "category": "updated-category",
                    "sentence": "Updated sentence",
                    "correctAnswers": ["New answer"]
                }
                """;

        mockMvc.perform(put(BASE_URL + "/{id}", entry.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.category").value("updated-category"));
    }

    @Test
    @DisplayName("DELETE /{id} removes entry")
    void shouldDeleteEntry() throws Exception {
        GrammarEntry entry = new GrammarEntry("delete-me", "To delete", List.of("answer"));
        entry = repository.save(entry);

        mockMvc.perform(delete(BASE_URL + "/{id}", entry.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get(BASE_URL + "/{id}", entry.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST / returns 400 for invalid request body")
    void shouldReturn400ForInvalidRequest() throws Exception {
        String json = """
                {
                    "category": "",
                    "sentence": "",
                    "correctAnswers": null
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
