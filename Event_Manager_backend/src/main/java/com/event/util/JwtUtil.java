package com.event.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    @Value("${jwt.secret}")
    private String secret; // This is where the value from application.properties is injected

    @Value("${jwt.expiration}")
    private long expiration;

    // Retrieve username from jwt token
    public String getUsernameFromToken(String token) {
        logger.debug("[JwtUtil] Attempting to get username from token.");
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        logger.debug("[JwtUtil] Attempting to get expiration date from token.");
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // For retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        logger.debug("[JwtUtil] Parsing JWT claims for token (first 20 chars): " + (token.length() > 20 ? token.substring(0, 20) + "..." : token));
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey()) // This is where the signature validation happens
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            logger.error("[JwtUtil] Error parsing JWT claims. Token might be invalid, expired, or signature mismatch.", e);
            throw e; // Re-throw to be caught by JwtRequestFilter
        }
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expirationDate = getExpirationDateFromToken(token);
        boolean expired = expirationDate.before(new Date());
        logger.debug("[JwtUtil] Token expiration date: " + expirationDate + ", Current date: " + new Date() + ", Expired: " + expired);
        return expired;
    }

    // Generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities().stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .collect(java.util.stream.Collectors.toList()));
        
        logger.info("[JwtUtil] Generating token for user: " + userDetails.getUsername() + " with roles: " + claims.get("roles"));
        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {
        Date issuedAt = new Date(System.currentTimeMillis());
        Date expirationDate = new Date(System.currentTimeMillis() + expiration);
        logger.debug("[JwtUtil] Token will be issued at: " + issuedAt + ", expires at: " + expirationDate);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expirationDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate token
    public Boolean validateToken(String token, UserDetails userDetails) {
        logger.debug("[JwtUtil] Validating token for user: " + userDetails.getUsername());
        final String username = getUsernameFromToken(token);
        boolean isValid = (username != null && username.equals(userDetails.getUsername()) && !isTokenExpired(token));
        logger.debug("[JwtUtil] Token validation result for " + username + ": " + isValid);
        return isValid;
    }

    private Key getSigningKey() {
        // --- ADD THIS LINE EXACTLY HERE ---
        logger.info("[JwtUtil DEBUG] Full secret being used at runtime: " + secret); // <--- THIS LINE!
        // DANGER: DO NOT KEEP THIS LINE IN PRODUCTION CODE! It logs sensitive information.
        // ----------------------------------
        
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
