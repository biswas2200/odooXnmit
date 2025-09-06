import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { cartService } from '@/services/cartService';
import { Cart, CartItem, CartSummary, CheckoutData } from '@/types/cart';

// Hook for fetching cart
export const useCart = () => {
  return useQuery(
    ['cart'],
    () => cartService.getCart(),
    {
      staleTime: 1 * 60 * 1000, // 1 minute
      refetchOnWindowFocus: true,
    }
  );
};

// Hook for fetching cart summary
export const useCartSummary = () => {
  return useQuery(
    ['cart', 'summary'],
    () => cartService.getCartSummary(),
    {
      staleTime: 1 * 60 * 1000, // 1 minute
    }
  );
};

// Hook for fetching cart count
export const useCartCount = () => {
  return useQuery(
    ['cart', 'count'],
    () => cartService.getCartCount(),
    {
      staleTime: 30 * 1000, // 30 seconds
      refetchOnWindowFocus: true,
    }
  );
};

// Hook for adding item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ productId, quantity }: { productId: string; quantity?: number }) =>
      cartService.addToCart(productId, quantity),
    {
      onSuccess: () => {
        // Invalidate cart-related queries
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'count']);
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for updating cart item
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartService.updateCartItem(itemId, quantity),
    {
      onSuccess: () => {
        // Invalidate cart-related queries
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for removing item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (itemId: string) => cartService.removeFromCart(itemId),
    {
      onSuccess: () => {
        // Invalidate cart-related queries
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'count']);
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for clearing cart
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => cartService.clearCart(),
    {
      onSuccess: () => {
        // Invalidate cart-related queries
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'count']);
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for applying discount code
export const useApplyDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (code: string) => cartService.applyDiscountCode(code),
    {
      onSuccess: () => {
        // Invalidate cart summary to reflect discount
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for removing discount code
export const useRemoveDiscount = () => {
  const queryClient = useQueryClient();

  return useMutation(
    () => cartService.removeDiscountCode(),
    {
      onSuccess: () => {
        // Invalidate cart summary to reflect discount removal
        queryClient.invalidateQueries(['cart', 'summary']);
      },
    }
  );
};

// Hook for calculating shipping
export const useCalculateShipping = () => {
  return useMutation(
    (address: { city: string; state: string; country: string }) =>
      cartService.calculateShipping(address)
  );
};

// Hook for validating cart
export const useValidateCart = () => {
  return useMutation(() => cartService.validateCart());
};

// Hook for checkout
export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CheckoutData) => cartService.checkout(data),
    {
      onSuccess: () => {
        // Clear cart after successful checkout
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'count']);
        queryClient.invalidateQueries(['cart', 'summary']);
        queryClient.invalidateQueries(['orders']);
      },
    }
  );
};

// Hook for managing cart state locally
export const useLocalCart = () => {
  const [localCart, setLocalCart] = useState<Cart | null>(null);

  useEffect(() => {
    const savedCart = cartService.getCartFromLocal();
    setLocalCart(savedCart);
  }, []);

  const saveToLocal = useCallback((cart: Cart) => {
    cartService.saveCartToLocal(cart);
    setLocalCart(cart);
  }, []);

  const clearLocal = useCallback(() => {
    cartService.clearLocalCart();
    setLocalCart(null);
  }, []);

  const syncWithServer = useCallback(async () => {
    try {
      await cartService.syncCart();
    } catch (error) {
      console.error('Cart sync failed:', error);
    }
  }, []);

  return {
    localCart,
    saveToLocal,
    clearLocal,
    syncWithServer,
  };
};

// Hook for cart operations with optimistic updates
export const useCartOperations = () => {
  const queryClient = useQueryClient();
  const [isOptimistic, setIsOptimistic] = useState(false);

  const addToCartOptimistic = useCallback(async (productId: string, quantity = 1) => {
    setIsOptimistic(true);
    
    try {
      // Optimistically update the cart
      const currentCart = queryClient.getQueryData<Cart>(['cart']);
      if (currentCart) {
        const optimisticCart = {
          ...currentCart,
          totalItems: currentCart.totalItems + quantity,
          items: [
            ...currentCart.items,
            {
              id: `temp-${Date.now()}`,
              productId,
              quantity,
              addedAt: new Date().toISOString(),
              product: {
                id: productId,
                title: 'Loading...',
                price: 0,
                images: [],
                size: '',
                color: '',
                seller: {
                  id: '',
                  username: '',
                },
              },
            },
          ],
        };
        
        queryClient.setQueryData(['cart'], optimisticCart);
      }

      // Perform actual API call
      await cartService.addToCart(productId, quantity);
      
      // Refresh cart data
      queryClient.invalidateQueries(['cart']);
    } catch (error) {
      // Revert optimistic update on error
      queryClient.invalidateQueries(['cart']);
      throw error;
    } finally {
      setIsOptimistic(false);
    }
  }, [queryClient]);

  const removeFromCartOptimistic = useCallback(async (itemId: string) => {
    setIsOptimistic(true);
    
    try {
      // Optimistically update the cart
      const currentCart = queryClient.getQueryData<Cart>(['cart']);
      if (currentCart) {
        const optimisticCart = {
          ...currentCart,
          items: currentCart.items.filter(item => item.id !== itemId),
          totalItems: currentCart.totalItems - 1,
        };
        
        queryClient.setQueryData(['cart'], optimisticCart);
      }

      // Perform actual API call
      await cartService.removeFromCart(itemId);
      
      // Refresh cart data
      queryClient.invalidateQueries(['cart']);
    } catch (error) {
      // Revert optimistic update on error
      queryClient.invalidateQueries(['cart']);
      throw error;
    } finally {
      setIsOptimistic(false);
    }
  }, [queryClient]);

  return {
    addToCartOptimistic,
    removeFromCartOptimistic,
    isOptimistic,
  };
};

// Hook for cart utilities
export const useCartUtils = () => {
  const { data: cart } = useCart();

  const calculateTotal = useCallback(() => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }, [cart]);

  const calculateTotalItems = useCallback(() => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const calculateSavings = useCallback(() => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => {
      const originalPrice = item.product.originalPrice || item.product.price;
      const savings = (originalPrice - item.product.price) * item.quantity;
      return total + savings;
    }, 0);
  }, [cart]);

  const isInCart = useCallback((productId: string) => {
    if (!cart || !cart.items.length) return false;
    return cart.items.some(item => item.productId === productId);
  }, [cart]);

  const getCartItem = useCallback((productId: string) => {
    if (!cart || !cart.items.length) return null;
    return cart.items.find(item => item.productId === productId) || null;
  }, [cart]);

  return {
    cart,
    calculateTotal,
    calculateTotalItems,
    calculateSavings,
    isInCart,
    getCartItem,
    isEmpty: !cart || cart.items.length === 0,
  };
};
