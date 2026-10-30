package net.phrasal.application.dto;

import java.util.List;

/**
 * A fresh set of single-use recovery codes, shown once.
 *
 * @param recoveryCodes the raw codes
 */
public record RecoveryCodesResponse(List<String> recoveryCodes) {

    @Override
    public String toString() {
        return "RecoveryCodesResponse[count=" + recoveryCodes.size() + "]";
    }
}
