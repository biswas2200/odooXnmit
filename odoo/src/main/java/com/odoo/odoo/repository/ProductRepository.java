package com.odoo.odoo.repository;

import com.odoo.odoo.model.Product;
import com.odoo.odoo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByStatusOrderByCreatedAtDesc(Product.ProductStatus status, Pageable pageable);

    Page<Product> findByCategoryIdAndStatusOrderByCreatedAtDesc(Long categoryId, Product.ProductStatus status, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.status = :status AND " +
            "(LOWER(p.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(p.description) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Product> findByKeywordAndStatus(@Param("keyword") String keyword,
                                         @Param("status") Product.ProductStatus status,
                                         Pageable pageable);

    List<Product> findBySellerAndStatusOrderByCreatedAtDesc(User seller, Product.ProductStatus status);

    List<Product> findBySeller(User seller);

    @Query("SELECT COUNT(p) FROM Product p WHERE p.seller = :seller AND p.status = :status")
    Long countBySellerAndStatus(@Param("seller") User seller, @Param("status") Product.ProductStatus status);
}