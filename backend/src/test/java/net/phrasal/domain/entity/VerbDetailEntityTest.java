package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("VerbDetail Entity")
class VerbDetailEntityTest {

    private VerbDetailMeaning meaning() {
        return new VerbDetailMeaning("To take action", "He acted on it.", "images/default.png", "alt");
    }

    private VerbDetailSection section() {
        return new VerbDetailSection("on", "actOn", List.of(meaning()));
    }

    @Test
    @DisplayName("constructor sets fields")
    void constructorAndGetters() {
        VerbDetail entity = new VerbDetail("act", "Act", List.of("on", "up"), List.of(section()));

        assertThat(entity.getVerb()).isEqualTo("act");
        assertThat(entity.getLabel()).isEqualTo("Act");
        assertThat(entity.getParticles()).containsExactly("on", "up");
        assertThat(entity.getSections()).hasSize(1);
        assertThat(entity.getSections().get(0).particle()).isEqualTo("on");
    }

    @Test
    @DisplayName("setters update all fields")
    void setters() {
        VerbDetail entity = new VerbDetail();
        entity.setId(1L);
        entity.setVerb("go");
        entity.setLabel("Go");
        entity.setParticles(List.of("off", "on"));
        entity.setSections(List.of(section()));
        entity.setVersion(1L);

        assertThat(entity.getId()).isEqualTo(1L);
        assertThat(entity.getVerb()).isEqualTo("go");
        assertThat(entity.getLabel()).isEqualTo("Go");
        assertThat(entity.getParticles()).containsExactly("off", "on");
        assertThat(entity.getVersion()).isEqualTo(1L);
    }

    @Test
    @DisplayName("equals and hashCode use id and verb")
    void equalsAndHashCode() {
        VerbDetail a = new VerbDetail();
        a.setId(1L);
        a.setVerb("act");

        VerbDetail b = new VerbDetail();
        b.setId(1L);
        b.setVerb("act");

        assertThat(a).isEqualTo(b);
        assertThat(a.hashCode()).isEqualTo(b.hashCode());
    }

    @Test
    @DisplayName("toString includes verb and label")
    void toStringContainsVerb() {
        VerbDetail entity = new VerbDetail();
        entity.setVerb("act");
        entity.setLabel("Act");
        assertThat(entity.toString()).contains("act");
        assertThat(entity.toString()).contains("Act");
    }

    @Test
    @DisplayName("VerbDetailSection record fields")
    void sectionRecord() {
        VerbDetailSection s = section();
        assertThat(s.particle()).isEqualTo("on");
        assertThat(s.storageKeyPrefix()).isEqualTo("actOn");
        assertThat(s.meanings()).hasSize(1);
    }

    @Test
    @DisplayName("VerbDetailMeaning record fields")
    void meaningRecord() {
        VerbDetailMeaning m = meaning();
        assertThat(m.definition()).isEqualTo("To take action");
        assertThat(m.example()).isEqualTo("He acted on it.");
        assertThat(m.imageSrc()).isEqualTo("images/default.png");
        assertThat(m.imageAlt()).isEqualTo("alt");
    }
}
