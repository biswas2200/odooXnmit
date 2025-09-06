import React from 'react';
import { Heart, ShoppingCart, Star, MapPin, Trash2 } from 'lucide-react';
import { CartItem } from '@/types/cart';
import { formatCurrency } from '@/utils/formatters';
import { cn } from '@/utils/helpers';

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity?: (itemId: string, quantity: number) => void;
  onRemove?: (itemId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onToggleFavorite,
  isFavorite = false,
  className,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemove?.(item.id);
    } else {
      onUpdateQuantity?.(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove?.(item.id);
  };

  const handleToggleFavorite = () => {
    onToggleFavorite?.(item.productId);
  };

  return (
    <div className={cn('cart-item', className)}>
      {/* Product Image */}
      <div className="flex-shrink-0">
        <img
          src={item.product.images[0] || '/placeholder-product.jpg'}
          alt={item.product.title}
          className="cart-item-image"
        />
      </div>

      {/* Product Details */}
      <div className="cart-item-details flex-1 min-w-0">
        <h3 className="cart-item-title">{item.product.title}</h3>
        <p className="cart-item-seller">Sold by {item.product.seller.username}</p>
        <div className="flex items-center space-x-2 mt-1">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.product.seller.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {item.product.seller.location || 'Unknown'}
            </span>
          </div>
        </div>
        <div className="cart-item-price">
          {formatCurrency(item.product.price)} each
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          disabled={item.quantity <= 1}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="mx-3 text-sm font-medium min-w-[2rem] text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Price and Actions */}
      <div className="text-right">
        <div className="font-medium text-gray-900 dark:text-gray-100 mb-2">
          {formatCurrency(item.product.price * item.quantity)}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleFavorite}
            className={cn(
              'p-1 rounded-full transition-colors',
              isFavorite
                ? 'text-red-500 hover:text-red-600'
                : 'text-gray-400 hover:text-red-500'
            )}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
          </button>
          <button
            onClick={handleRemove}
            className="cart-item-remove p-1 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            title="Remove from cart"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
