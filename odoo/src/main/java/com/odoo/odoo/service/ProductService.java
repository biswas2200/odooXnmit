package com.odoo.odoo.service;


import com.odoo.odoo.dto.request.ProductRequest;
import com.odoo.odoo.dto.response.ProductResponse;
import com.odoo.odoo.exception.ResourceNotFoundException;
import com.odoo.odoo.model.Category;
import com.odoo.odoo.model.Product;
import com.odoo.odoo.model.User;
import com.odoo.odoo.repository.ProductRepository;
import com.odoo.odoo.util.CarbonCalculatorUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final UserService userService;
    private final CarbonCalculatorUtil carbonCalculatorUtil;

    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        Page<Product> products = productRepository.findByStatusOrderByCreatedAtDesc(
                Product.ProductStatus.ACTIVE, pageable);
        return products.map(this::convertToResponse);
    }

    public Page<ProductResponse> getProductsByCategory(Long categoryId, Pageable pageable) {
        Page<Product> products = productRepository.findByCategoryIdAndStatusOrderByCreatedAtDesc(
                categoryId, Product.ProductStatus.ACTIVE, pageable);
        return products.map(this::convertToResponse);
    }

    public Page<ProductResponse> searchProducts(String keyword, Pageable pageable) {
        Page<Product> products = productRepository.findByKeywordAndStatus(
                keyword, Product.ProductStatus.ACTIVE, pageable);
        return products.map(this::convertToResponse);
    }

    public ProductResponse getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToResponse(product);
    }

    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        User seller = userService.getCurrentUser();
        Category category = categoryService.getCategoryById(request.getCategoryId());

        Product product = Product.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(category)
                .seller(seller)
                .imageUrl(request.getImageUrl())
                .conditionRating(request.getConditionRating() != null ?
                        request.getConditionRating() : Product.ConditionRating.GOOD)
                .weight(request.getWeight() != null ? request.getWeight() : BigDecimal.ONE)
                .build();

        // Calculate carbon footprint
        BigDecimal carbonSavings = carbonCalculatorUtil.calculateCarbonSavings(product);
        product.setCarbonFootprint(carbonSavings);

        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }

    @Transactional
    public ProductResponse updateProduct(Long id, ProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        User currentUser = userService.getCurrentUser();
        if (!product.getSeller().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only update your own products");
        }

        Category category = categoryService.getCategoryById(request.getCategoryId());

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(category);
        product.setImageUrl(request.getImageUrl());
        product.setConditionRating(request.getConditionRating());
        product.setWeight(request.getWeight());

        // Recalculate carbon footprint
        BigDecimal carbonSavings = carbonCalculatorUtil.calculateCarbonSavings(product);
        product.setCarbonFootprint(carbonSavings);

        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        User currentUser = userService.getCurrentUser();
        if (!product.getSeller().getId().equals(currentUser.getId())) {
            throw new RuntimeException("You can only delete your own products");
        }

        productRepository.delete(product);
    }

    public List<ProductResponse> getMyProducts() {
        User currentUser = userService.getCurrentUser();
        List<Product> products = productRepository.findBySeller(currentUser);
        return products.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse convertToResponse(Product product) {
        BigDecimal co2Saved = product.getCarbonFootprint() != null ?
                product.getCarbonFootprint() : BigDecimal.ZERO;
        BigDecimal treesEquivalent = carbonCalculatorUtil.calculateTreesEquivalent(co2Saved);
        BigDecimal waterSaved = carbonCalculatorUtil.calculateWaterSaved(co2Saved);

        ProductResponse.SustainabilityMetrics metrics = ProductResponse.SustainabilityMetrics.builder()
                .co2Saved(co2Saved)
                .treesEquivalent(treesEquivalent)
                .waterSaved(waterSaved)
                .build();

        return ProductResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .categoryName(product.getCategory() != null ? product.getCategory().getName() : null)
                .sellerUsername(product.getSeller().getUsername())
                .imageUrl(product.getImageUrl())
                .conditionRating(product.getConditionRating())
                .carbonFootprint(product.getCarbonFootprint())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .sustainabilityMetrics(metrics)
                .build();
    }
}
