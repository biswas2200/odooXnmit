import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Fab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add, ShoppingCart } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import ProductList from '../components/products/ProductList';
import SearchBar from '../components/products/SearchBar';
import Loading from '../components/common/Loading';
import { cartService } from '../services/cartService';

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = (query, category) => {
    setSearchQuery(query);
    setCategoryId(category);
  };

  const handleAddToCart = async (productId) => {
    if (!isAuthenticated) {
      // Redirect to login or show message
      alert('Please login to add items to cart');
      return;
    }

    setLoading(true);
    try {
      await cartService.addToCart(productId);
      alert('Product added to cart successfully!');
    } catch (error) {
      alert('Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: '#2e7d32', fontWeight: 'bold' }}
          >
            Sustainable Products
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Discover eco-friendly second-hand products and make a positive impact on the environment.
          </Typography>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            initialSearch={searchQuery}
            initialCategory={categoryId}
          />
        </Box>

        {/* Add Product Button (for authenticated users) */}
        {isAuthenticated && (
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              component={Link}
              to="/products/new"
              startIcon={<Add />}
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': { backgroundColor: '#1b5e20' }
              }}
            >
              Add Product
            </Button>
          </Box>
        )}

        {/* Products List */}
        <ProductList
          searchQuery={searchQuery}
          categoryId={categoryId}
          onAddToCart={handleAddToCart}
        />

        {/* Loading Overlay */}
        {loading && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 9999
            }}
          >
            <Loading message="Adding to cart..." />
          </Box>
        )}

        {/* Floating Action Button for Mobile */}
        {isMobile && isAuthenticated && (
          <Fab
            color="primary"
            component={Link}
            to="/products/new"
            sx={{
              position: 'fixed',
              bottom: 16,
              right: 16,
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' }
            }}
          >
            <Add />
          </Fab>
        )}
      </Box>
    </Container>
  );
};

export default ProductsPage;
