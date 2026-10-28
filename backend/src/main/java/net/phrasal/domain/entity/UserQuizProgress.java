package net.phrasal.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
import java.util.Map;

@Entity
@Table(name = "user_quiz_progress")
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor
@ToString(of = {"id", "userId", "quizKey", "version"})
@EqualsAndHashCode(of = {"id"})
public class UserQuizProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_quiz_progress_seq")
    @SequenceGenerator(
            name = "user_quiz_progress_seq",
            sequenceName = "user_quiz_progress_id_seq",
            allocationSize = 1
    )
    private Long id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private Long userId;

    @Convert(converter = QuizKeyConverter.class)
    @Column(name = "quiz_key", nullable = false, updatable = false)
    private QuizKey quizKey;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(nullable = false, columnDefinition = "jsonb")
    private Map<String, Object> state;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Version
    private Long version;

    public UserQuizProgress(Long userId, QuizKey quizKey, Map<String, Object> state) {
        this.userId = userId;
        this.quizKey = quizKey;
        this.state = state;
    }
}
