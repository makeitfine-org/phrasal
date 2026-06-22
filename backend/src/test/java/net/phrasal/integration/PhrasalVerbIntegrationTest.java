package net.phrasal.integration;

import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
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

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
@ActiveProfiles("test")
@DisplayName("Phrasal Verbs API Integration")
class PhrasalVerbIntegrationTest {

    private static final String BASE_URL = "/api/v1/phrasal-verbs";

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
    private PhrasalVerbRepository repository;

    @Test
    @DisplayName("GET / returns paginated seeded verbs")
    void shouldReturnSeededVerbsOnGetAll() throws Exception {
        mockMvc.perform(get(BASE_URL).param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content", hasSize(5)))
                .andExpect(jsonPath("$.totalElements", greaterThan(0)));
    }

    @Test
    @DisplayName("GET /{id} returns verb by id")
    void shouldReturnVerbById() throws Exception {
        PhrasalVerb verb = repository.findAll().get(0);

        mockMvc.perform(get(BASE_URL + "/{id}", verb.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.verb").value(verb.getVerb()))
                .andExpect(jsonPath("$.definition").value(verb.getDefinition()));
    }

    @Test
    @DisplayName("GET /{id} returns 404 for non-existent verb")
    void shouldReturn404ForNonExistentVerb() throws Exception {
        mockMvc.perform(get(BASE_URL + "/{id}", 99999))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Phrasal Verb Not Found"));
    }

    @Test
    @DisplayName("POST / creates verb and returns 201 with Location header")
    void shouldCreateNewVerb() throws Exception {
        String json = """
                {
                    "verb": "Test out",
                    "definition": "To try something",
                    "sentences": ["Let me test out this feature."],
                    "wordsToHide": ["test out"],
                    "isLearned": false
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.verb").value("Test out"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    @DisplayName("PUT /{id} updates existing verb")
    void shouldUpdateExistingVerb() throws Exception {
        PhrasalVerb verb = repository.findAll().get(0);

        String json = """
                {
                    "verb": "%s",
                    "definition": "Updated definition",
                    "sentences": ["Updated sentence."],
                    "wordsToHide": ["updated"],
                    "isLearned": true
                }
                """.formatted(verb.getVerb());

        mockMvc.perform(put(BASE_URL + "/{id}", verb.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.definition").value("Updated definition"))
                .andExpect(jsonPath("$.isLearned").value(true));
    }

    @Test
    @DisplayName("DELETE /{id} removes verb")
    void shouldDeleteVerb() throws Exception {
        PhrasalVerb verb = new PhrasalVerb("Delete me", "To be deleted", List.of("Delete this."), List.of("delete"));
        verb = repository.save(verb);

        mockMvc.perform(delete(BASE_URL + "/{id}", verb.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get(BASE_URL + "/{id}", verb.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("GET /?q= filters by search query")
    void shouldSearchByQuery() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .param("q", "break")
                        .param("size", "50"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThan(0))));
    }

    @Test
    @DisplayName("GET /?learned= filters by learned status")
    void shouldFilterByLearned() throws Exception {
        mockMvc.perform(get(BASE_URL)
                        .param("learned", "false")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].isLearned").value(false));
    }

    @Test
    @DisplayName("POST / returns 400 for invalid request body")
    void shouldReturn400ForInvalidRequest() throws Exception {
        String json = """
                {
                    "verb": "",
                    "definition": "",
                    "sentences": null,
                    "wordsToHide": null
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
