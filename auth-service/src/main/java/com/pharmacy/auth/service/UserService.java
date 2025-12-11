package com.pharmacy.auth.service;

import com.pharmacy.auth.model.User;
import java.util.List;

public interface UserService {
    User createUser(User user);
    boolean checkEmail(String email);
    User findByEmail(String email);
    List<User> getAllUsers();
    long getUserCount();
}