import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import Loading from '@/components/common/Loading';

const CartPage: React.FC = () => {
  const { cart, isLoading, removeFromCart, updateCartItem } = useCart();

  if (isLoading) {
    return <Loading size="lg" text="Loading cart..." />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <div className="cart-header-content">
            <h1 className="cart-title">Shopping Cart</h1>
          </div>
        </div>
        <div className="cart-main">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="cart-empty-title">Your cart is empty</h2>
            <p className="cart-empty-description">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateCartItem(itemId, newQuantity);
    }
  };

  const calculateSubtotal = () => {
    return cart.items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cart.items.reduce((total, item) => {
      const originalPrice = item.product.originalPrice || item.product.price;
      return total + ((originalPrice - item.product.price) * item.quantity);
    }, 0);
  };

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="cart-header-content">
          <h1 className="cart-title">Shopping Cart ({cart.totalItems} items)</h1>
        </div>
      </div>
      
      <div className="cart-main">
        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Cart Items
                </h2>
              </div>
              <div className="card-body p-0">
                {cart.items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img
                      src={item.product.images[0] || '/placeholder-product.jpg'}
                      alt={item.product.title}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <h3 className="cart-item-title">{item.product.title}</h3>
                      <p className="cart-item-seller">Sold by {item.product.seller.username}</p>
                      <p className="cart-item-price">${item.product.price.toFixed(2)} each</p>
                    </div>
                    <div className="cart-item-quantity">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="mx-3 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Order Summary
                </h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${calculateSubtotal().toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="text-gray-900 dark:text-gray-100">$9.99</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${(calculateSubtotal() * 0.08).toFixed(2)}
                    </span>
                  </div>
                  {calculateSavings() > 0 && (
                    <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                      <span>You Save</span>
                      <span>${calculateSavings().toFixed(2)}</span>
                    </div>
                  )}
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-gray-900 dark:text-gray-100">Total</span>
                    <span className="text-gray-900 dark:text-gray-100">
                      ${(calculateSubtotal() + 9.99 + (calculateSubtotal() * 0.08)).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <button className="btn-primary w-full mt-6">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                
                <Link
                  to="/products"
                  className="btn-outline w-full mt-3"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
