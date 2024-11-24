package com.example.health_management;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Stream;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    interface AuthoritiesConverter extends Converter<Map<String, Object>, Collection<GrantedAuthority>> {
    }

    @Bean
    AuthoritiesConverter realmRolesAuthoritiesConverter() {
        return claims -> {
            final var realmAccess = Optional.ofNullable((Map<String, Object>) claims.get("realm_access"));
            final var roles =
                    realmAccess.flatMap(map -> Optional.ofNullable((List<String>) map.get("roles")));
            return roles.map(List::stream).orElse(Stream.empty()).map(SimpleGrantedAuthority::new)
                    .map(GrantedAuthority.class::cast).toList();
        };
    }

    @Bean
    JwtAuthenticationConverter authenticationConverter(
            Converter<Map<String, Object>, Collection<GrantedAuthority>> authoritiesConverter) {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter
                .setJwtGrantedAuthoritiesConverter(jwt -> authoritiesConverter.convert(jwt.getClaims()));
        return jwtAuthenticationConverter;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173")); // Replace with your allowed origin
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "Patch", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    @Bean
    SecurityFilterChain resourceServerSecurityFilterChain(HttpSecurity http,
                                                          Converter<Jwt, AbstractAuthenticationToken> jwtAuthenticationConverter) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource())); // Integrate CORS                                                            
        http.oauth2ResourceServer(resourceServer -> {
            resourceServer.jwt(jwtDecoder -> {
                jwtDecoder.jwtAuthenticationConverter(jwtAuthenticationConverter);
            });
        });

        http.sessionManagement(sessions -> {
            sessions.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        }).csrf(AbstractHttpConfigurer::disable);

        http.authorizeHttpRequests(requests -> {
            requests
                    .requestMatchers("/swagger-ui/**",
                            "/v3/api-docs*/**").permitAll()
                    .requestMatchers(
                            "api/appoint/create/**",
                            "api/appoint/edit/**",
                            "api/appoint/delete/**",
                            "api/appoint/validate/**",
                            "api/user/role/Doctor",
                            "api/health-records/create/**",
                            "api/health-records/delete/**",
                            "api/health-records/leave/**",
                            "api/health-records/find/**").hasAuthority("Patient")
                    .requestMatchers(
                            "api/health-records/findAll",
                            "api/user/role/Patient",
                            "api/tasks/*/assign/*",
                            "api/tasks/*/unassign").hasAuthority( "Doctor")
                    .requestMatchers(
                            "api/health-records/edit/**",
                            "api/tasks/*/complete",
                            "api/tasks/*/variables",
                            "api/appoint/**",
                            "api/tasks",
                            "api/tasks/**").hasAnyAuthority("Patient", "Doctor")
                    .anyRequest().authenticated();
        });

        return http.build();
    }

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper()
                .registerModule(new JavaTimeModule()) // Register the Java 8 time module
                .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // Optional: Avoid timestamps
    }
}