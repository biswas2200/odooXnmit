package com.odoo.odoo.service;


import com.odoo.odoo.dto.response.UserResponse;
import com.odoo.odoo.exception.ResourceNotFoundException;
import com.odoo.odoo.model.User;
import com.odoo.odoo.repository.OrderRepository;
import com.odoo.odoo.repository.ProductRepository;
import com.odoo.odoo.repository.UserRepository;
import com.odoo.odoo.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;

    public User getCurrentUser() {
        UserPrincipal userPrincipal = (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        return userRepository.findByEmail(userPrincipal.getEmail())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public UserResponse getUserProfile() {
        User user = getCurrentUser();

        Long productsListed = productRepository.countBySellerAndStatus(user,
                com.odoo.odoo.model.Product.ProductStatus.ACTIVE);
        Long totalOrders = orderRepository.countOrdersByUser(user);
        BigDecimal carbonSaved = orderRepository.getTotalCarbonSavedByUser(user);

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .profileImage(user.getProfileImage())
                .totalCarbonSaved(user.getTotalCarbonSaved())
                .sustainabilityPoints(user.getSustainabilityPoints())
                .productsListed(productsListed)
                .totalOrders(totalOrders)
                .carbonSavedFromPurchases(carbonSaved != null ? carbonSaved : BigDecimal.ZERO)
                .build();
    }
}
