import api from './api';

export const cartService = {
  async getCart() {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch cart');
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add item to cart');
    }
  },

  async updateCartItem(productId, quantity) {
    try {
      const response = await api.put(`/cart/update/${productId}?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update cart item');
    }
  },

  async removeFromCart(productId) {
    try {
      const response = await api.delete(`/cart/remove/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove item from cart');
    }
  },

  async clearCart() {
    try {
      const response = await api.delete('/cart/clear');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to clear cart');
    }
  }
};
