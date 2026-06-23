package net.phrasal.application.util;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Set;

/**
 * Shared pageable sanitization — filters out disallowed sort fields.
 */
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PageableUtils {

    public static Pageable sanitize(Pageable pageable, Set<String> allowedFields, String defaultSort) {
        Sort filtered = Sort.by(
                pageable.getSort().stream()
                        .filter(o -> allowedFields.contains(o.getProperty()))
                        .toList()
        );
        if (filtered.isUnsorted()) {
            filtered = Sort.by(Sort.Direction.ASC, defaultSort);
        }
        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), filtered);
    }
}
