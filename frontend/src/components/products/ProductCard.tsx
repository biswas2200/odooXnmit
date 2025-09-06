import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, MapPin } from 'lucide-react';
import { Product } from '@/types/product';
import { formatCurrency, formatRelativeTime } from '@/utils/formatters';
import { cn } from '@/utils/helpers';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className,
}) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product.id);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'like-new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'good':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'fair':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'poor':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getSustainabilityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-blue-600 dark:text-blue-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className={cn('product-card group', className)}>
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.title}
            className="product-card-image group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <span className={cn('badge text-xs', getConditionColor(product.condition))}>
              {product.condition.replace('-', ' ')}
            </span>
            {product.isFeatured && (
              <span className="badge badge-primary text-xs">
                Featured
              </span>
            )}
          </div>

          {/* Sustainability Score */}
          <div className="absolute top-2 right-2">
            <div className="bg-white dark:bg-gray-800 rounded-full p-2 shadow-sm">
              <div className={cn('text-sm font-bold', getSustainabilityColor(product.sustainabilityScore))}>
                {product.sustainabilityScore}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">ECO</div>
            </div>
          </div>

          {/* Actions */}
          <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleToggleFavorite}
              className={cn(
                'p-2 rounded-full shadow-sm transition-colors',
                isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500'
              )}
            >
              <Heart className={cn('w-4 h-4', isFavorite && 'fill-current')} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-primary-600 text-white rounded-full shadow-sm hover:bg-primary-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="product-card-content">
          <h3 className="product-card-title">{product.title}</h3>
          
          {/* Price */}
          <div className="product-card-price">
            {formatCurrency(product.price)}
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="product-card-original-price ml-2">
                  {formatCurrency(product.originalPrice)}
                </span>
                <span className="product-card-savings ml-2">
                  Save {formatCurrency(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Seller Info */}
          <div className="product-card-seller">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  {product.seller.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {product.seller.username}
              </span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {product.seller.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
            <MapPin className="w-3 h-3" />
            <span>{product.location.city}, {product.location.state}</span>
          </div>

          {/* Sustainability Badges */}
          {product.sustainabilityBadges.length > 0 && (
            <div className="product-card-badges">
              {product.sustainabilityBadges.slice(0, 3).map((badge) => (
                <span
                  key={badge}
                  className="badge badge-success text-xs"
                >
                  {badge.replace('-', ' ')}
                </span>
              ))}
              {product.sustainabilityBadges.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{product.sustainabilityBadges.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Time Posted */}
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatRelativeTime(product.createdAt)}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
