package net.phrasal.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * Enables {@code @Async}. The executor is Boot's auto-configured one (virtual threads); only the uncaught-exception
 * handler is replaced, so failures are logged by method name and never with their arguments (they hold links).
 */
@Slf4j
@Configuration
@EnableAsync
public class AsyncConfig implements AsyncConfigurer {

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler() {
        return (throwable, method, params) ->
                log.warn("Async method {} failed: {}", method.getName(), throwable.getClass().getSimpleName());
    }
}
