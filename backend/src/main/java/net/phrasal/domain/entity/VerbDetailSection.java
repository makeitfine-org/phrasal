package net.phrasal.domain.entity;

import java.util.List;

public record VerbDetailSection(
    String particle,
    String storageKeyPrefix,
    List<VerbDetailMeaning> meanings
) {
}
