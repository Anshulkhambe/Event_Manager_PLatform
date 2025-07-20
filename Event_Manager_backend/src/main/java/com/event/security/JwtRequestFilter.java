    package com.event.security;

    import com.event.service.JwtUserDetailsService;
    import com.event.util.JwtUtil;
    import io.jsonwebtoken.ExpiredJwtException;
    import io.jsonwebtoken.MalformedJwtException;
    import io.jsonwebtoken.SignatureException;
    import jakarta.servlet.FilterChain;
    import jakarta.servlet.ServletException;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import org.slf4j.Logger; // Ensure this import is present
    import org.slf4j.LoggerFactory; // Ensure this import is present
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
    import org.springframework.stereotype.Component;
    import org.springframework.web.filter.OncePerRequestFilter;

    import java.io.IOException;

    @Component
    public class JwtRequestFilter extends OncePerRequestFilter {

        private static final Logger logger = LoggerFactory.getLogger(JwtRequestFilter.class); // Add logger

        @Autowired
        private JwtUserDetailsService jwtUserDetailsService;

        @Autowired
        private JwtUtil jwtUtil;

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
                throws ServletException, IOException {

            String requestUri = request.getRequestURI();
            logger.info("[JWT Filter] Processing request URI: " + requestUri);

            // --- IMPORTANT: Skip JWT filter for public authentication endpoints ---
            if (requestUri.startsWith("/api/auth/login") ||
                requestUri.startsWith("/api/auth/register") ||
                requestUri.startsWith("/api/auth/register-admin")) {
                logger.info("[JWT Filter] Skipping JWT processing for public endpoint: " + requestUri);
                chain.doFilter(request, response);
                return;
            }
            // --- End of IMPORTANT skip logic ---

            final String requestTokenHeader = request.getHeader("Authorization");

            String username = null;
            String jwtToken = null;

            // ADDED LOGS FOR HEADER CHECK
            if (requestTokenHeader == null) {
                logger.warn("[JWT Filter] Authorization header is MISSING for URI: " + requestUri);
            } else if (!requestTokenHeader.startsWith("Bearer ")) {
                logger.warn("[JWT Filter] Authorization header does NOT start with Bearer for URI: " + requestUri + ". Header: " + requestTokenHeader.substring(0, Math.min(requestTokenHeader.length(), 50)) + "...");
            } else {
                logger.info("[JWT Filter] Authorization header FOUND: " + requestTokenHeader.substring(0, Math.min(requestTokenHeader.length(), 50)) + "...");
            }
            // END ADDED LOGS

            if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
                jwtToken = requestTokenHeader.substring(7);
                logger.info("[JWT Filter] Extracted JWT Token (first 20 chars): " + (jwtToken.length() > 20 ? jwtToken.substring(0, 20) + "..." : jwtToken));

                if (jwtToken != null && !jwtToken.isEmpty()) {
                    try {
                        username = jwtUtil.getUsernameFromToken(jwtToken);
                        logger.info("[JWT Filter] Username extracted from token: " + username);
                    } catch (IllegalArgumentException e) {
                        logger.error("[JWT Filter] JWT Token is invalid or malformed for URI: " + requestUri, e);
                    } catch (ExpiredJwtException e) {
                        logger.error("[JWT Filter] JWT Token has expired for URI: " + requestUri, e);
                    } catch (SignatureException e) {
                        logger.error("[JWT Filter] JWT Token signature is invalid for URI: " + requestUri, e);
                    } catch (MalformedJwtException e) {
                        logger.error("[JWT Filter] JWT Token is malformed for URI: " + requestUri, e);
                    } catch (Exception e) {
                        logger.error("[JWT Filter] An unexpected error occurred while parsing JWT Token for URI: " + requestUri, e);
                    }
                } else {
                    logger.warn("[JWT Filter] Authorization header present but JWT Token was empty after 'Bearer ' substring for URI: " + requestUri);
                }
            } else {
                // This block is now redundant due to the added logs above, but keeping for clarity
                // logger.warn("[JWT Filter] Authorization header missing or does not start with Bearer for secured endpoint: " + requestUri);
            }

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                logger.info("[JWT Filter] Attempting to load UserDetails for username: " + username);
                UserDetails userDetails = null;
                try {
                    userDetails = this.jwtUserDetailsService.loadUserByUsername(username);
                    logger.info("[JWT Filter] UserDetails loaded for: " + username + " with authorities: " + userDetails.getAuthorities());
                } catch (Exception e) {
                    logger.error("[JWT Filter] Failed to load user details for username: " + username + " from token for URI: " + requestUri, e);
                }

                if (userDetails != null && jwtUtil.validateToken(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    logger.info("[JWT Filter] SecurityContextHolder populated for user: " + username + " for URI: " + requestUri);
                } else if (userDetails == null) {
                    logger.warn("[JWT Filter] UserDetails not found for username: " + username + ", authentication failed for URI: " + requestUri);
                } else { // Token validation failed (e.g., token expired, username mismatch)
                    logger.warn("[JWT Filter] JWT Token validation failed for username: " + username + " for URI: " + requestUri);
                }
            } else if (username == null && requestTokenHeader != null) { // Token was present but username couldn't be extracted
                logger.warn("[JWT Filter] Username could not be extracted from token, or token was invalid/expired for URI: " + requestUri);
            } else if (SecurityContextHolder.getContext().getAuthentication() != null) {
                logger.info("[JWT Filter] User already authenticated in SecurityContext: " + SecurityContextHolder.getContext().getAuthentication().getName() + " for URI: " + requestUri);
            } else {
                logger.warn("[JWT Filter] No JWT token found or username is null for secured endpoint: " + requestUri);
            }

            chain.doFilter(request, response);
        }
    }
    