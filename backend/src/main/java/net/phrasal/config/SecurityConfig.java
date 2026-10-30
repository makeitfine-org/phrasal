package net.phrasal.config;

import lombok.RequiredArgsConstructor;
import net.phrasal.domain.entity.Role;
import net.phrasal.infrastructure.security.JpaUserDetailsService;
import net.phrasal.presentation.security.CsrfCookieFilter;
import net.phrasal.presentation.security.GoogleLoginFailureHandler;
import net.phrasal.presentation.security.GoogleLoginSuccessHandler;
import net.phrasal.presentation.security.GoogleOidcUserService;
import net.phrasal.presentation.security.NoOpAuthorizedClientRepository;
import net.phrasal.presentation.security.ProblemDetailAccessDeniedHandler;
import net.phrasal.presentation.security.ProblemDetailAuthenticationEntryPoint;
import org.springframework.beans.factory.ObjectProvider;
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
import org.springframework.security.config.ObjectPostProcessor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.HttpStatusReturningLogoutSuccessHandler;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.csrf.CsrfFilter;
import org.springframework.session.web.http.DefaultCookieSerializer;

/**
 * Access rules: public reads, ADMIN-only writes, per-user {@code /api/v1/me/**} for any signed-in user,
 * SPA-style CSRF and problem+json 401/403 responses. ADMIN authority requires a completed second factor, see
 * {@code AuthenticatedUser#authorities}.
 *
 * <p>Rules, first match wins: {@code /error} and health public; other actuator endpoints ADMIN; {@code GET
 * /api/v1/auth/me} and {@code /api/v1/me/**} signed in; the public auth {@code POST}s and the Google sign-in
 * {@code GET}s ({@code /api/v1/auth/oauth2/**}) public; content writes ADMIN; other {@code GET /api/**} public;
 * everything else denied.
 *
 * <p>With {@code phrasal.google.enabled} there is also an {@code oauth2Login} for Google (see
 * {@link GoogleLoginConfig}). It keeps the {@code AuthenticatedUser} principal: the OAuth2 token stays in the request,
 * Google's access token is dropped, and the success handler stores the session the way a password login does.
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

    // The Google parts come in here, not through the constructor: the success handler needs SessionAuthenticator,
    // which needs the AuthenticationManager defined above.
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http, SecurityContextRepository contextRepository,
                                            ObjectProvider<ClientRegistrationRepository> googleRegistrations,
                                            GoogleOidcUserService googleUserService,
                                            GoogleLoginSuccessHandler googleSuccessHandler,
                                            GoogleLoginFailureHandler googleFailureHandler) throws Exception {
        http
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
                                "/api/v1/auth/login/2fa", "/api/v1/auth/verify-email",
                                "/api/v1/auth/confirm-email-change",
                                "/api/v1/auth/resend-verification", "/api/v1/auth/forgot-password",
                                "/api/v1/auth/reset-password").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/v1/auth/oauth2/**").permitAll()
                        .requestMatchers(HttpMethod.POST, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, CONTENT_PATHS).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                        .anyRequest().denyAll());
        ClientRegistrationRepository registrations = googleRegistrations.getIfAvailable();
        if (registrations != null) {
            http.oauth2Login(oauth -> googleLogin(oauth, registrations, googleUserService, googleSuccessHandler,
                    googleFailureHandler));
        }
        return http.build();
    }

    // The login page is the SPA's, so no backend login page is generated and API requests still get the JSON 401.
    private static void googleLogin(OAuth2LoginConfigurer<HttpSecurity> oauth,
                                    ClientRegistrationRepository registrations, GoogleOidcUserService userService,
                                    GoogleLoginSuccessHandler successHandler,
                                    GoogleLoginFailureHandler failureHandler) {
        oauth.clientRegistrationRepository(registrations)
                .loginPage("/login")
                .authorizationEndpoint(endpoint -> endpoint.baseUri(GoogleLoginConfig.AUTHORIZATION_BASE_URI))
                .redirectionEndpoint(endpoint -> endpoint.baseUri(GoogleLoginConfig.CALLBACK_BASE_URI + "*"))
                .userInfoEndpoint(endpoint -> endpoint.oidcUserService(userService))
                .securityContextRepository(new RequestAttributeSecurityContextRepository())
                .authorizedClientRepository(new NoOpAuthorizedClientRepository())
                .successHandler(successHandler)
                .failureHandler(failureHandler);
        // Without this, an unknown registration id in the start URL answers a bare 500.
        oauth.addObjectPostProcessor(new ObjectPostProcessor<OAuth2AuthorizationRequestRedirectFilter>() {
            @Override
            public <O extends OAuth2AuthorizationRequestRedirectFilter> O postProcess(O filter) {
                filter.setAuthenticationFailureHandler(failureHandler);
                return filter;
            }
        });
    }
}
