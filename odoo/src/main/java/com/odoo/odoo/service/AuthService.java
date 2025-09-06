package com.odoo.odoo.service;

import com.odoo.odoo.dto.request.LoginRequest;
import com.odoo.odoo.dto.request.RegisterRequest;
import com.odoo.odoo.dto.response.AuthResponse;
import com.odoo.odoo.exception.BadRequestException;
import com.odoo.odoo.model.Cart;
import com.odoo.odoo.model.User;
import com.odoo.odoo.repository.UserRepository;
import com.odoo.odoo.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already taken!");
        }

        if (userRepository.existsByUsername(request.getUsername())) {
            throw new BadRequestException("Username is already taken!");
        }

        User user = User.builder()
                .email(request.getEmail())
                .username(request.getUsername())
                .fullName(request.getFullName())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        User savedUser = userRepository.save(user);

        // Create cart for new user
        Cart cart = Cart.builder()
                .user(savedUser)
                .build();
        savedUser.setCart(cart);

        String jwt = jwtUtil.generateToken(savedUser.getEmail());

        return AuthResponse.builder()
                .token(jwt)
                .id(savedUser.getId())
                .username(savedUser.getUsername())
                .email(savedUser.getEmail())
                .fullName(savedUser.getFullName())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("Invalid credentials"));

        String jwt = jwtUtil.generateToken(user.getEmail());

        return AuthResponse.builder()
                .token(jwt)
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }
}
