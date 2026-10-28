package net.phrasal.config;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.NotNull;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import java.net.URI;

/**
 * Public address of the web app, used to build links in emails. Never derived from a request header.
 *
 * @param baseUrl origin such as {@code https://phrasalbox.com}: scheme and host, no trailing slash
 */
@Validated
@ConfigurationProperties("phrasal.app")
public record AppProperties(@NotNull URI baseUrl) {

    @AssertTrue(message = "phrasal.app.base-url needs a scheme and host and no trailing slash")
    public boolean isBaseUrlWellFormed() {
        return baseUrl == null
                || baseUrl.getScheme() != null && baseUrl.getHost() != null && !baseUrl.toString().endsWith("/");
    }
}
