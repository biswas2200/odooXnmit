import React from 'react';
import { Container, Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 4 }}>
        <LoginForm />
      </Box>
    </Container>
  );
};

export default LoginPage;
