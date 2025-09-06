package com.odoo.odoo.repository;


import com.odoo.odoo.model.Order;
import com.odoo.odoo.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    Page<Order> findByBuyerOrderByCreatedAtDesc(User buyer, Pageable pageable);
    List<Order> findByBuyerOrderByCreatedAtDesc(User buyer);

    @Query("SELECT SUM(o.totalCarbonSaved) FROM Order o WHERE o.buyer = :buyer")
    BigDecimal getTotalCarbonSavedByUser(@Param("buyer") User buyer);

    @Query("SELECT COUNT(o) FROM Order o WHERE o.buyer = :buyer")
    Long countOrdersByUser(@Param("buyer") User buyer);
}
