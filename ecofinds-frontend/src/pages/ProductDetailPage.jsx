import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  Alert,
  Breadcrumbs
} from '@mui/material';
import {
  ArrowBack,
  ShoppingCart,
  Recycling,
  Nature,
  WaterDrop,
  Person
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';
import { productService } from '../services/productService';
import { cartService } from '../services/cartService';
import { PRODUCT_CONDITIONS } from '../utils/constants';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(false);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const productData = await productService.getProductById(id);
      setProduct(productData);
    } catch (err) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAddingToCart(true);
    try {
      await cartService.addToCart(product.id);
      alert('Product added to cart successfully!');
    } catch (err) {
      alert('Failed to add product to cart');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md">
        <Alert severity="warning" sx={{ mt: 4 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
          <Link to="/products" style={{ textDecoration: 'none', color: 'inherit' }}>
            Products
          </Link>
          <Typography color="text.primary">{product.title}</Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button
          component={Link}
          to="/products"
          startIcon={<ArrowBack />}
          sx={{ mb: 3 }}
        >
          Back to Products
        </Button>

        <Grid container spacing={4}>
          {/* Product Image */}
          <Grid item xs={12} md={6}>
            <Card>
              <Box
                component="img"
                src={product.imageUrl || '/placeholder-product.jpg'}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 400,
                  objectFit: 'cover'
                }}
              />
            </Card>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{ fontWeight: 'bold' }}
              >
                {product.title}
              </Typography>

              <Box sx={{ mb: 2 }}>
                <Chip
                  label={PRODUCT_CONDITIONS[product.conditionRating] || product.conditionRating}
                  color="primary"
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
                <Chip
                  label={product.categoryName}
                  color="secondary"
                  variant="outlined"
                />
              </Box>

              <Typography
                variant="h4"
                sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 2 }}
              >
                ₹{product.price.toLocaleString()}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
                {product.description}
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Sold by: {product.sellerUsername}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={addingToCart}
                sx={{
                  backgroundColor: '#2e7d32',
                  '&:hover': { backgroundColor: '#1b5e20' },
                  py: 1.5,
                  mb: 2
                }}
              >
                {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Sustainability Metrics */}
        {product.sustainabilityMetrics && (
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 3 }}
              >
                🌍 Environmental Impact
              </Typography>

              <Typography variant="body1" sx={{ mb: 3 }}>
                By purchasing this product, you're making a positive impact on the environment:
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Recycling sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {product.sustainabilityMetrics.co2Saved}kg
                    </Typography>
                    <Typography variant="body1">CO₂ Saved</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Nature sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {product.sustainabilityMetrics.treesEquivalent}
                    </Typography>
                    <Typography variant="body1">Trees Equivalent</Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <WaterDrop sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2e7d32' }}>
                      {product.sustainabilityMetrics.waterSaved}L
                    </Typography>
                    <Typography variant="body1">Water Saved</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
