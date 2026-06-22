package net.phrasal.application.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
public class GrammarEntryResponse {

    private Long id;
    private String category;
    private String sentence;
    private List<String> correctAnswers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long version;
}
