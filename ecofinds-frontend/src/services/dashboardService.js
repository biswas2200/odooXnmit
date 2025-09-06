import api from './api';

class DashboardService {
  // Seller Dashboard
  async getSellerDashboard(token) {
    try {
      const response = await api.get('/dashboard/seller', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching seller dashboard:', error);
      throw error;
    }
  }

  async getSellerOrders(token, page = 0, size = 10) {
    try {
      const response = await api.get(`/dashboard/seller/orders?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching seller orders:', error);
      throw error;
    }
  }

  // Buyer Dashboard
  async getBuyerDashboard(token) {
    try {
      const response = await api.get('/dashboard/buyer', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching buyer dashboard:', error);
      throw error;
    }
  }

  async getBuyerOrders(token, page = 0, size = 10) {
    try {
      const response = await api.get(`/dashboard/buyer/orders?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching buyer orders:', error);
      throw error;
    }
  }

  // Order Management
  async updateOrderStatus(orderId, status, token) {
    try {
      const response = await api.put(`/orders/${orderId}/status?status=${status}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating order status:', error);
      throw error;
    }
  }

  async trackOrder(orderId, token) {
    try {
      const response = await api.get(`/orders/track/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error tracking order:', error);
      throw error;
    }
  }

  async cancelOrder(orderId, token) {
    try {
      const response = await api.delete(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  }

  // Order Placement
  async placeOrder(orderData, token) {
    try {
      const response = await api.post('/orders/place', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error placing order:', error);
      throw error;
    }
  }

  async getUserOrders(token, page = 0, size = 10) {
    try {
      const response = await api.get(`/orders/user?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
