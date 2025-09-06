import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  InputAdornment,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Phone,
  Business
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'BUYER',
    businessName: '',
    businessType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f1f8e9',
        py: 4
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 2
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: '#2e7d32', fontWeight: 'bold', mb: 3 }}
        >
          Join EcoFinds
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 3, color: 'text.secondary' }}
        >
          Start your sustainable shopping journey
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone />
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Account Type</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Account Type"
            >
              <MenuItem value="BUYER">Buyer - I want to purchase eco-friendly products</MenuItem>
              <MenuItem value="SELLER">Seller - I want to sell eco-friendly products</MenuItem>
            </Select>
            <FormHelperText>Choose your account type based on how you plan to use EcoFinds</FormHelperText>
          </FormControl>

          {formData.role === 'SELLER' && (
            <>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required={formData.role === 'SELLER'}
                sx={{ mt: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Business />
                    </InputAdornment>
                  ),
                }}
                helperText="Enter your business or store name"
              />

              <TextField
                fullWidth
                label="Business Type"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required={formData.role === 'SELLER'}
                sx={{ mt: 2 }}
                placeholder="e.g., Organic Food Store, Sustainable Fashion, Eco Home Products"
                helperText="Describe the type of eco-friendly products you sell"
              />
            </>
          )}

          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ mt: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#2e7d32',
              '&:hover': { backgroundColor: '#1b5e20' }
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </Box>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link
            component={Link}
            to="/login"
            sx={{
              color: '#2e7d32',
              textDecoration: 'none',
              fontWeight: 'bold',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Sign in
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
