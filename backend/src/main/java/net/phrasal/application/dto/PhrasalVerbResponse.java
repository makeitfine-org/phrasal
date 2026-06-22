package net.phrasal.application.dto;

import java.time.LocalDateTime;
import java.util.List;

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

    public PhrasalVerbResponse() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getVerb() {
        return verb;
    }

    public void setVerb(String verb) {
        this.verb = verb;
    }

    public String getDefinition() {
        return definition;
    }

    public void setDefinition(String definition) {
        this.definition = definition;
    }

    public List<String> getSentences() {
        return sentences;
    }

    public void setSentences(List<String> sentences) {
        this.sentences = sentences;
    }

    public List<String> getWordsToHide() {
        return wordsToHide;
    }

    public void setWordsToHide(List<String> wordsToHide) {
        this.wordsToHide = wordsToHide;
    }

    public Boolean getIsLearned() {
        return isLearned;
    }

    public void setIsLearned(Boolean isLearned) {
        this.isLearned = isLearned;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
    }
}
