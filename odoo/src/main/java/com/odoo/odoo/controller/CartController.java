package com.odoo.odoo.controller;

import com.odoo.odoo.dto.request.CartItemRequest;
import com.odoo.odoo.dto.response.CartResponse;
import com.odoo.odoo.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Tag(name = "Cart", description = "Shopping cart management APIs")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    @GetMapping
    @Operation(summary = "Get current user's cart")
    public ResponseEntity<CartResponse> getCart() {
        CartResponse cart = cartService.getCart();
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/add")
    @Operation(summary = "Add item to cart")
    public ResponseEntity<CartResponse> addToCart(@Valid @RequestBody CartItemRequest request) {
        CartResponse cart = cartService.addToCart(request);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/update/{productId}")
    @Operation(summary = "Update cart item quantity")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {
        CartResponse cart = cartService.updateCartItem(productId, quantity);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/remove/{productId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId) {
        cartService.removeFromCart(productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/clear")
    @Operation(summary = "Clear all items from cart")
    public ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }
}