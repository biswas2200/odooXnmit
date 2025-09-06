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
public class SellerDashboardResponse {
    private BigDecimal totalEarnings;
    private Long totalOrders;
    private Long totalProducts;
    private BigDecimal totalCarbonSaved;
    private List<RecentOrderResponse> recentOrders;
    private List<ProductPerformanceResponse> topProducts;
    private List<BuyerInsightResponse> topBuyers;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RecentOrderResponse {
        private Long orderId;
        private String buyerName;
        private BigDecimal totalAmount;
        private String status;
        private java.time.LocalDateTime orderDate;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProductPerformanceResponse {
        private Long productId;
        private String productTitle;
        private Integer totalSales;
        private BigDecimal revenue;
        private BigDecimal carbonSaved;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class BuyerInsightResponse {
        private Long buyerId;
        private String buyerName;
        private Integer totalOrders;
        private BigDecimal totalSpent;
        private java.time.LocalDateTime lastOrderDate;
    }
}
