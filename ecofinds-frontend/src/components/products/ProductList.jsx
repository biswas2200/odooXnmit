import React, { useState, useEffect } from 'react';
import {
  Grid,
  Pagination,
  Box,
  Typography,
  Alert
} from '@mui/material';
import ProductCard from './ProductCard';
import Loading from '../common/Loading';
import { productService } from '../../services/productService';

const ProductList = ({ searchQuery, categoryId, onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const pageSize = 12;

  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery, categoryId]);

  const fetchProducts = async () => {
    setLoading(true);
    setError('');

    try {
      let response;

      if (searchQuery) {
        response = await productService.searchProducts(searchQuery, page, pageSize);
      } else if (categoryId) {
        response = await productService.getProductsByCategory(categoryId, page, pageSize);
      } else {
        response = await productService.getProducts(page, pageSize);
      }

      setProducts(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    } catch (err) {
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value - 1);
  };

  const handleAddToCart = async (productId) => {
    try {
      // This will be handled by parent component
      onAddToCart(productId);
    } catch (err) {
      setError('Failed to add item to cart');
    }
  };

  if (loading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {totalElements > 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Showing {products.length} of {totalElements} products
        </Typography>
      )}

      {products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {searchQuery
              ? `No products found for "${searchQuery}"`
              : categoryId
              ? 'No products found in this category'
              : 'No products available'
            }
          </Typography>
        </Box>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page + 1}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: '#2e7d32'
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default ProductList;
