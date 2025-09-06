import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  Recycling
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMobileMenuAnchor(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Products', path: '/products' },
    ...(isAuthenticated ? [{ text: 'Dashboard', path: '/dashboard' }] : []),
    ...(user?.role === 'SELLER' ? [{ text: 'Add Product', path: '/add-product' }] : []),
    { text: 'Cart', path: '/cart' }
  ];

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <Recycling sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold'
          }}
        >
          EcoFinds
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchor}
              open={Boolean(mobileMenuAnchor)}
              onClose={handleMenuClose}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.text}
                  component={Link}
                  to={item.path}
                  onClick={handleMenuClose}
                >
                  {item.text}
                </MenuItem>
              ))}
              {isAuthenticated ? (
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              ) : (
                <>
                  <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
                    Sign Up
                  </MenuItem>
                  <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                    Login
                  </MenuItem>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                color="inherit"
                component={Link}
                to={item.path}
                sx={{ mx: 1 }}
              >
                {item.text}
              </Button>
            ))}

            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{ mx: 1 }}
            >
              <Badge badgeContent={0} color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <IconButton
                  color="inherit"
                  onClick={handleProfileMenuOpen}
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem disabled>
                    Welcome, {user?.fullName || user?.username}
                  </MenuItem>
                  <MenuItem disabled sx={{ fontSize: '0.8rem', color: 'text.secondary' }}>
                    Role: {user?.role === 'SELLER' ? 'Seller' : 'Buyer'}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/signup"
                  sx={{ ml: 2 }}
                >
                  Sign Up
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  variant="outlined"
                  sx={{ ml: 2 }}
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
