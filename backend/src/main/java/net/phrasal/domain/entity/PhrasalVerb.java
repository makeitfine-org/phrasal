package net.phrasal.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "phrasal_verbs", indexes = {
        @Index(name = "idx_phrasal_verbs_verb", columnList = "verb"),
        @Index(name = "idx_phrasal_verbs_is_learned", columnList = "is_learned")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString(of = {"id", "verb", "isLearned"})
@EqualsAndHashCode(of = {"id", "verb"})
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

    public PhrasalVerb(String verb, String definition, List<String> sentences, List<String> wordsToHide) {
        this.verb = verb;
        this.definition = definition;
        this.sentences = sentences;
        this.wordsToHide = wordsToHide;
    }
}
