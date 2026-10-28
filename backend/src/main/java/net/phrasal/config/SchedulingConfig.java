package net.phrasal.config;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;

/** Turns on {@code @Scheduled} jobs. Tests set {@code phrasal.cleanup.enabled=false} so nothing fires on its own. */
@Configuration
@EnableScheduling
@ConditionalOnProperty(name = "phrasal.cleanup.enabled", havingValue = "true", matchIfMissing = true)
public class SchedulingConfig {

}
