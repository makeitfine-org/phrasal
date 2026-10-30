package net.phrasal.infrastructure.security;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.github.benmanes.caffeine.cache.Ticker;
import lombok.extern.slf4j.Slf4j;
import net.phrasal.config.RateLimitProperties;
import net.phrasal.config.RateLimitProperties.Rule;
import net.phrasal.infrastructure.exception.RateLimitExceededException;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * In-memory fixed-window limiter. The window starts at the first request for a key and the counter is
 * dropped when it ends. State is per instance, which is enough for a single backend replica.
 */
@Slf4j
@Component
public class RateLimiter {

    private static final String PER_IP_SUFFIX = "-per-ip";
    private static final long MAX_KEYS = 100_000;

    private final boolean enabled;
    private final Ticker ticker;
    private final Map<String, Cache<String, AtomicInteger>> caches = new ConcurrentHashMap<>();

    public RateLimiter(RateLimitProperties properties, Ticker ticker) {
        this.enabled = properties.enabled();
        this.ticker = ticker;
    }

    /**
     * Counts one request and rejects it when the key is over the limit.
     *
     * @param ruleName name of the rule, keeps counters of different rules apart
     * @param rule     limit and window
     * @param key      what is limited, e.g. a client IP or an email
     * @throws RateLimitExceededException when the count exceeds the limit
     */
    public void check(String ruleName, Rule rule, String key) {
        if (!enabled) {
            return;
        }
        Cache<String, AtomicInteger> cache = caches.computeIfAbsent(ruleName, name -> newCache(rule.window()));
        int count = cache.get(key, k -> new AtomicInteger()).incrementAndGet();
        if (count > rule.limit()) {
            if (ruleName.endsWith(PER_IP_SUFFIX)) {
                log.warn("Rate limit exceeded rule={} clientIp={}", ruleName, key);
            } else {
                log.warn("Rate limit exceeded rule={}", ruleName);
            }
            throw new RateLimitExceededException(ruleName, retryAfterSeconds(cache, key, rule.window()));
        }
    }

    private Cache<String, AtomicInteger> newCache(Duration window) {
        return Caffeine.newBuilder()
                .expireAfterWrite(window)
                .maximumSize(MAX_KEYS)
                .ticker(ticker)
                .build();
    }

    private static long retryAfterSeconds(Cache<String, AtomicInteger> cache, String key, Duration window) {
        Duration age = cache.policy().expireAfterWrite()
                .flatMap(policy -> policy.ageOf(key))
                .orElse(Duration.ZERO);
        return Math.max(1, window.minus(age).toSeconds());
    }
}
