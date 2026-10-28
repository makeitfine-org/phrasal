package net.phrasal.application.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

/**
 * Class-level rule for payloads with {@code email} and {@code password} components: the password must not contain
 * the email address or its local part. A violation is reported on the {@code password} field.
 */
@Documented
@Constraint(validatedBy = PasswordNotContainingEmailValidator.class)
@Target(TYPE)
@Retention(RUNTIME)
public @interface PasswordNotContainingEmail {

    String message() default "Password must not contain your email address";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
