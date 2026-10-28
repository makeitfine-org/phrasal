package net.phrasal.domain.repository;

import net.phrasal.domain.entity.QuizKey;
import net.phrasal.domain.entity.UserQuizProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserQuizProgressRepository extends JpaRepository<UserQuizProgress, Long> {

    Optional<UserQuizProgress> findByUserIdAndQuizKey(Long userId, QuizKey quizKey);

    // Atomic insert-or-replace of one user's state; bumps version and updated_at on conflict.
    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query(nativeQuery = true, value = """
            INSERT INTO user_quiz_progress (user_id, quiz_key, state)
            VALUES (:userId, :quizKey, CAST(:state AS jsonb))
            ON CONFLICT (user_id, quiz_key) DO UPDATE
            SET state = EXCLUDED.state,
                version = user_quiz_progress.version + 1,
                updated_at = CURRENT_TIMESTAMP
            """)
    int upsert(@Param("userId") Long userId, @Param("quizKey") String quizKey, @Param("state") String stateJson);
}
