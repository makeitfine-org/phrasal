package net.phrasal.domain.repository;

import net.phrasal.domain.entity.PhrasalVerb;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PhrasalVerbRepository extends JpaRepository<PhrasalVerb, Long> {

    @Query("""
            SELECT pv FROM PhrasalVerb pv
            WHERE (:learned IS NULL OR pv.isLearned = :learned)
              AND (:q IS NULL OR :q = ''
                   OR LOWER(pv.verb) LIKE LOWER(CONCAT('%', :q, '%'))
                   OR LOWER(pv.definition) LIKE LOWER(CONCAT('%', :q, '%')))
            """)
    Page<PhrasalVerb> search(
            @Param("q") String q,
            @Param("learned") Boolean learned,
            Pageable pageable
    );
}
