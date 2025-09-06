import React from 'react';
import { Product } from '@/types/product';

interface ProductDetailProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
  className?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className,
}) => {
  return (
    <div className={`product-detail ${className || ''}`}>
      <div className="product-detail-grid">
        {/* Product Images */}
        <div className="product-detail-images">
          <img
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.title}
            className="product-detail-main-image"
          />
          {product.images.length > 1 && (
            <div className="product-detail-thumbnails">
              {product.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 2}`}
                  className="product-detail-thumbnail"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.title}</h1>
          
          <div className="product-detail-price">
            ${product.price.toFixed(2)}
            {product.originalPrice && product.originalPrice > product.price && (
              <>
                <span className="product-detail-original-price ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className="product-detail-savings ml-2">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          <div className="product-detail-sustainability">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sustainability Score</p>
                <div className="product-detail-sustainability-score">
                  {product.sustainabilityScore}/100
                </div>
              </div>
              <div className="product-detail-badges">
                {product.sustainabilityBadges.map((badge) => (
                  <span
                    key={badge}
                    className="badge badge-success text-xs"
                  >
                    {badge.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="product-detail-description">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Description
            </h3>
            <p>{product.description}</p>
          </div>

          <div className="product-detail-specs">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Product Details
            </h3>
            <div className="space-y-2">
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Category:</span>
                <span className="product-detail-spec-value capitalize">{product.category}</span>
              </div>
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Brand:</span>
                <span className="product-detail-spec-value">{product.brand || 'Unknown'}</span>
              </div>
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Size:</span>
                <span className="product-detail-spec-value">{product.size}</span>
              </div>
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Color:</span>
                <span className="product-detail-spec-value">{product.color}</span>
              </div>
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Condition:</span>
                <span className="product-detail-spec-value capitalize">{product.condition.replace('-', ' ')}</span>
              </div>
              <div className="product-detail-spec">
                <span className="product-detail-spec-label">Material:</span>
                <span className="product-detail-spec-value">{product.material.join(', ')}</span>
              </div>
            </div>
          </div>

          <div className="product-detail-seller">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Seller Information
            </h3>
            <div className="product-detail-seller-info">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {product.seller.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="product-detail-seller-details">
                <div className="product-detail-seller-name">{product.seller.username}</div>
                <div className="product-detail-seller-rating">
                  ⭐ {product.seller.rating.toFixed(1)} ({product.seller.reviewCount} reviews)
                </div>
              </div>
            </div>
          </div>

          <div className="product-detail-actions">
            <button 
              onClick={() => onAddToCart?.(product.id)}
              className="btn-primary btn-lg w-full mb-4"
            >
              Add to Cart
            </button>
            <button 
              onClick={() => onToggleFavorite?.(product.id)}
              className="btn-outline btn-lg w-full"
            >
              {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
