package com.pharmacy.auth.controller;

import com.pharmacy.auth.config.CustomUserDetails;
import com.pharmacy.auth.dto.AuthResponse;
import com.pharmacy.auth.dto.LoginRequest;
import com.pharmacy.auth.dto.ValidationResponse;
import com.pharmacy.auth.model.User;
import com.pharmacy.auth.service.UserService;
import com.pharmacy.auth.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        System.out.println("\n========== REGISTRATION REQUEST ==========");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Fullname: " + user.getFullname());
        
        try {
            // Check if email exists
            boolean emailExists = userService.checkEmail(user.getEmail());
            System.out.println("Email exists check: " + emailExists);
            
            if (emailExists) {
                System.out.println("❌ Registration failed: Email already exists");
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Email already exists");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            
            // Create user
            User createdUser = userService.createUser(user);
            System.out.println("✅ User created successfully with ID: " + createdUser.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "User registered successfully");
            response.put("user", Map.of(
                "id", createdUser.getId(),
                "email", createdUser.getEmail(),
                "fullname", createdUser.getFullname()
            ));
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            System.err.println("❌ Registration error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Registration failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        System.out.println("\n========== LOGIN REQUEST ==========");
        System.out.println("Email: " + loginRequest.getEmail());
        System.out.println("Password length: " + (loginRequest.getPassword() != null ? loginRequest.getPassword().length() : 0));
        
        try {
            // First check if user exists
            User existingUser = userService.findByEmail(loginRequest.getEmail());
            if (existingUser == null) {
                System.out.println("❌ User not found in database");
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Invalid email or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
            
            System.out.println("✅ User found: " + existingUser.getEmail());
            System.out.println("User ID: " + existingUser.getId());
            System.out.println("User Role: " + existingUser.getRole());
            System.out.println("Password hash (first 20 chars): " + existingUser.getPassword().substring(0, 20));
            
            // Try to authenticate
            System.out.println("Attempting authentication...");
            Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(),
                    loginRequest.getPassword()
                )
            );

            System.out.println("✅ Authentication successful!");
            
            CustomUserDetails userDetails = (CustomUserDetails) auth.getPrincipal();
            String role = userDetails.getAuthorities().iterator().next().getAuthority();
            String token = jwtUtil.generateToken(userDetails.getUsername(), role);

            System.out.println("✅ Token generated");
            System.out.println("Token (first 50 chars): " + token.substring(0, Math.min(50, token.length())));
            
            AuthResponse response = new AuthResponse(
                token,
                role,
                userDetails.getUsername(),
                userDetails.getUser().getFullname()
            );

            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            System.err.println("❌ Bad credentials - password does not match");
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            
        } catch (Exception e) {
            System.err.println("❌ Login error: " + e.getMessage());
            e.printStackTrace();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Login failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.ok(new ValidationResponse(null, null, false));
            }

            String token = authHeader.substring(7);
            String username = jwtUtil.extractUsername(token);
            String role = jwtUtil.extractRole(token);

            if (jwtUtil.validateToken(token, username)) {
                return ResponseEntity.ok(new ValidationResponse(username, role, true));
            } else {
                return ResponseEntity.ok(new ValidationResponse(null, null, false));
            }
        } catch (Exception e) {
            return ResponseEntity.ok(new ValidationResponse(null, null, false));
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("Auth Service is running on port 8076");
    }
    
    @GetMapping("/test-db")
    public ResponseEntity<?> testDatabase() {
        try {
            long userCount = userService.getUserCount();
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("userCount", userCount);
            response.put("message", "Database connection successful");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Database connection failed: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}