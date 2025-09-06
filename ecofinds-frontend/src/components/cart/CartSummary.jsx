import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button
} from '@mui/material';
import { ShoppingCart, Recycling, Nature, WaterDrop } from '@mui/icons-material';

const CartSummary = ({ cart, onCheckout }) => {
  if (!cart || cart.items.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" align="center" color="text.secondary">
            Your cart is empty
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Order Summary
        </Typography>

        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">
              Items ({cart.itemCount})
            </Typography>
            <Typography variant="body1">
              ₹{cart.totalAmount.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1">Shipping</Typography>
            <Typography variant="body1" color="success.main">
              Free
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
              ₹{cart.totalAmount.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Sustainability Impact Summary */}
        {cart.totalCarbonSaved && (
          <Box sx={{ mb: 3, p: 2, backgroundColor: '#f1f8e9', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold', color: '#2e7d32' }}>
              🌍 Your Environmental Impact:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Recycling sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="body2">CO₂ Saved</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {cart.totalCarbonSaved}kg
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Nature sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="body2">Trees Equivalent</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {Math.round(cart.totalCarbonSaved * 0.05)} trees
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WaterDrop sx={{ mr: 1, color: '#2e7d32' }} />
                  <Typography variant="body2">Water Saved</Typography>
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  {Math.round(cart.totalCarbonSaved * 10)}L
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ShoppingCart />}
          onClick={onCheckout}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': { backgroundColor: '#1b5e20' },
            py: 1.5
          }}
        >
          Proceed to Checkout
        </Button>

        <Typography
          variant="caption"
          color="text.secondary"
          align="center"
          sx={{ display: 'block', mt: 1 }}
        >
          Secure checkout powered by EcoFinds
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CartSummary;
