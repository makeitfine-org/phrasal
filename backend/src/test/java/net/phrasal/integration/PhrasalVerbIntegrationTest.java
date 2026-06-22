package net.phrasal.integration;

import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
import org.junit.jupiter.api.BeforeEach;
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
class PhrasalVerbIntegrationTest {

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
    void shouldReturnSeededVerbsOnGetAll() throws Exception {
        mockMvc.perform(get("/api/phrasal-verbs")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content", hasSize(5)))
                .andExpect(jsonPath("$.totalElements", greaterThan(0)));
    }

    @Test
    void shouldReturnVerbById() throws Exception {
        PhrasalVerb verb = repository.findAll().get(0);

        mockMvc.perform(get("/api/phrasal-verbs/{id}", verb.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.verb").value(verb.getVerb()))
                .andExpect(jsonPath("$.definition").value(verb.getDefinition()));
    }

    @Test
    void shouldReturn404ForNonExistentVerb() throws Exception {
        mockMvc.perform(get("/api/phrasal-verbs/{id}", 99999))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Phrasal Verb Not Found"));
    }

    @Test
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

        mockMvc.perform(post("/api/phrasal-verbs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.verb").value("Test out"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
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

        mockMvc.perform(put("/api/phrasal-verbs/{id}", verb.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.definition").value("Updated definition"))
                .andExpect(jsonPath("$.isLearned").value(true));
    }

    @Test
    void shouldDeleteVerb() throws Exception {
        PhrasalVerb verb = new PhrasalVerb("Delete me", "To be deleted", List.of("Delete this."), List.of("delete"));
        verb = repository.save(verb);

        mockMvc.perform(delete("/api/phrasal-verbs/{id}", verb.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/api/phrasal-verbs/{id}", verb.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldSearchByQuery() throws Exception {
        mockMvc.perform(get("/api/phrasal-verbs")
                        .param("q", "break")
                        .param("size", "50"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThan(0))));
    }

    @Test
    void shouldFilterByLearned() throws Exception {
        mockMvc.perform(get("/api/phrasal-verbs")
                        .param("learned", "false")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].isLearned").value(false));
    }

    @Test
    void shouldReturn400ForInvalidRequest() throws Exception {
        String json = """
                {
                    "verb": "",
                    "definition": "",
                    "sentences": null,
                    "wordsToHide": null
                }
                """;

        mockMvc.perform(post("/api/phrasal-verbs")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
