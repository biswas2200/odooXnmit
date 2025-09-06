import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Box,
  Grid
} from '@mui/material';
import {
  ShoppingCart,
  Recycling,
  Nature,
  WaterDrop
} from '@mui/icons-material';
import { PRODUCT_CONDITIONS } from '../../utils/constants';

const ProductCard = ({ product, onAddToCart }) => {
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl || '/placeholder-product.jpg'}
        alt={product.title}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {product.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={PRODUCT_CONDITIONS[product.conditionRating] || product.conditionRating}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ mr: 1, mb: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            by {product.sellerUsername}
          </Typography>
        </Box>

        {/* Sustainability Metrics */}
        {product.sustainabilityMetrics && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold', color: '#2e7d32' }}>
              Environmental Impact:
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                  <Recycling sx={{ mr: 0.5, color: '#2e7d32', fontSize: '1rem' }} />
                  {product.sustainabilityMetrics.co2Saved}kg CO₂
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                  <Nature sx={{ mr: 0.5, color: '#2e7d32', fontSize: '1rem' }} />
                  {product.sustainabilityMetrics.treesEquivalent} trees
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem' }}>
                  <WaterDrop sx={{ mr: 0.5, color: '#2e7d32', fontSize: '1rem' }} />
                  {product.sustainabilityMetrics.waterSaved}L water
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}

        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
            ₹{product.price.toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleAddToCart}
            sx={{
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' }
            }}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
