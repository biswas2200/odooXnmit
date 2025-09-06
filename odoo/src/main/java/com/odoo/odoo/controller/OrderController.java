package com.odoo.odoo.controller;

import com.odoo.odoo.dto.request.PlaceOrderRequest;
import com.odoo.odoo.dto.response.OrderResponse;
import com.odoo.odoo.model.Order;
import com.odoo.odoo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@Valid @RequestBody PlaceOrderRequest request, 
                                       Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            OrderResponse order = orderService.placeOrder(userEmail, request);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error placing order: " + e.getMessage());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long orderId, 
                                                 Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            OrderResponse order = orderService.getOrderById(orderId, userEmail);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId,
                                              @RequestParam Order.OrderStatus status,
                                              Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            OrderResponse order = orderService.updateOrderStatus(orderId, status, userEmail);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error updating order status: " + e.getMessage());
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId,
                                        Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            orderService.cancelOrder(orderId, userEmail);
            return ResponseEntity.ok().body("Order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error cancelling order: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderResponse>> getUserOrders(Authentication authentication,
                                                           @RequestParam(defaultValue = "0") int page,
                                                           @RequestParam(defaultValue = "10") int size) {
        try {
            String userEmail = authentication.getName();
            List<OrderResponse> orders = orderService.getUserOrders(userEmail, page, size);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/track/{orderId}")
    public ResponseEntity<?> trackOrder(@PathVariable Long orderId,
                                       Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            // For now, return the order with status - can be extended with detailed tracking
            OrderResponse order = orderService.getOrderById(orderId, userEmail);
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error tracking order: " + e.getMessage());
        }
    }
}
