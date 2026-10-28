package net.phrasal.domain.repository;

import net.phrasal.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    /**
     * Deletes accounts that never verified their email. The FK cascade removes tokens and progress.
     *
     * @param cutoff accounts created before this moment are deleted
     * @return number of deleted users
     */
    @Modifying
    @Query("DELETE FROM User u WHERE u.emailVerifiedAt IS NULL AND u.createdAt < :cutoff")
    int deleteUnverifiedCreatedBefore(LocalDateTime cutoff);
}
