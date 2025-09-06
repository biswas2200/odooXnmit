import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  IconButton,
  Divider
} from '@mui/material';
import { Recycling, Facebook, Twitter, Instagram } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1b5e20',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Recycling sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                EcoFinds
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Sustainable marketplace for second-hand goods.
              Reduce waste, save the planet, one purchase at a time.
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link href="/" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>
                Home
              </Link>
              <Link href="/products" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>
                Products
              </Link>
              <Link href="/cart" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>
                Cart
              </Link>
              <Link href="/login" color="inherit" sx={{ mb: 1, textDecoration: 'none' }}>
                Login
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Sustainability Impact
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Reduce carbon footprint
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Save water resources
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              • Plant virtual trees
            </Typography>
            <Typography variant="body2">
              • Support circular economy
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2">
            © {new Date().getFullYear()} EcoFinds. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
