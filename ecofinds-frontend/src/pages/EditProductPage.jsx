import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductForm from '../components/products/ProductForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const EditProductPage = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only sellers can edit products
  if (user?.role !== 'SELLER') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          Only sellers can edit products. Please register as a seller to manage products.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Update your product details and make it more appealing to buyers.
        </Typography>
      </Box>
      
      <ProductForm productId={id} />
    </Container>
  );
};

export default EditProductPage;
