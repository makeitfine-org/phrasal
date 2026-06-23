package net.phrasal.infrastructure.exception;

import lombok.Getter;

/**
 * Base class for all "resource not found" domain exceptions.
 */
@Getter
public abstract class ResourceNotFoundException extends RuntimeException {

    private final String resourceName;
    private final String errorType;

    protected ResourceNotFoundException(String resourceName, String errorType, String message) {
        super(message);
        this.resourceName = resourceName;
        this.errorType = errorType;
    }
}
