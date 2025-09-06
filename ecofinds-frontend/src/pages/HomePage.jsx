import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Recycling, ShoppingCart, Search, Nature } from '@mui/icons-material';

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const features = [
    {
      icon: <Recycling sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'Sustainable Shopping',
      description: 'Discover second-hand products that reduce waste and carbon footprint.'
    },
    {
      icon: <Nature sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'Environmental Impact',
      description: 'See the real environmental benefits of your purchases.'
    },
    {
      icon: <Search sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'Easy Discovery',
      description: 'Find quality products with our advanced search and filtering.'
    },
    {
      icon: <ShoppingCart sx={{ fontSize: 48, color: '#2e7d32' }} />,
      title: 'Secure Transactions',
      description: 'Safe and secure checkout process for peace of mind.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Welcome to EcoFinds
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ mb: 4, opacity: 0.9 }}
          >
            Sustainable marketplace for second-hand goods.
            Reduce waste, save the planet, one purchase at a time.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              sx={{
                backgroundColor: 'white',
                color: '#2e7d32',
                '&:hover': { backgroundColor: '#f5f5f5' },
                px: 4,
                py: 1.5
              }}
            >
              <Search sx={{ mr: 1 }} />
              Browse Products
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/register"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: '#f5f5f5', backgroundColor: 'rgba(255,255,255,0.1)' },
                px: 4,
                py: 1.5
              }}
            >
              Join EcoFinds
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          component="h2"
          align="center"
          gutterBottom
          sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 6 }}
        >
          Why Choose EcoFinds?
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 }
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#f1f8e9', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: '#2e7d32', fontWeight: 'bold' }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: 4, color: 'text.secondary' }}
          >
            Join thousands of eco-conscious shoppers making sustainable choices every day.
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/products"
            sx={{
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' },
              px: 6,
              py: 2
            }}
          >
            Start Shopping Sustainably
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
