import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Cart, CartItem, CartSummary } from '@/types/cart';
import { cartService } from '@/services/cartService';

// Cart state interface
interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  cartCount: number;
}

// Cart actions
type CartAction =
  | { type: 'CART_START' }
  | { type: 'CART_SUCCESS'; payload: Cart }
  | { type: 'CART_FAILURE'; payload: string }
  | { type: 'CART_CLEAR' }
  | { type: 'CART_UPDATE_COUNT'; payload: number }
  | { type: 'CLEAR_ERROR' };

// Initial state
const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
  cartCount: 0,
};

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'CART_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'CART_SUCCESS':
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        cartCount: action.payload.totalItems,
        error: null,
      };
    case 'CART_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CART_CLEAR':
      return {
        ...state,
        cart: null,
        cartCount: 0,
        error: null,
      };
    case 'CART_UPDATE_COUNT':
      return {
        ...state,
        cartCount: action.payload,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Cart context interface
interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  getCartSummary: () => Promise<CartSummary | null>;
  clearError: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart provider component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Initialize cart from localStorage or server
  useEffect(() => {
    const initializeCart = async () => {
      try {
        // Try to get cart from server first
        const cart = await cartService.getCart();
        dispatch({ type: 'CART_SUCCESS', payload: cart });
      } catch (error) {
        // If server cart fails, try local storage
        const localCart = cartService.getCartFromLocal();
        if (localCart) {
          dispatch({ type: 'CART_SUCCESS', payload: localCart });
          // Try to sync with server
          try {
            await cartService.syncCart();
          } catch (syncError) {
            console.error('Cart sync failed:', syncError);
          }
        }
      }
    };

    initializeCart();
  }, []);

  // Add item to cart
  const addToCart = async (productId: string, quantity = 1): Promise<void> => {
    try {
      dispatch({ type: 'CART_START' });
      await cartService.addToCart(productId, quantity);
      
      // Refresh cart after adding
      const updatedCart = await cartService.getCart();
      dispatch({ type: 'CART_SUCCESS', payload: updatedCart });
    } catch (error) {
      dispatch({
        type: 'CART_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to add item to cart',
      });
      throw error;
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId: string): Promise<void> => {
    try {
      dispatch({ type: 'CART_START' });
      await cartService.removeFromCart(itemId);
      
      // Refresh cart after removing
      const updatedCart = await cartService.getCart();
      dispatch({ type: 'CART_SUCCESS', payload: updatedCart });
    } catch (error) {
      dispatch({
        type: 'CART_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to remove item from cart',
      });
      throw error;
    }
  };

  // Update cart item quantity
  const updateCartItem = async (itemId: string, quantity: number): Promise<void> => {
    try {
      dispatch({ type: 'CART_START' });
      await cartService.updateCartItem(itemId, quantity);
      
      // Refresh cart after updating
      const updatedCart = await cartService.getCart();
      dispatch({ type: 'CART_SUCCESS', payload: updatedCart });
    } catch (error) {
      dispatch({
        type: 'CART_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to update cart item',
      });
      throw error;
    }
  };

  // Clear entire cart
  const clearCart = async (): Promise<void> => {
    try {
      dispatch({ type: 'CART_START' });
      await cartService.clearCart();
      dispatch({ type: 'CART_CLEAR' });
    } catch (error) {
      dispatch({
        type: 'CART_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to clear cart',
      });
      throw error;
    }
  };

  // Refresh cart
  const refreshCart = async (): Promise<void> => {
    try {
      dispatch({ type: 'CART_START' });
      const cart = await cartService.getCart();
      dispatch({ type: 'CART_SUCCESS', payload: cart });
    } catch (error) {
      dispatch({
        type: 'CART_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to refresh cart',
      });
    }
  };

  // Get cart summary
  const getCartSummary = async (): Promise<CartSummary | null> => {
    try {
      const summary = await cartService.getCartSummary();
      return summary;
    } catch (error) {
      console.error('Failed to get cart summary:', error);
      return null;
    }
  };

  // Clear error
  const clearError = (): void => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: CartContextType = {
    cart: state.cart,
    isLoading: state.isLoading,
    error: state.error,
    cartCount: state.cartCount,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    refreshCart,
    getCartSummary,
    clearError,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Cart utility functions
export const cartUtils = {
  // Calculate total price
  calculateTotal: (cart: Cart | null): number => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  },

  // Calculate total items
  calculateTotalItems: (cart: Cart | null): number => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },

  // Check if product is in cart
  isInCart: (cart: Cart | null, productId: string): boolean => {
    if (!cart || !cart.items.length) return false;
    return cart.items.some(item => item.productId === productId);
  },

  // Get cart item by product ID
  getCartItem: (cart: Cart | null, productId: string): CartItem | null => {
    if (!cart || !cart.items.length) return null;
    return cart.items.find(item => item.productId === productId) || null;
  },

  // Calculate savings
  calculateSavings: (cart: Cart | null): number => {
    if (!cart || !cart.items.length) return 0;
    return cart.items.reduce((total, item) => {
      const originalPrice = item.product.originalPrice || item.product.price;
      const savings = (originalPrice - item.product.price) * item.quantity;
      return total + savings;
    }, 0);
  },
};
