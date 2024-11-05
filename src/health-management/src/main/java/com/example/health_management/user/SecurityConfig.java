package com.example.health_management.user;

import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.filter.KeycloakAuthenticationProcessingFilter;
import org.keycloak.adapters.springsecurity.filter.KeycloakPreAuthActionsFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.session.NullAuthenticatedSessionStrategy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@KeycloakConfiguration
public class SecurityConfig {

    private static final String[] AUTH_WHITELIST = {
        "/openapi/openapi.yml",
        "/swagger-resources",
        "/swagger-resources/**",
        "/configuration/ui",
        "/configuration/security",
        "/swagger-ui.html",
        "/webjars/**",
        "/v3/api-docs/**",
        "/actuator/**",
        "/api/**",
        "/auth/**",
        "/user/**",
        "/actuator/health",
        "/"
    };

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, AuthenticationManager authManager) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests((requests) -> requests
						.requestMatchers(AUTH_WHITELIST).permitAll()
						.anyRequest().authenticated())
					.exceptionHandling(ex -> ex
					.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
					)
					.addFilterBefore(keycloakAuthenticationProcessingFilter(authManager), UsernamePasswordAuthenticationFilter.class)
					.addFilterBefore(keycloakPreAuthActionsFilter(), KeycloakAuthenticationProcessingFilter.class);
		
        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) {
        KeycloakAuthenticationProvider keycloakAuthenticationProvider = new KeycloakAuthenticationProvider();
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());
        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

	@Bean
    public KeycloakSpringBootConfigResolver keycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:5173"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "OPTIONS", "DELETE", "PUT", "PATCH"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type", "token"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public KeycloakAuthenticationProcessingFilter keycloakAuthenticationProcessingFilter(AuthenticationManager authenticationManager) {
        KeycloakAuthenticationProcessingFilter filter = new KeycloakAuthenticationProcessingFilter(authenticationManager);
        filter.setSessionAuthenticationStrategy(new NullAuthenticatedSessionStrategy());
        return filter;
    }

    @Bean
    public KeycloakPreAuthActionsFilter keycloakPreAuthActionsFilter() {
        return new KeycloakPreAuthActionsFilter();
    }
}
