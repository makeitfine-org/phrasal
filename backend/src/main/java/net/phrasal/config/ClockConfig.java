package net.phrasal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Clock;

/**
 * Injectable time source so token expiry can be tested with a fixed clock. It uses the JVM zone, like JPA auditing's
 * {@code LocalDateTime.now()}, so stored wall-clock timestamps and expiry checks agree.
 */
@Configuration
public class ClockConfig {

    @Bean
    public Clock clock() {
        return Clock.systemDefaultZone();
    }
}
