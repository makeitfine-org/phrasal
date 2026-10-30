package net.phrasal.infrastructure.security;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.read.ListAppender;
import com.github.benmanes.caffeine.cache.Ticker;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.config.RateLimitProperties.Rule;
import net.phrasal.infrastructure.exception.RateLimitExceededException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.slf4j.LoggerFactory;

import java.time.Duration;
import java.util.concurrent.atomic.AtomicLong;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DisplayName("RateLimiter")
class RateLimiterTest {

    private static final Rule RULE = new Rule(3, Duration.ofMinutes(5));

    private final AtomicLong nanos = new AtomicLong();
    private final Ticker ticker = nanos::get;

    private final ListAppender<ILoggingEvent> appender = new ListAppender<>();
    private final Logger logger = (Logger) LoggerFactory.getLogger(RateLimiter.class);

    @BeforeEach
    void attachAppender() {
        appender.start();
        logger.addAppender(appender);
    }

    @AfterEach
    void detachAppender() {
        logger.detachAppender(appender);
    }

    private RateLimiter limiter(boolean enabled) {
        return new RateLimiter(new RateLimitProperties(enabled, RULE, RULE, RULE, RULE, RULE, RULE, RULE, RULE, RULE,
                RULE, RULE, RULE, RULE, RULE), ticker);
    }

    @Test
    @DisplayName("allows the limit, rejects the next request with a retry hint")
    void rejectsOverLimit() {
        RateLimiter limiter = limiter(true);
        for (int i = 0; i < RULE.limit(); i++) {
            limiter.check("r", RULE, "ip");
        }
        nanos.addAndGet(Duration.ofMinutes(2).toNanos());

        assertThatThrownBy(() -> limiter.check("r", RULE, "ip"))
                .isInstanceOfSatisfying(RateLimitExceededException.class,
                        ex -> assertThat(ex.getRetryAfterSeconds()).isEqualTo(Duration.ofMinutes(3).toSeconds()));
    }

    @Test
    @DisplayName("a new window starts after the time passes")
    void newWindow() {
        RateLimiter limiter = limiter(true);
        for (int i = 0; i < RULE.limit(); i++) {
            limiter.check("r", RULE, "ip");
        }
        nanos.addAndGet(RULE.window().plusSeconds(1).toNanos());

        assertThatCode(() -> limiter.check("r", RULE, "ip")).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("different keys and different rules are counted separately")
    void independentKeys() {
        RateLimiter limiter = limiter(true);
        for (int i = 0; i < RULE.limit(); i++) {
            limiter.check("r", RULE, "ip-1");
        }

        assertThatCode(() -> limiter.check("r", RULE, "ip-2")).doesNotThrowAnyException();
        assertThatCode(() -> limiter.check("other", RULE, "ip-1")).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("disabled limiter never throws")
    void disabled() {
        RateLimiter limiter = limiter(false);

        assertThatCode(() -> {
            for (int i = 0; i < RULE.limit() * 10; i++) {
                limiter.check("r", RULE, "ip");
            }
        }).doesNotThrowAnyException();
    }

    @Test
    @DisplayName("an exceeded per-IP rule logs a warning with the client IP")
    void logsClientIp() {
        RateLimiter limiter = limiter(true);
        for (int i = 0; i < RULE.limit(); i++) {
            limiter.check("login-per-ip", RULE, "203.0.113.7");
        }
        assertThat(appender.list).isEmpty();

        assertThatThrownBy(() -> limiter.check("login-per-ip", RULE, "203.0.113.7"))
                .isInstanceOf(RateLimitExceededException.class);

        assertThat(appender.list).singleElement().satisfies(event -> {
            assertThat(event.getLevel()).isEqualTo(Level.WARN);
            assertThat(event.getFormattedMessage())
                    .isEqualTo("Rate limit exceeded rule=login-per-ip clientIp=203.0.113.7");
        });
    }

    @Test
    @DisplayName("an exceeded email rule logs the rule name and never the email")
    void doesNotLogEmail() {
        RateLimiter limiter = limiter(true);
        for (int i = 0; i < RULE.limit(); i++) {
            limiter.check("login-per-email", RULE, "victim@example.com");
        }

        assertThatThrownBy(() -> limiter.check("login-per-email", RULE, "victim@example.com"))
                .isInstanceOf(RateLimitExceededException.class);

        assertThat(appender.list).singleElement().satisfies(event -> {
            assertThat(event.getLevel()).isEqualTo(Level.WARN);
            assertThat(event.getFormattedMessage()).isEqualTo("Rate limit exceeded rule=login-per-email")
                    .doesNotContain("victim");
        });
    }
}
