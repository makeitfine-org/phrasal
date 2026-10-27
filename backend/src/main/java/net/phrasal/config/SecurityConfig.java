package net.phrasal.config;

import lombok.RequiredArgsConstructor;
import net.phrasal.domain.entity.Role;
import net.phrasal.infrastructure.security.JpaUserDetailsService;
import net.phrasal.presentation.security.CsrfCookieFilter;
import net.phrasal.presentation.security.ProblemDetailAccessDeniedHandler;
import net.phrasal.presentation.security.ProblemDetailAuthenticationEntryPoint;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;

/**
 * Access rules: public reads, ADMIN-only writes, SPA-style CSRF and problem+json 401/403 responses.
 */
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String ADMIN = Role.ADMIN.name();
    private static final String[] CONTENT_PATHS = {
            "/api/v1/phrasal-verbs/**", "/api/v1/grammar-entries/**", "/api/v1/verb-details/**"
    };

    private final ProblemDetailAuthenticationEntryPoint entryPoint;
    private final ProblemDetailAccessDeniedHandler deniedHandler;

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(JpaUserDetailsService userDetailsService,
                                                PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return new ProviderManager(provider);
    }

    @Bean
    SecurityContextRepository securityContextRepository() {
        return new HttpSessionSecurityContextRepository();
    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, SecurityContextRepository contextRepository)
            throws Exception {
        return http
                .securityContext(context -> context.securityContextRepository(contextRepository))
                .csrf(csrf -> csrf.csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).spa())
                .exceptionHandling(e -> e.authenticationEntryPoint(entryPoint).accessDeniedHandler(deniedHandler))
                .addFilterAfter(new CsrfCookieFilter(), CsrfFilter.class)
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .requestCache(cache -> cache.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/actuator/health", "/actuator/health/**").permitAll()
                        .requestMatchers("/actuator/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/me").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register", "/api/v1/auth/login").permitAll()
                        .requestMatchers(HttpMethod.POST, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                        .anyRequest().denyAll())
                .build();
    }
}
