    package com.event.dto;

    import java.util.List;

    public class JwtResponse {
        private String jwtToken;
        private String username;
        private String email; // NEW: Add email field
        private List<String> roles;

        public JwtResponse(String jwtToken, String username, String email, List<String> roles) { // NEW: Add email to constructor
            this.jwtToken = jwtToken;
            this.username = username;
            this.email = email; // Assign email
            this.roles = roles;
        }

        // Getters and Setters
        public String getJwtToken() { return jwtToken; }
        public void setJwtToken(String jwtToken) { this.jwtToken = jwtToken; }
        public String getUsername() { return username; }
        public void setUsername(String username) { this.username = username; }
        public String getEmail() { return email; } // NEW: Getter for email
        public void setEmail(String email) { this.email = email; } // NEW: Setter for email
        public List<String> getRoles() { return roles; }
        public void setRoles(List<String> roles) { this.roles = roles; }
    }
    