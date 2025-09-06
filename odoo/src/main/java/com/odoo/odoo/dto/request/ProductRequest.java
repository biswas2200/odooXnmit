package com.odoo.odoo.dto.request;

import com.odoo.odoo.model.Product;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    private BigDecimal price;

    @NotNull(message = "Category is required")
    private Long categoryId;

    private String imageUrl;
    private Product.ConditionRating conditionRating;
    private BigDecimal weight;
}