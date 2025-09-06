package com.odoo.odoo.dto.response;

import com.odoo.odoo.model.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String title;
    private String description;
    private BigDecimal price;
    private String categoryName;
    private String sellerUsername;
    private String imageUrl;
    private Product.ConditionRating conditionRating;
    private BigDecimal carbonFootprint;
    private Product.ProductStatus status;
    private LocalDateTime createdAt;
    private SustainabilityMetrics sustainabilityMetrics;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SustainabilityMetrics {
        private BigDecimal co2Saved;
        private BigDecimal treesEquivalent;
        private BigDecimal waterSaved;
    }
}