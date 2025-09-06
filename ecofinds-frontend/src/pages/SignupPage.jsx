import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import RegisterForm from '../components/auth/RegisterForm';

const SignupPage = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join EcoFinds and start your sustainable shopping journey
          </Typography>
        </Box>
        
        <RegisterForm />
      </Paper>
    </Container>
  );
};

export default SignupPage;
