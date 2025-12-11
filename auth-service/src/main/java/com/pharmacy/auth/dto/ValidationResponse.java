package com.pharmacy.auth.dto;

public class ValidationResponse {
    private String username;
    private String role;
    private boolean valid;

    public ValidationResponse() {}

    public ValidationResponse(String username, String role, boolean valid) {
        this.username = username;
        this.role = role;
        this.valid = valid;
    }

    // Getters and Setters
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public boolean isValid() { return valid; }
    public void setValid(boolean valid) { this.valid = valid; }
}