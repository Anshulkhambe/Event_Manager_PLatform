    package com.event.controller;

    import com.event.dto.JwtResponse;
    import com.event.dto.LoginRequest;
    import com.event.dto.RegisterRequest;
    import com.event.service.JwtUserDetailsService;
    import com.event.service.UserService;
    import com.event.util.JwtUtil;
    import jakarta.validation.Valid;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.BadCredentialsException;
    import org.springframework.security.authentication.DisabledException;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.stream.Collectors;

    @RestController
    @RequestMapping("/api/auth") // Base path for all endpoints in this controller
    @CrossOrigin(origins = "http://localhost:5173") // Ensure this matches your frontend URL
    public class AuthController {

        @Autowired
        private AuthenticationManager authenticationManager;

        @Autowired
        private JwtUtil jwtUtil;

        @Autowired
        private JwtUserDetailsService userDetailsService; // This loads your custom UserDetails (which is your User bean)

        @Autowired
        private UserService userService; // To get the full User object if needed

        @PostMapping("/login") // Maps to /api/auth/login
        public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody LoginRequest authenticationRequest) throws Exception {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

            final UserDetails userDetails = userDetailsService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String token = jwtUtil.generateToken(userDetails);

            // Get all user roles to include in response
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(GrantedAuthority::getAuthority)
                    .collect(Collectors.toList());

            // Get the full User object to retrieve the email
            com.event.bean.User userEntity = userService.findByUsername(authenticationRequest.getUsername());
            String userEmail = userEntity.getEmail(); // Retrieve email from your User entity

            return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername(), userEmail, roles)); // NEW: Pass email
        }

        @PostMapping("/register") // Maps to /api/auth/register
        public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
            try {
                userService.registerUser(registerRequest);
                return ResponseEntity.ok("User registered successfully!");
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

        @PostMapping("/register-admin") // Maps to /api/auth/register-admin
        public ResponseEntity<?> registerAdmin(@Valid @RequestBody RegisterRequest registerRequest) {
            try {
                userService.registerAdmin(registerRequest);
                return ResponseEntity.ok("Admin registered successfully!");
            } catch (RuntimeException e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
            }
        }

        private void authenticate(String username, String password) throws Exception {
            try {
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            } catch (DisabledException e) {
                throw new Exception("USER_DISABLED", e);
            } catch (BadCredentialsException e) {
                throw new Exception("INVALID_CREDENTIALS", e);
            }
        }
    }
    