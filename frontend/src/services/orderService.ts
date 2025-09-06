import { apiClient, handleApiError } from './api';
import { Order, OrderHistory, OrderFilters } from '@/types/order';

export const orderService = {
  // Get user's orders
  async getOrders(filters?: OrderFilters, page = 1, limit = 20): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v.toString()));
            } else if (key === 'dateRange') {
              params.append('startDate', value.start);
              params.append('endDate', value.end);
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get(`/orders?${params.toString()}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get single order by ID
  async getOrder(id: string): Promise<Order> {
    try {
      const response = await apiClient.get<Order>(`/orders/${id}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get order history summary
  async getOrderHistory(): Promise<OrderHistory> {
    try {
      const response = await apiClient.get<OrderHistory>('/orders/history');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Cancel order
  async cancelOrder(id: string, reason?: string): Promise<void> {
    try {
      await apiClient.put(`/orders/${id}/cancel`, { reason });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Request order refund
  async requestRefund(id: string, reason: string, description?: string): Promise<void> {
    try {
      await apiClient.post(`/orders/${id}/refund`, {
        reason,
        description,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Track order
  async trackOrder(id: string): Promise<{
    status: string;
    trackingNumber?: string;
    carrier?: string;
    estimatedDelivery?: string;
    trackingUrl?: string;
    updates: {
      status: string;
      timestamp: string;
      location?: string;
      description?: string;
    }[];
  }> {
    try {
      const response = await apiClient.get(`/orders/${id}/track`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update order status (for sellers)
  async updateOrderStatus(id: string, status: string, notes?: string): Promise<void> {
    try {
      await apiClient.put(`/orders/${id}/status`, {
        status,
        notes,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Add tracking information (for sellers)
  async addTrackingInfo(id: string, trackingNumber: string, carrier: string): Promise<void> {
    try {
      await apiClient.put(`/orders/${id}/tracking`, {
        trackingNumber,
        carrier,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get seller's orders
  async getSellerOrders(filters?: OrderFilters, page = 1, limit = 20): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v.toString()));
            } else if (key === 'dateRange') {
              params.append('startDate', value.start);
              params.append('endDate', value.end);
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get(`/orders/seller?${params.toString()}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get order statistics
  async getOrderStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
  }> {
    try {
      const response = await apiClient.get('/orders/stats');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get seller order statistics
  async getSellerOrderStats(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    topProducts: {
      productId: string;
      productName: string;
      quantitySold: number;
      revenue: number;
    }[];
  }> {
    try {
      const response = await apiClient.get('/orders/seller/stats');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Mark order as delivered
  async markAsDelivered(id: string): Promise<void> {
    try {
      await apiClient.put(`/orders/${id}/delivered`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Confirm order receipt
  async confirmReceipt(id: string): Promise<void> {
    try {
      await apiClient.put(`/orders/${id}/confirm`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Leave order review
  async leaveReview(orderId: string, productId: string, rating: number, comment: string): Promise<void> {
    try {
      await apiClient.post(`/orders/${orderId}/review`, {
        productId,
        rating,
        comment,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get order reviews
  async getOrderReviews(orderId: string): Promise<{
    reviews: {
      id: string;
      productId: string;
      rating: number;
      comment: string;
      createdAt: string;
    }[];
  }> {
    try {
      const response = await apiClient.get(`/orders/${orderId}/reviews`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Download order invoice
  async downloadInvoice(orderId: string): Promise<Blob> {
    try {
      const response = await apiClient.get(`/orders/${orderId}/invoice`, {
        responseType: 'blob',
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Reorder items
  async reorder(orderId: string): Promise<{
    cartItems: string[];
    message: string;
  }> {
    try {
      const response = await apiClient.post(`/orders/${orderId}/reorder`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
