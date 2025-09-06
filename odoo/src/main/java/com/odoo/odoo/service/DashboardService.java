package com.odoo.odoo.service;

import com.odoo.odoo.dto.response.BuyerDashboardResponse;
import com.odoo.odoo.dto.response.OrderResponse;
import com.odoo.odoo.dto.response.SellerDashboardResponse;
import com.odoo.odoo.model.Order;
import com.odoo.odoo.model.OrderItem;
import com.odoo.odoo.model.Product;
import com.odoo.odoo.model.User;
import com.odoo.odoo.repository.OrderRepository;
import com.odoo.odoo.repository.ProductRepository;
import com.odoo.odoo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    public SellerDashboardResponse getSellerDashboard(String userEmail) {
        User seller = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        // Get seller's orders
        List<Order> sellerOrders = orderRepository.findBySellerIdOrderByCreatedAtDesc(seller.getId());

        // Calculate total earnings
        BigDecimal totalEarnings = sellerOrders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate total carbon saved
        BigDecimal totalCarbonSaved = sellerOrders.stream()
                .map(Order::getTotalCarbonSaved)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Get seller's products
        List<Product> sellerProducts = productRepository.findBySellerIdOrderByCreatedAtDesc(seller.getId());

        // Get recent orders (last 5)
        List<SellerDashboardResponse.RecentOrderResponse> recentOrders = sellerOrders.stream()
                .limit(5)
                .map(order -> SellerDashboardResponse.RecentOrderResponse.builder()
                        .orderId(order.getId())
                        .buyerName(order.getBuyer().getFullName())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus().toString())
                        .orderDate(order.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        // Calculate product performance
        List<SellerDashboardResponse.ProductPerformanceResponse> topProducts = calculateProductPerformance(sellerProducts, sellerOrders);

        // Get top buyers
        List<SellerDashboardResponse.BuyerInsightResponse> topBuyers = calculateTopBuyers(sellerOrders);

        return SellerDashboardResponse.builder()
                .totalEarnings(totalEarnings)
                .totalOrders((long) sellerOrders.size())
                .totalProducts((long) sellerProducts.size())
                .totalCarbonSaved(totalCarbonSaved)
                .recentOrders(recentOrders)
                .topProducts(topProducts)
                .topBuyers(topBuyers)
                .build();
    }

    public BuyerDashboardResponse getBuyerDashboard(String userEmail) {
        User buyer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        // Get buyer's orders
        List<Order> buyerOrders = orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyer.getId());

        // Calculate total spent
        BigDecimal totalSpent = buyerOrders.stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Calculate personal carbon saved
        BigDecimal personalCarbonSaved = buyerOrders.stream()
                .map(Order::getTotalCarbonSaved)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Get active orders (pending, processing, shipped)
        List<BuyerDashboardResponse.OrderSummaryResponse> activeOrders = buyerOrders.stream()
                .filter(order -> order.getStatus() != Order.OrderStatus.DELIVERED && 
                               order.getStatus() != Order.OrderStatus.CANCELLED)
                .map(order -> BuyerDashboardResponse.OrderSummaryResponse.builder()
                        .orderId(order.getId())
                        .sellerName(order.getSeller().getFullName())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus().toString())
                        .orderDate(order.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        // Get recent orders (last 5)
        List<BuyerDashboardResponse.OrderSummaryResponse> recentOrders = buyerOrders.stream()
                .limit(5)
                .map(order -> BuyerDashboardResponse.OrderSummaryResponse.builder()
                        .orderId(order.getId())
                        .sellerName(order.getSeller().getFullName())
                        .totalAmount(order.getTotalAmount())
                        .status(order.getStatus().toString())
                        .orderDate(order.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        // Calculate sustainability achievements
        BuyerDashboardResponse.SustainabilityAchievements achievements = calculateSustainabilityAchievements(personalCarbonSaved, buyerOrders.size());

        return BuyerDashboardResponse.builder()
                .totalPurchases((long) buyerOrders.size())
                .totalSpent(totalSpent)
                .personalCarbonSaved(personalCarbonSaved)
                .activeOrders(activeOrders)
                .recentOrders(recentOrders)
                .savedProducts(List.of()) // Can be implemented with favorites/wishlist
                .sustainabilityAchievements(achievements)
                .build();
    }

    public List<OrderResponse> getSellerOrders(String userEmail, int page, int size) {
        User seller = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Seller not found"));

        List<Order> orders = orderRepository.findBySellerIdOrderByCreatedAtDesc(seller.getId());

        return orders.stream()
                .skip((long) page * size)
                .limit(size)
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getBuyerOrders(String userEmail, int page, int size) {
        User buyer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Buyer not found"));

        List<Order> orders = orderRepository.findByBuyerIdOrderByCreatedAtDesc(buyer.getId());

        return orders.stream()
                .skip((long) page * size)
                .limit(size)
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    private List<SellerDashboardResponse.ProductPerformanceResponse> calculateProductPerformance(
            List<Product> products, List<Order> orders) {
        
        Map<Long, Long> productSales = orders.stream()
                .flatMap(order -> order.getItems().stream())
                .collect(Collectors.groupingBy(
                        item -> item.getProduct().getId(),
                        Collectors.summingLong(OrderItem::getQuantity)
                ));

        return products.stream()
                .limit(5) // Top 5 products
                .map(product -> SellerDashboardResponse.ProductPerformanceResponse.builder()
                        .productId(product.getId())
                        .productTitle(product.getTitle())
                        .totalSales(productSales.getOrDefault(product.getId(), 0L).intValue())
                        .revenue(product.getPrice().multiply(BigDecimal.valueOf(productSales.getOrDefault(product.getId(), 0L))))
                        .carbonSaved(product.getCarbonFootprint().multiply(BigDecimal.valueOf(productSales.getOrDefault(product.getId(), 0L))))
                        .build())
                .collect(Collectors.toList());
    }

    private List<SellerDashboardResponse.BuyerInsightResponse> calculateTopBuyers(List<Order> orders) {
        Map<User, BigDecimal> buyerSpending = orders.stream()
                .collect(Collectors.groupingBy(
                        Order::getBuyer,
                        Collectors.reducing(BigDecimal.ZERO, Order::getTotalAmount, BigDecimal::add)
                ));

        return buyerSpending.entrySet().stream()
                .sorted(Map.Entry.<User, BigDecimal>comparingByValue().reversed())
                .limit(5) // Top 5 buyers
                .map(entry -> SellerDashboardResponse.BuyerInsightResponse.builder()
                        .buyerId(entry.getKey().getId())
                        .buyerName(entry.getKey().getFullName())
                        .totalSpent(entry.getValue())
                        .totalOrders((int) orders.stream().filter(order -> order.getBuyer().equals(entry.getKey())).count())
                        .lastOrderDate(orders.stream()
                                .filter(order -> order.getBuyer().equals(entry.getKey()))
                                .map(Order::getCreatedAt)
                                .max(LocalDateTime::compareTo)
                                .orElse(null))
                        .build())
                .collect(Collectors.toList());
    }

    private BuyerDashboardResponse.SustainabilityAchievements calculateSustainabilityAchievements(
            BigDecimal carbonSaved, int totalOrders) {
        
        String level = "Eco Beginner";
        String nextLevel = "Eco Explorer";
        int progressToNext = 25;

        if (carbonSaved.compareTo(BigDecimal.valueOf(100)) >= 0) {
            level = "Eco Champion";
            nextLevel = "Eco Master";
            progressToNext = 75;
        } else if (carbonSaved.compareTo(BigDecimal.valueOf(50)) >= 0) {
            level = "Eco Explorer";
            nextLevel = "Eco Champion";
            progressToNext = 50;
        }

        return BuyerDashboardResponse.SustainabilityAchievements.builder()
                .level(level)
                .nextLevel(nextLevel)
                .progressToNext(progressToNext)
                .badges(List.of("First Purchase", "Carbon Saver", "Eco Conscious"))
                .build();
    }

    private OrderResponse convertToOrderResponse(Order order) {
        List<OrderResponse.OrderItemResponse> items = order.getItems().stream()
                .map(item -> OrderResponse.OrderItemResponse.builder()
                        .id(item.getId())
                        .productId(item.getProduct().getId())
                        .productTitle(item.getProduct().getTitle())
                        .productImage(item.getProduct().getImageUrl())
                        .price(item.getPrice())
                        .quantity(item.getQuantity())
                        .carbonFootprint(item.getProduct().getCarbonFootprint())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .buyerName(order.getBuyer().getFullName())
                .sellerName(order.getSeller().getFullName())
                .totalAmount(order.getTotalAmount())
                .totalCarbonSaved(order.getTotalCarbonSaved())
                .status(order.getStatus())
                .deliveryAddress(order.getDeliveryAddress())
                .notes(order.getNotes())
                .orderDate(order.getCreatedAt())
                .items(items)
                .build();
    }
}
