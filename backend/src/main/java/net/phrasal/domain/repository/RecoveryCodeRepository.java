package net.phrasal.domain.repository;

import net.phrasal.domain.entity.RecoveryCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface RecoveryCodeRepository extends JpaRepository<RecoveryCode, Long> {

    long countByUserIdAndUsedAtIsNull(Long userId);

    /**
     * Deletes every recovery code of the user, used or not.
     *
     * @param userId owner of the codes
     * @return number of deleted codes
     */
    @Modifying
    @Query("DELETE FROM RecoveryCode r WHERE r.userId = :userId")
    int deleteAllByUserId(Long userId);

    /**
     * Marks one unused code as used. The conditional update makes a code work only once, even for parallel requests.
     *
     * @param userId owner of the code
     * @param hash   SHA-256 hash of the code
     * @param now    time recorded as {@code used_at}
     * @return 1 if the code was unused and is now used, otherwise 0
     */
    @Modifying
    @Query("UPDATE RecoveryCode r SET r.usedAt = :now "
            + "WHERE r.userId = :userId AND r.codeHash = :hash AND r.usedAt IS NULL")
    int markUsed(Long userId, String hash, LocalDateTime now);
}
