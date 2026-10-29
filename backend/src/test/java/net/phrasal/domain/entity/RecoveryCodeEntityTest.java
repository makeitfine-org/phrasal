package net.phrasal.domain.entity;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("RecoveryCode Entity")
class RecoveryCodeEntityTest {

    private static final String HASH = "b".repeat(64);

    @Test
    @DisplayName("constructor sets the fields and the code starts unused")
    void constructor() {
        RecoveryCode code = new RecoveryCode(7L, HASH);

        assertThat(code.getUserId()).isEqualTo(7L);
        assertThat(code.getCodeHash()).isEqualTo(HASH);
        assertThat(code.getUsedAt()).isNull();
    }

    @Test
    @DisplayName("toString never contains the code hash")
    void toStringHidesHash() {
        assertThat(new RecoveryCode(7L, HASH).toString()).doesNotContain(HASH).contains("userId=7");
    }

    @Test
    @DisplayName("codes without an id are equal by content hash code")
    void equalsUsesId() {
        RecoveryCode first = new RecoveryCode(7L, HASH);
        RecoveryCode second = new RecoveryCode(7L, HASH);

        assertThat(first).isEqualTo(first).isNotEqualTo("other");
        assertThat(first.hashCode()).isEqualTo(second.hashCode());
    }
}
