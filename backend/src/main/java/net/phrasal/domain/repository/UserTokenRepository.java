package net.phrasal.domain.repository;

import net.phrasal.domain.entity.TokenType;
import net.phrasal.domain.entity.UserToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UserTokenRepository extends JpaRepository<UserToken, Long> {

    Optional<UserToken> findByTokenHashAndType(String tokenHash, TokenType type);

    /**
     * Marks every unused token of the user and type as used, so only a newly issued token works.
     *
     * @param userId owner of the tokens
     * @param type   token purpose
     * @param now    time recorded as {@code used_at}
     * @return number of invalidated tokens
     */
    @Modifying
    @Query("UPDATE UserToken t SET t.usedAt = :now "
            + "WHERE t.userId = :userId AND t.type = :type AND t.usedAt IS NULL")
    int invalidateActive(Long userId, TokenType type, LocalDateTime now);

    /**
     * Deletes tokens that expired before the cutoff.
     *
     * @param cutoff tokens with {@code expires_at} before this moment are deleted
     * @return number of deleted tokens
     */
    @Modifying
    @Query("DELETE FROM UserToken t WHERE t.expiresAt < :cutoff")
    int deleteExpiredBefore(LocalDateTime cutoff);
}
