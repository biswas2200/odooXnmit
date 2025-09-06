import React from 'react';
import { ShoppingCart, CreditCard, Truck, Shield } from 'lucide-react';
import { CartSummary } from '@/types/cart';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/helpers';

interface CartSummaryProps {
  summary: CartSummary;
  onProceedToCheckout?: () => void;
  onContinueShopping?: () => void;
  className?: string;
}

const CartSummaryComponent: React.FC<CartSummaryProps> = ({
  summary,
  onProceedToCheckout,
  onContinueShopping,
  className,
}) => {
  return (
    <div className={cn('cart-summary', className)}>
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Order Summary
          </h2>
        </div>
        <div className="card-body">
          {/* Summary Details */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="text-gray-900 dark:text-gray-100">
                {formatCurrency(summary.subtotal)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Shipping</span>
              <span className="text-gray-900 dark:text-gray-100">
                {summary.shipping > 0 ? formatCurrency(summary.shipping) : 'Free'}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Tax</span>
              <span className="text-gray-900 dark:text-gray-100">
                {formatCurrency(summary.tax)}
              </span>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-700" />
            
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900 dark:text-gray-100">Total</span>
              <span className="text-gray-900 dark:text-gray-100">
                {formatCurrency(summary.total)}
              </span>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-6">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-blue-800 dark:text-blue-200">
                Estimated delivery: {summary.estimatedDelivery}
              </span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <Shield className="w-4 h-4" />
            <span>Secure checkout with buyer protection</span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onProceedToCheckout}
              className="btn-primary w-full"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Checkout
            </button>
            
            <button
              onClick={onContinueShopping}
              className="btn-outline w-full"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Continue Shopping
            </button>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-3">
              We accept
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                VISA
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                MC
              </div>
              <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                AMEX
              </div>
              <div className="w-8 h-5 bg-yellow-500 rounded text-white text-xs flex items-center justify-center font-bold">
                PP
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummaryComponent;
