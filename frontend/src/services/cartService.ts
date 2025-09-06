import { apiClient, handleApiError } from './api';
import { Cart, CartItem, CartSummary, CheckoutData } from '@/types/cart';

export const cartService = {
  // Get user's cart
  async getCart(): Promise<Cart> {
    try {
      const response = await apiClient.get<Cart>('/cart');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Add item to cart
  async addToCart(productId: string, quantity = 1): Promise<CartItem> {
    try {
      const response = await apiClient.post<CartItem>('/cart/items', {
        productId,
        quantity,
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update cart item quantity
  async updateCartItem(itemId: string, quantity: number): Promise<CartItem> {
    try {
      const response = await apiClient.put<CartItem>(`/cart/items/${itemId}`, {
        quantity,
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Remove item from cart
  async removeFromCart(itemId: string): Promise<void> {
    try {
      await apiClient.delete(`/cart/items/${itemId}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Clear entire cart
  async clearCart(): Promise<void> {
    try {
      await apiClient.delete('/cart');
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get cart summary
  async getCartSummary(): Promise<CartSummary> {
    try {
      const response = await apiClient.get<CartSummary>('/cart/summary');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Apply discount code
  async applyDiscountCode(code: string): Promise<{
    discount: number;
    message: string;
  }> {
    try {
      const response = await apiClient.post<{
        discount: number;
        message: string;
      }>('/cart/discount', { code });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Remove discount code
  async removeDiscountCode(): Promise<void> {
    try {
      await apiClient.delete('/cart/discount');
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Calculate shipping
  async calculateShipping(address: {
    city: string;
    state: string;
    country: string;
  }): Promise<{
    shipping: number;
    estimatedDays: number;
    carrier: string;
  }> {
    try {
      const response = await apiClient.post<{
        shipping: number;
        estimatedDays: number;
        carrier: string;
      }>('/cart/shipping', address);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Validate cart before checkout
  async validateCart(): Promise<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      const response = await apiClient.get<{
        isValid: boolean;
        errors: string[];
        warnings: string[];
      }>('/cart/validate');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Proceed to checkout
  async checkout(data: CheckoutData): Promise<{
    orderId: string;
    paymentIntentId?: string;
    clientSecret?: string;
  }> {
    try {
      const response = await apiClient.post<{
        orderId: string;
        paymentIntentId?: string;
        clientSecret?: string;
      }>('/cart/checkout', data);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get cart count
  async getCartCount(): Promise<number> {
    try {
      const response = await apiClient.get<{ count: number }>('/cart/count');
      return response.count;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Sync cart with local storage
  async syncCart(): Promise<void> {
    try {
      const localCart = localStorage.getItem('ecofinds_cart');
      if (localCart) {
        const cartData = JSON.parse(localCart);
        await apiClient.post('/cart/sync', cartData);
      }
    } catch (error) {
      console.error('Cart sync error:', error);
    }
  },

  // Save cart to local storage
  saveCartToLocal(cart: Cart): void {
    localStorage.setItem('ecofinds_cart', JSON.stringify(cart));
  },

  // Get cart from local storage
  getCartFromLocal(): Cart | null {
    try {
      const localCart = localStorage.getItem('ecofinds_cart');
      return localCart ? JSON.parse(localCart) : null;
    } catch {
      return null;
    }
  },

  // Clear local cart
  clearLocalCart(): void {
    localStorage.removeItem('ecofinds_cart');
  },

  // Merge local cart with server cart
  async mergeCarts(): Promise<Cart> {
    try {
      const response = await apiClient.post<Cart>('/cart/merge');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
