package com.odoo.odoo.repository;


import com.odoo.odoo.model.Cart;
import com.odoo.odoo.model.CartItem;
import com.odoo.odoo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByUser(User user);
    
    @Query("SELECT ci FROM CartItem ci WHERE ci.cart.user.id = :buyerId")
    List<CartItem> findByBuyerId(@Param("buyerId") Long buyerId);
    
    @Query("DELETE FROM CartItem ci WHERE ci.cart.user.id = :buyerId")
    void deleteByBuyerId(@Param("buyerId") Long buyerId);
}
