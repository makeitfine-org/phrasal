package net.phrasal.application.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import net.phrasal.application.dto.RegisterRequest;

public class PasswordNotContainingEmailValidator
        implements ConstraintValidator<PasswordNotContainingEmail, RegisterRequest> {

    @Override
    public boolean isValid(RegisterRequest request, ConstraintValidatorContext context) {
        if (request == null || request.password() == null) {
            return true;
        }
        boolean containsEmail = PasswordPolicy.violation(request.password(), request.email())
                .filter(PasswordPolicy.CONTAINS_EMAIL::equals)
                .isPresent();
        if (!containsEmail) {
            return true;
        }
        context.disableDefaultConstraintViolation();
        context.buildConstraintViolationWithTemplate(PasswordPolicy.CONTAINS_EMAIL)
                .addPropertyNode("password")
                .addConstraintViolation();
        return false;
    }
}
