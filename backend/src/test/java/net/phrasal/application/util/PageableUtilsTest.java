package net.phrasal.application.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;

@DisplayName("PageableUtils")
class PageableUtilsTest {

    private static final Set<String> ALLOWED = Set.of("verb", "definition", "createdAt");
    private static final String DEFAULT_SORT = "verb";

    @Test
    @DisplayName("keeps allowed sort fields unchanged")
    void keepAllowedFields() {
        Pageable input = PageRequest.of(0, 20, Sort.by("verb"));

        Pageable result = PageableUtils.sanitize(input, ALLOWED, DEFAULT_SORT);

        assertThat(result.getSort().getOrderFor("verb")).isNotNull();
        assertThat(result.getPageNumber()).isZero();
        assertThat(result.getPageSize()).isEqualTo(20);
    }

    @Test
    @DisplayName("falls back to default sort when all fields are invalid")
    void fallbackOnInvalidFields() {
        Pageable input = PageRequest.of(1, 10, Sort.by("hackAttempt"));

        Pageable result = PageableUtils.sanitize(input, ALLOWED, DEFAULT_SORT);

        assertThat(result.getSort().getOrderFor("verb")).isNotNull();
        assertThat(result.getSort().getOrderFor("hackAttempt")).isNull();
        assertThat(result.getPageNumber()).isEqualTo(1);
        assertThat(result.getPageSize()).isEqualTo(10);
    }

    @Test
    @DisplayName("filters out invalid fields and keeps valid ones")
    void mixedValidAndInvalid() {
        Pageable input = PageRequest.of(0, 5, Sort.by("definition", "invalid", "createdAt"));

        Pageable result = PageableUtils.sanitize(input, ALLOWED, DEFAULT_SORT);

        assertThat(result.getSort().getOrderFor("definition")).isNotNull();
        assertThat(result.getSort().getOrderFor("createdAt")).isNotNull();
        assertThat(result.getSort().getOrderFor("invalid")).isNull();
    }

    @Test
    @DisplayName("falls back to default when sort is unsorted")
    void unsortedFallback() {
        Pageable input = PageRequest.of(0, 15, Sort.unsorted());

        Pageable result = PageableUtils.sanitize(input, ALLOWED, DEFAULT_SORT);

        assertThat(result.getSort().getOrderFor("verb")).isNotNull();
    }

    @Test
    @DisplayName("preserves sort direction for allowed fields")
    void preserveDirection() {
        Pageable input = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "createdAt"));

        Pageable result = PageableUtils.sanitize(input, ALLOWED, DEFAULT_SORT);

        Sort.Order order = result.getSort().getOrderFor("createdAt");
        assertThat(order).isNotNull();
        assertThat(order.getDirection()).isEqualTo(Sort.Direction.DESC);
    }
}
