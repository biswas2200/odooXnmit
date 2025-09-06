package com.odoo.odoo.repository;

import com.odoo.odoo.model.Cart;
import com.odoo.odoo.model.CartItem;
import com.odoo.odoo.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
    List<CartItem> findByCart(Cart cart);  
    void deleteByCartAndProduct(Cart cart, Product product);
}
