package com.odoo.odoo.service;

import com.odoo.odoo.dto.request.PlaceOrderRequest;
import com.odoo.odoo.dto.response.OrderResponse;
import com.odoo.odoo.model.*;
import com.odoo.odoo.repository.CartRepository;
import com.odoo.odoo.repository.OrderRepository;
import com.odoo.odoo.repository.ProductRepository;
import com.odoo.odoo.repository.UserRepository;
import com.odoo.odoo.util.CarbonCalculatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CarbonCalculatorUtil carbonCalculatorUtil;

    @Transactional
    public OrderResponse placeOrder(String userEmail, PlaceOrderRequest request) {
        User buyer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Get cart items for the buyer
        List<CartItem> cartItems = cartRepository.findByBuyerId(buyer.getId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // Group cart items by seller
        List<Order> orders = cartItems.stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSeller()))
                .entrySet().stream()
                .map(entry -> createOrderForSeller(buyer, entry.getKey(), entry.getValue(), request))
                .collect(Collectors.toList());

        // Save all orders
        orders = orderRepository.saveAll(orders);

        // Clear the cart after successful order placement
        cartRepository.deleteByBuyerId(buyer.getId());

        // Return the first order response (if multiple sellers, you might want to return a list)
        return convertToOrderResponse(orders.get(0));
    }

    public OrderResponse getOrderById(Long orderId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Check if user is authorized to view this order
        if (!order.getBuyer().getId().equals(user.getId()) && 
            !order.getSeller().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to view this order");
        }

        return convertToOrderResponse(order);
    }

    @Transactional
    public OrderResponse updateOrderStatus(Long orderId, Order.OrderStatus status, String userEmail) {
        User seller = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Only sellers can update order status
        if (!order.getSeller().getId().equals(seller.getId())) {
            throw new RuntimeException("Only the seller can update order status");
        }

        order.setStatus(status);
        order = orderRepository.save(order);

        return convertToOrderResponse(order);
    }

    @Transactional
    public void cancelOrder(Long orderId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Both buyer and seller can cancel orders, but only if not delivered
        if (!order.getBuyer().getId().equals(user.getId()) && 
            !order.getSeller().getId().equals(user.getId())) {
            throw new RuntimeException("Not authorized to cancel this order");
        }

        if (order.getStatus() == Order.OrderStatus.DELIVERED) {
            throw new RuntimeException("Cannot cancel delivered order");
        }

        order.setStatus(Order.OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

    public List<OrderResponse> getUserOrders(String userEmail, int page, int size) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        
        // Get orders where user is either buyer or seller
        List<Order> orders;
        if (user.getRole() == User.UserRole.SELLER) {
            orders = orderRepository.findBySellerIdOrderByCreatedAtDesc(user.getId());
        } else {
            orders = orderRepository.findByBuyerIdOrderByCreatedAtDesc(user.getId());
        }

        return orders.stream()
                .skip((long) page * size)
                .limit(size)
                .map(this::convertToOrderResponse)
                .collect(Collectors.toList());
    }

    private Order createOrderForSeller(User buyer, User seller, List<CartItem> cartItems, PlaceOrderRequest request) {
        Order order = new Order();
        order.setBuyer(buyer);
        order.setSeller(seller);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus(Order.OrderStatus.PENDING);
        order.setDeliveryAddress(request.getDeliveryAddress());
        order.setNotes(request.getNotes());

        // Calculate totals
        BigDecimal totalAmount = BigDecimal.ZERO;
        BigDecimal totalCarbonSaved = BigDecimal.ZERO;

        List<OrderItem> orderItems = cartItems.stream()
                .map(cartItem -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setProduct(cartItem.getProduct());
                    orderItem.setQuantity(cartItem.getQuantity());
                    orderItem.setPrice(cartItem.getProduct().getPrice());
                    return orderItem;
                })
                .collect(Collectors.toList());

        // Calculate totals
        totalAmount = orderItems.stream()
                .map(item -> item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        totalCarbonSaved = orderItems.stream()
                .map(item -> item.getProduct().getCarbonFootprint().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        order.setTotalAmount(totalAmount);
        order.setTotalCarbonSaved(totalCarbonSaved);
        order.setItems(orderItems);

        return order;
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
