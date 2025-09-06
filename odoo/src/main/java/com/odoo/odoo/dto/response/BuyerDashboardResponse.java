package com.odoo.odoo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BuyerDashboardResponse {
    private Long totalPurchases;
    private BigDecimal totalSpent;
    private BigDecimal personalCarbonSaved;
    private List<OrderSummaryResponse> activeOrders;
    private List<OrderSummaryResponse> recentOrders;
    private List<ProductResponse> savedProducts;
    private SustainabilityAchievements sustainabilityAchievements;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderSummaryResponse {
        private Long orderId;
        private String sellerName;
        private BigDecimal totalAmount;
        private String status;
        private java.time.LocalDateTime orderDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SustainabilityAchievements {
        private String level;
        private String nextLevel;
        private Integer progressToNext;
        private List<String> badges;
    }
}
