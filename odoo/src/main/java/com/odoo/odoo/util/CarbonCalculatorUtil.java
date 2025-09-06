package com.odoo.odoo.util;


import com.odoo.odoo.model.Category;
import com.odoo.odoo.model.Product;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Component
public class CarbonCalculatorUtil {

    // Carbon emission factors (kg CO2 per kg of product)
    private static final BigDecimal ELECTRONICS_FACTOR = new BigDecimal("45.2");
    private static final BigDecimal FURNITURE_FACTOR = new BigDecimal("12.8");
    private static final BigDecimal BOOKS_FACTOR = new BigDecimal("2.7");
    private static final BigDecimal CLOTHING_FACTOR = new BigDecimal("15.1");
    private static final BigDecimal DEFAULT_FACTOR = new BigDecimal("10.0");

    // Transport factor for second-hand (15% of new product emissions)
    private static final BigDecimal TRANSPORT_FACTOR = new BigDecimal("0.15");

    public BigDecimal calculateCarbonSavings(Product product) {
        BigDecimal weight = product.getWeight() != null ? product.getWeight() : BigDecimal.ONE;
        BigDecimal emissionFactor = getEmissionFactor(product.getCategory());

        // New product emissions
        BigDecimal newProductEmissions = weight.multiply(emissionFactor);

        // Second-hand product emissions (only transport/handling)
        BigDecimal secondHandEmissions = newProductEmissions.multiply(TRANSPORT_FACTOR);

        // Carbon savings
        BigDecimal carbonSavings = newProductEmissions.subtract(secondHandEmissions);

        return carbonSavings.setScale(2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateTreesEquivalent(BigDecimal co2Saved) {
        // 1 tree absorbs approximately 21.77 kg CO2 per year
        BigDecimal treeFactor = new BigDecimal("21.77");
        return co2Saved.divide(treeFactor, 2, RoundingMode.HALF_UP);
    }

    public BigDecimal calculateWaterSaved(BigDecimal co2Saved) {
        // Approximate water savings (liters) per kg CO2 avoided
        BigDecimal waterFactor = new BigDecimal("45.2");
        return co2Saved.multiply(waterFactor).setScale(0, RoundingMode.HALF_UP);
    }

    private BigDecimal getEmissionFactor(Category category) {
        if (category == null) {
            return DEFAULT_FACTOR;
        }

        String categoryName = category.getName().toLowerCase();

        return switch (categoryName) {
            case "electronics", "computers", "phones", "gadgets" -> ELECTRONICS_FACTOR;
            case "furniture", "home", "appliances" -> FURNITURE_FACTOR;
            case "books", "education", "textbooks" -> BOOKS_FACTOR;
            case "clothing", "fashion", "apparel" -> CLOTHING_FACTOR;
            default -> category.getCarbonFactor() != null ?
                    category.getCarbonFactor() : DEFAULT_FACTOR;
        };
    }
}
