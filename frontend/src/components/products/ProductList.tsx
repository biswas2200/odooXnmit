import React from 'react';
import { Product } from '@/types/product';
import { cn } from '@/utils/helpers';

interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  error?: string | null;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  favorites?: string[];
  viewMode?: 'grid' | 'list';
  className?: string;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  isLoading = false,
  error = null,
  onAddToCart,
  onToggleFavorite,
  favorites = [],
  viewMode = 'grid',
  className,
}) => {
  if (error) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="text-red-600 dark:text-red-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Error Loading Products
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {error}
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6', className)}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="skeleton h-80 rounded-lg" />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          No Products Found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your search criteria or browse all products.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'grid' 
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
    : 'space-y-4';

  return (
    <div className={cn(gridClasses, className)}>
      {products.map((product) => (
        <div
          key={product.id}
          className={cn(
            viewMode === 'list' && 'flex flex-row space-x-4'
          )}
        >
          {/* Product Card Component would go here */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <img
                src={product.images[0] || '/placeholder-product.jpg'}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              
              {/* Badges */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <span className="badge badge-success text-xs">
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
                  <div className="text-sm font-bold text-green-600 dark:text-green-400">
                    {product.sustainabilityScore}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ECO</div>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                {product.title}
              </h3>
              
              <div className="text-xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                ${product.price.toFixed(2)}
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-green-600 font-medium ml-2">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Sold by {product.seller.username}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-yellow-500 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {product.seller.rating.toFixed(1)}
                  </span>
                </div>
                
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {product.location.city}, {product.location.state}
                </div>
              </div>

              {/* Sustainability Badges */}
              {product.sustainabilityBadges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.sustainabilityBadges.slice(0, 2).map((badge) => (
                    <span
                      key={badge}
                      className="badge badge-success text-xs"
                    >
                      {badge.replace('-', ' ')}
                    </span>
                  ))}
                  {product.sustainabilityBadges.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{product.sustainabilityBadges.length - 2} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
