package com.odoo.odoo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private String fullName;
    private String phone;
    private String profileImage;
    private BigDecimal totalCarbonSaved;
    private Integer sustainabilityPoints;
    private Long productsListed;
    private Long totalOrders;
    private BigDecimal carbonSavedFromPurchases;
}