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
public class CartResponse {
    private Long id;
    private List<CartItemResponse> items;
    private BigDecimal totalAmount;
    private BigDecimal totalCarbonSaved;
    private Integer itemCount;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemResponse {
        private Long id;
        private Long productId;
        private String title;
        private BigDecimal price;
        private Integer quantity;
        private String imageUrl;
        private BigDecimal carbonFootprint;
    }
}
