package com.odoo.odoo.dto.response;

import com.odoo.odoo.model.Order;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String buyerName;
    private String sellerName;
    private BigDecimal totalAmount;
    private BigDecimal totalCarbonSaved;
    private Order.OrderStatus status;
    private String deliveryAddress;
    private String notes;
    private LocalDateTime orderDate;
    private List<OrderItemResponse> items;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class OrderItemResponse {
        private Long id;
        private Long productId;
        private String productTitle;
        private String productImage;
        private BigDecimal price;
        private Integer quantity;
        private BigDecimal carbonFootprint;
    }
}
