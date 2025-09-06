package com.odoo.odoo.service;

import com.odoo.odoo.dto.request.CartItemRequest;
import com.odoo.odoo.dto.response.CartResponse;
import com.odoo.odoo.exception.ResourceNotFoundException;
import com.odoo.odoo.model.*;
import com.odoo.odoo.repository.CartItemRepository;
import com.odoo.odoo.repository.CartRepository;
import com.odoo.odoo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final UserService userService;

    public CartResponse getCart() {
        User user = userService.getCurrentUser();
        Cart cart = getOrCreateCart(user);

        return convertToResponse(cart);
    }

    @Transactional
    public CartResponse addToCart(CartItemRequest request) {
        User user = userService.getCurrentUser();
        Cart cart = getOrCreateCart(user);

        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (product.getSeller().getId().equals(user.getId())) {
            throw new RuntimeException("You cannot add your own product to cart");
        }

        // Check if item already exists in cart
        CartItem existingItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + request.getQuantity());
            cartItemRepository.save(existingItem);
        } else {
            CartItem cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .build();
            cartItemRepository.save(cartItem);
        }

        // Refresh cart to get updated items
        cart = cartRepository.findById(cart.getId()).orElse(cart);
        return convertToResponse(cart);
    }

    @Transactional
    public CartResponse updateCartItem(Long productId, Integer quantity) {
        User user = userService.getCurrentUser();
        Cart cart = getOrCreateCart(user);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        CartItem cartItem = cartItemRepository.findByCartAndProduct(cart, product)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

        if (quantity <= 0) {
            cartItemRepository.delete(cartItem);
        } else {
            cartItem.setQuantity(quantity);
            cartItemRepository.save(cartItem);
        }

        // Refresh cart
        cart = cartRepository.findById(cart.getId()).orElse(cart);
        return convertToResponse(cart);
    }

    @Transactional
    public void removeFromCart(Long productId) {
        User user = userService.getCurrentUser();
        Cart cart = getOrCreateCart(user);

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        cartItemRepository.deleteByCartAndProduct(cart, product);
    }

    @Transactional
    public void clearCart() {
        User user = userService.getCurrentUser();
        Cart cart = getOrCreateCart(user);

        List<CartItem> items = cartItemRepository.findByCart(cart);
        cartItemRepository.deleteAll(items);
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();
                    return cartRepository.save(newCart);
                });
    }

    private CartResponse convertToResponse(Cart cart) {
        // Get fresh cart items
        List<CartItem> cartItems = cartItemRepository.findByCart(cart);

        List<CartResponse.CartItemResponse> items = cartItems.stream()
                .map(this::convertItemToResponse)
                .collect(Collectors.toList());

        BigDecimal totalAmount = items.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalCarbonSaved = items.stream()
                .map(item -> item.getCarbonFootprint() != null ?
                        item.getCarbonFootprint().multiply(BigDecimal.valueOf(item.getQuantity())) :
                        BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .id(cart.getId())
                .items(items)
                .totalAmount(totalAmount)
                .totalCarbonSaved(totalCarbonSaved)
                .itemCount(items.size())
                .build();
    }

    private CartResponse.CartItemResponse convertItemToResponse(CartItem cartItem) {
        Product product = cartItem.getProduct();

        return CartResponse.CartItemResponse.builder()
                .id(cartItem.getId())
                .productId(product.getId())
                .title(product.getTitle())
                .price(product.getPrice())
                .quantity(cartItem.getQuantity())
                .imageUrl(product.getImageUrl())
                .carbonFootprint(product.getCarbonFootprint())
                .build();
    }
}