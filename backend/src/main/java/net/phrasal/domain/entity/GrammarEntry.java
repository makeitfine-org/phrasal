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
@Table(name = "grammar_entries", indexes = {
    @Index(name = "idx_grammar_entries_category", columnList = "category")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString(of = {"id", "category"})
@EqualsAndHashCode(of = {"id"})
public class GrammarEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "grammar_entry_seq")
    @SequenceGenerator(
        name = "grammar_entry_seq",
        sequenceName = "grammar_entries_id_seq",
        allocationSize = 1
    )
    private Long id;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String sentence;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "correct_answers", nullable = false, columnDefinition = "jsonb")
    private List<String> correctAnswers;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    public GrammarEntry(String category, String sentence, List<String> correctAnswers) {
        this.category = category;
        this.sentence = sentence;
        this.correctAnswers = correctAnswers;
    }
}
