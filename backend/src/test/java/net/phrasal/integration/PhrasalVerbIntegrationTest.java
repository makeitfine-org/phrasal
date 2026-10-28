package net.phrasal.integration;

import com.jayway.jsonpath.JsonPath;
import net.phrasal.domain.entity.PhrasalVerb;
import net.phrasal.domain.repository.PhrasalVerbRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

import java.util.List;

import static org.hamcrest.Matchers.greaterThan;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Phrasal Verbs API Integration")
class PhrasalVerbIntegrationTest extends AbstractIntegrationTest {

    private static final String BASE_URL = "/api/v1/phrasal-verbs";

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
                    "wordsToHide": ["test out"]
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .with(adminWithCsrf())
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
                    "wordsToHide": ["updated"]
                }
                """.formatted(verb.getVerb());

        mockMvc.perform(put(BASE_URL + "/{id}", verb.getId())
                        .with(adminWithCsrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.definition").value("Updated definition"));
    }

    @Test
    @DisplayName("DELETE /{id} removes verb")
    void shouldDeleteVerb() throws Exception {
        PhrasalVerb verb = new PhrasalVerb("Delete me", "To be deleted", List.of("Delete this."), List.of("delete"));
        verb = repository.save(verb);

        mockMvc.perform(delete(BASE_URL + "/{id}", verb.getId()).with(adminWithCsrf()))
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
    @DisplayName("GET /?learned= is ignored: the removed filter no longer narrows results")
    void shouldIgnoreLegacyLearnedParam() throws Exception {
        long total = repository.count();

        mockMvc.perform(get(BASE_URL)
                        .param("learned", "true")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalElements").value(total));
    }

    @Test
    @DisplayName("GET /{id} no longer exposes isLearned")
    void shouldNotExposeIsLearned() throws Exception {
        PhrasalVerb verb = repository.findAll().get(0);

        mockMvc.perform(get(BASE_URL + "/{id}", verb.getId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isLearned").doesNotExist());
    }

    @Test
    @DisplayName("GET /?sort=isLearned falls back to the default sort by verb")
    void shouldIgnoreSortByIsLearned() throws Exception {
        String firstByVerb = mockMvc.perform(get(BASE_URL).param("size", "1").param("sort", "verb,asc"))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        String expectedVerb = JsonPath.read(firstByVerb, "$.content[0].verb");

        mockMvc.perform(get(BASE_URL).param("size", "1").param("sort", "isLearned,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].verb").value(expectedVerb));
    }

    @Test
    @DisplayName("POST / ignores a legacy isLearned field in the body")
    void shouldAcceptLegacyIsLearnedInBody() throws Exception {
        String json = """
                {
                    "verb": "Legacy out",
                    "definition": "Sent by an old client",
                    "sentences": ["The old client sent legacy out."],
                    "wordsToHide": ["legacy out"],
                    "isLearned": true
                }
                """;

        mockMvc.perform(post(BASE_URL)
                        .with(adminWithCsrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.verb").value("Legacy out"))
                .andExpect(jsonPath("$.isLearned").doesNotExist());
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
                        .with(adminWithCsrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Error"));
    }
}
