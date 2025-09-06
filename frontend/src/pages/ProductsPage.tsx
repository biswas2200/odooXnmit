import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import Loading from '@/components/common/Loading';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const page = parseInt(searchParams.get('page') || '1');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';

  const { data: productsData, isLoading, error } = useProducts(
    {
      search,
      category: category || undefined,
    },
    page,
    20
  );

  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset to first page
    setSearchParams(newParams);
  };

  const handleSortChange = (sortBy: string) => {
    handleFilterChange('sortBy', sortBy);
  };

  if (error) {
    return (
      <div className="products-page">
        <div className="products-header">
          <div className="products-header-content">
            <h1 className="products-title">Products</h1>
          </div>
        </div>
        <div className="products-main">
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400">Error loading products. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-content">
          <h1 className="products-title">
            {search ? `Search Results for "${search}"` : 'Products'}
          </h1>
          <div className="products-filters">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline btn-sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </button>
              <div className="products-sort">
                <SortAsc className="w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="ml-2 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-800"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="sustainability">Sustainability Score</option>
                </select>
              </div>
            </div>
            <div className="products-view-toggle">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="products-main">
        <div className="products-layout">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="products-sidebar">
              <div className="card">
                <div className="card-header">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Filters
                  </h3>
                </div>
                <div className="card-body space-y-6">
                  {/* Category Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Category
                    </h4>
                    <div className="space-y-2">
                      {['clothing', 'shoes', 'accessories', 'bags', 'jewelry'].map((cat) => (
                        <label key={cat} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={category === cat}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Price Range
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>$0</span>
                        <span>$1000+</span>
                      </div>
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
                      Condition
                    </h4>
                    <div className="space-y-2">
                      {['new', 'like-new', 'good', 'fair'].map((condition) => (
                        <label key={condition} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-2"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                            {condition.replace('-', ' ')}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Content */}
          <div className="products-content">
            <div className="products-toolbar">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {productsData?.total ? `${productsData.total} products found` : 'No products found'}
              </p>
            </div>

            {isLoading ? (
              <div className="products-list-loading">
                <Loading size="lg" text="Loading products..." />
              </div>
            ) : productsData?.products.length === 0 ? (
              <div className="products-empty">
                <div className="products-empty-icon">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
                <h3 className="products-empty-title">No products found</h3>
                <p className="products-empty-description">
                  Try adjusting your search criteria or browse all products.
                </p>
              </div>
            ) : (
              <div className={`products-grid ${viewMode === 'list' ? 'grid-cols-1' : ''}`}>
                {productsData?.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    className={viewMode === 'list' ? 'flex flex-row' : ''}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {productsData && productsData.totalPages > 1 && (
              <div className="products-pagination">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleFilterChange('page', (page - 1).toString())}
                    disabled={page === 1}
                    className="btn-outline btn-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Page {page} of {productsData.totalPages}
                  </span>
                  <button
                    onClick={() => handleFilterChange('page', (page + 1).toString())}
                    disabled={page === productsData.totalPages}
                    className="btn-outline btn-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
