package net.phrasal.domain.repository;

import net.phrasal.domain.entity.GrammarEntry;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarEntryRepository extends JpaRepository<GrammarEntry, Long> {

    @Query("""
            SELECT ge FROM GrammarEntry ge
            WHERE (:category IS NULL OR ge.category = :category)
            """)
    Page<GrammarEntry> search(@Param("category") String category, Pageable pageable);
}
