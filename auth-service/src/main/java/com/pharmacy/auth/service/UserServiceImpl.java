package com.pharmacy.auth.service;

import com.pharmacy.auth.model.User;
import com.pharmacy.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public User createUser(User user) {
        System.out.println("\n--- UserService.createUser() ---");
        System.out.println("Email: " + user.getEmail());
        System.out.println("Fullname: " + user.getFullname());
        System.out.println("Raw password length: " + (user.getPassword() != null ? user.getPassword().length() : 0));
        
        // Encode password
        String rawPassword = user.getPassword();
        String encodedPassword = passwordEncoder.encode(rawPassword);
        user.setPassword(encodedPassword);
        
        System.out.println("Password encoded");
        System.out.println("Encoded password (first 30 chars): " + encodedPassword.substring(0, 30));
        
        // Set default role
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }
        
        System.out.println("Role set to: " + user.getRole());
        
        // Save to database
        User savedUser = userRepo.save(user);
        System.out.println("User saved with ID: " + savedUser.getId());
        
        // Verify save
        User verifyUser = userRepo.findById(savedUser.getId()).orElse(null);
        if (verifyUser != null) {
            System.out.println("✅ User verified in database");
        } else {
            System.out.println("❌ WARNING: User not found after save!");
        }
        
        return savedUser;
    }

    @Override
    public boolean checkEmail(String email) {
        boolean exists = userRepo.existsByEmail(email);
        System.out.println("Checking email '" + email + "': exists = " + exists);
        return exists;
    }

    @Override
    public User findByEmail(String email) {
        System.out.println("Finding user by email: " + email);
        User user = userRepo.findByEmail(email);
        if (user != null) {
            System.out.println("User found - ID: " + user.getId() + ", Email: " + user.getEmail());
        } else {
            System.out.println("User NOT found");
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public long getUserCount() {
        return userRepo.count();
    }
}