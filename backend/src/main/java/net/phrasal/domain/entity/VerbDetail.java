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
@Table(name = "verb_details", indexes = {
        @Index(name = "idx_verb_details_verb", columnList = "verb")
})
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString(of = {"id", "verb", "label"})
@EqualsAndHashCode(of = {"id", "verb"})
public class VerbDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "verb_detail_seq")
    @SequenceGenerator(
            name = "verb_detail_seq",
            sequenceName = "verb_details_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String verb;

    @Column(nullable = false, length = 50)
    private String label;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private List<String> particles;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private List<VerbDetailSection> sections;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    public VerbDetail(String verb, String label, List<String> particles, List<VerbDetailSection> sections) {
        this.verb = verb;
        this.label = label;
        this.particles = particles;
        this.sections = sections;
    }
}
