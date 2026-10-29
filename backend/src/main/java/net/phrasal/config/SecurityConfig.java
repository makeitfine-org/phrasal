package net.phrasal.config;

import lombok.RequiredArgsConstructor;
import net.phrasal.domain.entity.Role;
import net.phrasal.infrastructure.security.JpaUserDetailsService;
import net.phrasal.presentation.security.CsrfCookieFilter;
import net.phrasal.presentation.security.ProblemDetailAccessDeniedHandler;
import net.phrasal.presentation.security.ProblemDetailAuthenticationEntryPoint;
import org.springframework.boot.web.server.Cookie.SameSite;
import org.springframework.boot.web.server.autoconfigure.ServerProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AccountStatusUserDetailsChecker;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * Access rules: public reads, ADMIN-only writes, per-user {@code /api/v1/me/**} for any signed-in user,
 * SPA-style CSRF and problem+json 401/403 responses.
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

    // Session cookie flags from server.servlet.session.cookie.*; Spring Session does not read them itself.
    @Bean
    DefaultCookieSerializer cookieSerializer(ServerProperties serverProperties) {
        var cookie = serverProperties.getServlet().getSession().getCookie();
        DefaultCookieSerializer serializer = new DefaultCookieSerializer();
        serializer.setUseHttpOnlyCookie(!Boolean.FALSE.equals(cookie.getHttpOnly()));
        serializer.setUseSecureCookie(Boolean.TRUE.equals(cookie.getSecure()));
        SameSite sameSite = cookie.getSameSite();
        serializer.setSameSite(sameSite == null ? null : sameSite.attributeValue());
        return serializer;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(JpaUserDetailsService userDetailsService,
                                                PasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        // The status check runs only after the password matched, so a wrong password gives the same 401 for
        // unverified and unknown accounts and the 403 does not reveal which addresses are registered.
        provider.setPreAuthenticationChecks(user -> { });
        provider.setPostAuthenticationChecks(new AccountStatusUserDetailsChecker());
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
                .logout(logout -> logout
                        .logoutUrl("/api/v1/auth/logout")
                        .logoutSuccessHandler(new HttpStatusReturningLogoutSuccessHandler(HttpStatus.NO_CONTENT))
                        .deleteCookies("SESSION"))
                .formLogin(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .requestCache(cache -> cache.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/actuator/health", "/actuator/health/**").permitAll()
                        .requestMatchers("/actuator/**").hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/me").authenticated()
                        .requestMatchers("/api/v1/me/**").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/v1/auth/register", "/api/v1/auth/login",
                                "/api/v1/auth/verify-email", "/api/v1/auth/resend-verification",
                                "/api/v1/auth/forgot-password", "/api/v1/auth/reset-password").permitAll()
                        .requestMatchers(HttpMethod.POST, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                        .anyRequest().denyAll())
                .build();
    }
}
