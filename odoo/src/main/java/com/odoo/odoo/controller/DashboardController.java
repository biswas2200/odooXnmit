package com.odoo.odoo.controller;

import com.odoo.odoo.dto.response.BuyerDashboardResponse;
import com.odoo.odoo.dto.response.OrderResponse;
import com.odoo.odoo.dto.response.SellerDashboardResponse;
import com.odoo.odoo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/seller")
    public ResponseEntity<SellerDashboardResponse> getSellerDashboard(Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            SellerDashboardResponse dashboard = dashboardService.getSellerDashboard(userEmail);
            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buyer")
    public ResponseEntity<BuyerDashboardResponse> getBuyerDashboard(Authentication authentication) {
        try {
            String userEmail = authentication.getName();
            BuyerDashboardResponse dashboard = dashboardService.getBuyerDashboard(userEmail);
            return ResponseEntity.ok(dashboard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/seller/orders")
    public ResponseEntity<List<OrderResponse>> getSellerOrders(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            String userEmail = authentication.getName();
            List<OrderResponse> orders = dashboardService.getSellerOrders(userEmail, page, size);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/buyer/orders")
    public ResponseEntity<List<OrderResponse>> getBuyerOrders(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            String userEmail = authentication.getName();
            List<OrderResponse> orders = dashboardService.getBuyerOrders(userEmail, page, size);
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/seller/analytics")
    public ResponseEntity<SellerDashboardResponse.ProductPerformanceResponse> getSellerAnalytics(
            Authentication authentication,
            @RequestParam(required = false) String timeRange) {
        try {
            String userEmail = authentication.getName();
            // For now, return basic analytics - can be extended based on timeRange
            SellerDashboardResponse dashboard = dashboardService.getSellerDashboard(userEmail);
            return ResponseEntity.ok(dashboard.getTopProducts().get(0)); // Example - extend as needed
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
