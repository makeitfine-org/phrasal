package net.phrasal.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class PhrasalVerbResponse {

    private Long id;
    private String verb;
    private String definition;
    private List<String> sentences;
    private List<String> wordsToHide;
    private Boolean isLearned;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long version;
}
