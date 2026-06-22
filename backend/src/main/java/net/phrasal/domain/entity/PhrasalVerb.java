package net.phrasal.domain.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "phrasal_verbs", indexes = {
    @Index(name = "idx_phrasal_verbs_verb", columnList = "verb"),
    @Index(name = "idx_phrasal_verbs_is_learned", columnList = "is_learned")
})
@EntityListeners(AuditingEntityListener.class)
public class PhrasalVerb {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "phrasal_verb_seq")
    @SequenceGenerator(
        name = "phrasal_verb_seq",
        sequenceName = "phrasal_verbs_id_seq",
        allocationSize = 1
    )
    private Long id;

    @Column(nullable = false, length = 100)
    private String verb;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String definition;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private List<String> sentences;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "words_to_hide", nullable = false, columnDefinition = "jsonb")
    private List<String> wordsToHide;

    @Column(name = "is_learned", nullable = false)
    private Boolean isLearned = false;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    public PhrasalVerb() {
    }

    public PhrasalVerb(String verb, String definition, List<String> sentences, List<String> wordsToHide) {
        this.verb = verb;
        this.definition = definition;
        this.sentences = sentences;
        this.wordsToHide = wordsToHide;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVerb() {
        return verb;
    }

    public void setVerb(String verb) {
        this.verb = verb;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public List<String> getSentences() {
        return sentences;
    }

    public void setSentences(List<String> sentences) {
        this.sentences = sentences;
    }

    public List<String> getWordsToHide() {
        return wordsToHide;
    }

    public void setWordsToHide(List<String> wordsToHide) {
        this.wordsToHide = wordsToHide;
    }

    public Boolean getIsLearned() {
        return isLearned;
    }

    public void setIsLearned(Boolean isLearned) {
        this.isLearned = isLearned;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PhrasalVerb that = (PhrasalVerb) o;
        return Objects.equals(id, that.id) && Objects.equals(verb, that.verb);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, verb);
    }

    @Override
    public String toString() {
        return "PhrasalVerb{" +
                "id=" + id +
                ", verb='" + verb + '\'' +
                ", isLearned=" + isLearned +
                '}';
    }
}
