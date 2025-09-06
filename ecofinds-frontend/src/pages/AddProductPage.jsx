import React from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import ProductForm from '../components/products/ProductForm';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AddProductPage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only sellers can add products
  if (user?.role !== 'SELLER') {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 4 }}>
          Only sellers can add products. Please register as a seller to list products.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Product
        </Typography>
        <Typography variant="body1" color="text.secondary">
          List your sustainable second-hand product and help build a greener future.
        </Typography>
      </Box>
      
      <ProductForm />
    </Container>
  );
};

export default AddProductPage;
