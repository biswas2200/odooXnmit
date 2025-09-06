import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Button,
  Alert
} from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Loading from '../components/common/Loading';
import { cartService } from '../services/cartService';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const cartData = await cartService.getCart();
      setCart(cartData);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await cartService.updateCartItem(productId, quantity);
      await fetchCart(); // Refresh cart data
    } catch (err) {
      setError('Failed to update item quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await cartService.removeFromCart(productId);
      await fetchCart(); // Refresh cart data
    } catch (err) {
      setError('Failed to remove item from cart');
    }
  };

  const handleCheckout = () => {
    // Implement checkout logic
    alert('Checkout functionality will be implemented soon!');
  };

  if (!isAuthenticated) {
    return (
      <Container maxWidth="md">
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            Please Login to View Cart
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            You need to be logged in to access your shopping cart.
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            sx={{
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' }
            }}
          >
            Login to Continue
          </Button>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return <Loading message="Loading your cart..." />;
  }

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/products"
            startIcon={<ArrowBack />}
            sx={{ mb: 2 }}
          >
            Continue Shopping
          </Button>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ color: '#2e7d32', fontWeight: 'bold' }}
          >
            Shopping Cart
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!cart || cart.items.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <ShoppingCart sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Your cart is empty
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Add some sustainable products to get started!
            </Typography>
            <Button
              variant="contained"
              component={Link}
              to="/products"
              size="large"
              sx={{
                backgroundColor: '#2e7d32',
                '&:hover': { backgroundColor: '#1b5e20' }
              }}
            >
              Browse Products
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} lg={8}>
              <Box>
                {cart.items.map((item) => (
                  <CartItem
                    key={item.productId}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </Box>
            </Grid>

            {/* Cart Summary */}
            <Grid item xs={12} lg={4}>
              <CartSummary cart={cart} onCheckout={handleCheckout} />
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default CartPage;
