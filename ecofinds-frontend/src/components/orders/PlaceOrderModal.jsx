import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { LocalShipping } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';

const PlaceOrderModal = ({ open, onClose, onOrderPlaced }) => {
  const { token } = useAuth();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlaceOrder = async () => {
    if (!deliveryAddress.trim()) {
      setError('Delivery address is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderData = {
        deliveryAddress: deliveryAddress.trim(),
        notes: notes.trim()
      };

      const response = await dashboardService.placeOrder(orderData, token);
      
      // Reset form
      setDeliveryAddress('');
      setNotes('');
      
      // Call success callback
      onOrderPlaced && onOrderPlaced(response);
      
      // Close modal
      onClose();
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setDeliveryAddress('');
      setNotes('');
      setError(null);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <LocalShipping sx={{ mr: 1 }} />
          Place Order
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Delivery Address"
                multiline
                rows={3}
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Enter your complete delivery address..."
                required
                disabled={loading}
                helperText="Please provide a complete address including street, city, postal code"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Order Notes (Optional)"
                multiline
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or notes for the seller..."
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Your order will be processed and you'll receive a confirmation email shortly.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          onClick={handlePlaceOrder} 
          variant="contained" 
          disabled={loading || !deliveryAddress.trim()}
          startIcon={loading ? <CircularProgress size={20} /> : <LocalShipping />}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceOrderModal;
