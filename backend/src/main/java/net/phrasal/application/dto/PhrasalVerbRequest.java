package net.phrasal.application.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public class PhrasalVerbRequest {

    @NotBlank(message = "Verb is required")
    @Size(max = 100, message = "Verb must not exceed 100 characters")
    private String verb;

    @NotBlank(message = "Definition is required")
    private String definition;

    @NotNull(message = "Sentences are required")
    private List<String> sentences;

    @NotNull(message = "Words to hide are required")
    private List<String> wordsToHide;

    private Boolean isLearned = false;

    public PhrasalVerbRequest() {
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
}
