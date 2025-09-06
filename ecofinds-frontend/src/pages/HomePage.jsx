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
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? 'h3' : 'h2'}
            component="h1"
            gutterBottom
            sx={{ 
              fontWeight: 'bold', 
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to EcoFinds
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{ 
              mb: 5, 
              opacity: 0.95,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            Sustainable marketplace for second-hand goods.
            Reduce waste, save the planet, one purchase at a time.
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 3, 
            justifyContent: 'center', 
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <Button
              variant="contained"
              size="large"
              component={Link}
              to="/products"
              sx={{
                backgroundColor: 'white',
                color: '#2e7d32',
                '&:hover': { backgroundColor: '#f5f5f5', transform: 'translateY(-2px)' },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                boxShadow: '0 4px 15px rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <Search sx={{ mr: 1 }} />
              Browse Products
            </Button>
            <Button
              variant="outlined"
              size="large"
              component={Link}
              to="/signup"
              sx={{
                borderColor: 'white',
                borderWidth: 2,
                color: 'white',
                '&:hover': { 
                  borderColor: '#f5f5f5', 
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)'
                },
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              Join EcoFinds
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            sx={{ 
              color: '#2e7d32', 
              fontWeight: 'bold', 
              mb: 2,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Why Choose EcoFinds?
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto', lineHeight: 1.6 }}
          >
            Discover the benefits of sustainable shopping with our eco-friendly marketplace
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center" alignItems="stretch">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': { 
                    transform: 'translateY(-8px)', 
                    boxShadow: '0 8px 25px rgba(46, 125, 50, 0.15)' 
                  },
                  borderRadius: 2,
                  border: '1px solid rgba(46, 125, 50, 0.1)'
                }}
              >
                <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{ fontWeight: 'bold', color: '#2e7d32', mb: 2 }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ flexGrow: 1, lineHeight: 1.6 }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Box sx={{ backgroundColor: '#f1f8e9', py: { xs: 6, md: 8 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ 
              color: '#2e7d32', 
              fontWeight: 'bold',
              fontSize: { xs: '1.75rem', md: '2.125rem' },
              mb: 2
            }}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ 
              mb: 4, 
              color: 'text.secondary',
              maxWidth: '500px',
              mx: 'auto',
              lineHeight: 1.6
            }}
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
              '&:hover': { 
                backgroundColor: '#1b5e20',
                transform: 'translateY(-2px)'
              },
              px: 6,
              py: 2,
              borderRadius: 2,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              boxShadow: '0 4px 15px rgba(46, 125, 50, 0.3)',
              transition: 'all 0.3s ease'
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
