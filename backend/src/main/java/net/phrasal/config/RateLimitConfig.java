package net.phrasal.config;

import com.github.benmanes.caffeine.cache.Ticker;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RateLimitConfig {

    @Bean
    Ticker rateLimitTicker() {
        return Ticker.systemTicker();
    }
}
