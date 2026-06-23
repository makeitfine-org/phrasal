package net.phrasal.integration;

import net.phrasal.domain.entity.VerbDetail;
import net.phrasal.domain.entity.VerbDetailMeaning;
import net.phrasal.domain.entity.VerbDetailSection;
import net.phrasal.domain.repository.VerbDetailRepository;
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
@DisplayName("Verb Details API Integration")
class VerbDetailIntegrationTest {

    private static final String BASE_URL = "/api/v1/verb-details";

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
    private VerbDetailRepository repository;

    @Test
    @DisplayName("GET / returns paginated seeded verb details")
    void shouldReturnSeededVerbDetailsOnGetAll() throws Exception {
        mockMvc.perform(get(BASE_URL).param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.content", hasSize(5)))
                .andExpect(jsonPath("$.totalElements", greaterThanOrEqualTo(71)))
                .andExpect(jsonPath("$.content[0].verb").isString())
                .andExpect(jsonPath("$.content[0].particles").isArray())
                .andExpect(jsonPath("$.content[0].sections").doesNotExist());
    }

    @Test
    @DisplayName("GET /by-verb/{verb} returns full detail with sections")
    void shouldReturnVerbBySlug() throws Exception {
        mockMvc.perform(get(BASE_URL + "/by-verb/act"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.verb").value("act"))
                .andExpect(jsonPath("$.label").value("Act"))
                .andExpect(jsonPath("$.particles").isArray())
                .andExpect(jsonPath("$.sections").isArray())
                .andExpect(jsonPath("$.sections[0].particle").isString())
                .andExpect(jsonPath("$.sections[0].meanings").isArray())
                .andExpect(jsonPath("$.sections[0].meanings[0].definition").isString());
    }

    @Test
    @DisplayName("GET /by-verb/{verb} returns 404 for non-existent verb")
    void shouldReturn404ForNonExistentVerb() throws Exception {
        mockMvc.perform(get(BASE_URL + "/by-verb/nonexistent"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.title").value("Verb Detail Not Found"));
    }

    @Test
    @DisplayName("GET /{id} returns verb detail by id")
    void shouldReturnVerbById() throws Exception {
        VerbDetail detail = repository.findByVerb("act").orElseThrow();

        mockMvc.perform(get(BASE_URL + "/{id}", detail.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.verb").value("act"));
    }

    @Test
    @DisplayName("GET /{id} returns 404 for non-existent id")
    void shouldReturn404ForNonExistentId() throws Exception {
        mockMvc.perform(get(BASE_URL + "/{id}", 99999))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST / creates verb detail and returns 201")
    void shouldCreateNewVerbDetail() throws Exception {
        String json = """
                {
                    "verb": "test",
                    "label": "Test",
                    "particles": ["out", "up"],
                    "sections": [{
                        "particle": "out",
                        "storageKeyPrefix": "testOut",
                        "meanings": [{
                            "definition": "To try something",
                            "example": "Let me test out this feature.",
                            "imageSrc": "images/default.png",
                            "imageAlt": "Testing a feature"
                        }]
                    }]
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"))
                .andExpect(jsonPath("$.verb").value("test"))
                .andExpect(jsonPath("$.id").isNumber());
    }

    @Test
    @DisplayName("PUT /{id} updates existing verb detail")
    void shouldUpdateExistingVerbDetail() throws Exception {
        VerbDetailMeaning m = new VerbDetailMeaning("d", "e", "i.png", "a");
        VerbDetailSection s = new VerbDetailSection("x", "updX", List.of(m));
        VerbDetail toUpdate = new VerbDetail("updateme", "UpdateMe", List.of("x"), List.of(s));
        toUpdate = repository.save(toUpdate);

        String json = """
                {
                    "verb": "updateme",
                    "label": "UpdateMe Changed",
                    "particles": ["x"],
                    "sections": [{
                        "particle": "x",
                        "storageKeyPrefix": "updX",
                        "meanings": [{
                            "definition": "Updated definition",
                            "example": "Updated example.",
                            "imageSrc": "images/default.png",
                            "imageAlt": "Updated alt"
                        }]
                    }]
                }
                """;

        mockMvc.perform(put(BASE_URL + "/{id}", toUpdate.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.label").value("UpdateMe Changed"));
    }

    @Test
    @DisplayName("DELETE /{id} removes verb detail")
    void shouldDeleteVerbDetail() throws Exception {
        VerbDetailMeaning meaning = new VerbDetailMeaning("d", "e", "i.png", "a");
        VerbDetailSection section = new VerbDetailSection("x", "delX", List.of(meaning));
        VerbDetail toDelete = new VerbDetail("deleteme", "DeleteMe", List.of("x"), List.of(section));
        toDelete = repository.save(toDelete);

        mockMvc.perform(delete(BASE_URL + "/{id}", toDelete.getId()))
                .andExpect(status().isNoContent());

        mockMvc.perform(get(BASE_URL + "/{id}", toDelete.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DisplayName("POST / returns 400 for invalid request body")
    void shouldReturn400ForInvalidRequest() throws Exception {
        String json = """
                {
                    "verb": "",
                    "label": "",
                    "particles": null,
                    "sections": null
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
