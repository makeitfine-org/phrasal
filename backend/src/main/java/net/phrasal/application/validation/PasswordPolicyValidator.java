package net.phrasal.application.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordPolicyValidator implements ConstraintValidator<ValidPassword, String> {

    static final int MIN_LENGTH = PasswordPolicy.MIN_LENGTH;
    static final int MAX_UTF8_BYTES = PasswordPolicy.MAX_UTF8_BYTES;

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return true;
        }
        return PasswordPolicy.violation(password).map(message -> reject(context, message)).orElse(true);
    }

    private static boolean reject(ConstraintValidatorContext context, String message) {
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(message).addConstraintViolation();
        return false;
    }
}
