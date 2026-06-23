package net.phrasal.domain.repository;

import net.phrasal.domain.entity.VerbDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerbDetailRepository extends JpaRepository<VerbDetail, Long> {

    Optional<VerbDetail> findByVerb(String verb);
}
