import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Grid
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.productId, newQuantity);
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3}>
            <Box
              component="img"
              src={item.imageUrl || '/placeholder-product.jpg'}
              alt={item.title}
              sx={{
                width: '100%',
                height: 100,
                objectFit: 'cover',
                borderRadius: 1
              }}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Typography variant="h6" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.description}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Condition: {item.conditionRating}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="small"
                onClick={handleDecrement}
                disabled={item.quantity <= 1}
              >
                <Remove />
              </IconButton>
              <TextField
                size="small"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                sx={{ width: 60, mx: 1 }}
              />
              <IconButton size="small" onClick={handleIncrement}>
                <Add />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={1}>
            <Typography variant="h6" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
              ₹{item.price.toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={1}>
            <IconButton
              color="error"
              onClick={() => onRemove(item.productId)}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>

        {/* Sustainability Impact */}
        {item.sustainabilityMetrics && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f1f8e9', borderRadius: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#2e7d32' }}>
              Environmental Impact (per item):
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Typography variant="body2">
                  🌱 {item.sustainabilityMetrics.co2Saved}kg CO₂ saved
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">
                  🌳 {item.sustainabilityMetrics.treesEquivalent} trees
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2">
                  💧 {item.sustainabilityMetrics.waterSaved}L water saved
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CartItem;
