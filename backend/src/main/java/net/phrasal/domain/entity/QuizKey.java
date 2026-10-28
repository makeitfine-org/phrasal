package net.phrasal.domain.entity;

import java.util.Arrays;
import java.util.Optional;

public enum QuizKey {

    PHRASAL_VERBS("phrasal-verbs"),
    GRAMMAR_I_WISH_IF_ONLY("grammar-i-wish-if-only");

    private final String pathValue;

    QuizKey(String pathValue) {
        this.pathValue = pathValue;
    }

    // Value used in the URL path and stored in the database.
    public String pathValue() {
        return pathValue;
    }

    // Exact, case-sensitive lookup; null and unknown values give an empty result.
    public static Optional<QuizKey> fromPathValue(String value) {
        return Arrays.stream(values())
                .filter(key -> key.pathValue.equals(value))
                .findFirst();
    }
}
