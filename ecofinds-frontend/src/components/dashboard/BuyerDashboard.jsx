import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  LinearProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ShoppingBag,
  AttachMoney,
  Recycling,
  LocalShipping,
  Star,
  Receipt,
  EmojiEvents
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { dashboardService } from '../../services/dashboardService';

const BuyerDashboard = () => {
  const { token } = useAuth();
  const [dashboard, setDashboard] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderDialogOpen, setOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      const data = await dashboardService.getBuyerDashboard(token);
      setDashboard(data);
    } catch (error) {
      console.error('Error fetching buyer dashboard:', error);
      setError('Failed to fetch dashboard data');
    }
  }, [token]);

  const fetchOrders = useCallback(async () => {
    try {
      const data = await dashboardService.getBuyerOrders(token, 0, 10);
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchDashboardData();
    fetchOrders();
  }, [fetchDashboardData, fetchOrders]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'PROCESSING': return 'info';
      case 'SHIPPED': return 'primary';
      case 'DELIVERED': return 'success';
      case 'CANCELLED': return 'error';
      default: return 'default';
    }
  };

  const getSustainabilityLevelColor = (level) => {
    switch (level) {
      case 'Eco Beginner': return 'info';
      case 'Eco Explorer': return 'warning';
      case 'Eco Champion': return 'success';
      case 'Eco Master': return 'primary';
      default: return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        My EcoFinds Dashboard
      </Typography>

      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboard?.totalPurchases || 0}
                  </Typography>
                  <Typography variant="body2">Total Purchases</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <ShoppingBag />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    ${dashboard?.totalSpent?.toFixed(2) || '0.00'}
                  </Typography>
                  <Typography variant="body2">Total Spent</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <AttachMoney />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboard?.personalCarbonSaved?.toFixed(1) || '0.0'}kg
                  </Typography>
                  <Typography variant="body2">Carbon Saved</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <Recycling />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <CardContent sx={{ color: 'white' }}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {dashboard?.activeOrders?.length || 0}
                  </Typography>
                  <Typography variant="body2">Active Orders</Typography>
                </Box>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
                  <LocalShipping />
                </Avatar>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Sustainability Progress */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom display="flex" alignItems="center">
                <EmojiEvents sx={{ mr: 1, color: 'gold' }} />
                Sustainability Journey
              </Typography>
              
              <Box sx={{ mt: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                  <Chip 
                    label={dashboard?.sustainabilityAchievements?.level || 'Eco Beginner'}
                    color={getSustainabilityLevelColor(dashboard?.sustainabilityAchievements?.level)}
                    icon={<Star />}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {dashboard?.sustainabilityAchievements?.progressToNext || 0}% to next level
                  </Typography>
                </Box>
                
                <LinearProgress 
                  variant="determinate" 
                  value={dashboard?.sustainabilityAchievements?.progressToNext || 0}
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Next Level: {dashboard?.sustainabilityAchievements?.nextLevel || 'Eco Explorer'}
                </Typography>

                <Typography variant="subtitle2" gutterBottom>
                  Badges Earned:
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1}>
                  {dashboard?.sustainabilityAchievements?.badges?.map((badge, index) => (
                    <Chip key={index} label={badge} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Active Orders */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Orders
              </Typography>
              {dashboard?.activeOrders?.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Seller</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dashboard.activeOrders.map((order) => (
                        <TableRow key={order.orderId}>
                          <TableCell>#{order.orderId}</TableCell>
                          <TableCell>{order.sellerName}</TableCell>
                          <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status} 
                              color={getStatusColor(order.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(order.orderDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button 
                              size="small"
                              startIcon={<Receipt />}
                              onClick={() => {
                                setSelectedOrder(order);
                                setOrderDialogOpen(true);
                              }}
                            >
                              Track
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography color="text.secondary" textAlign="center" sx={{ py: 4 }}>
                  No active orders
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Orders
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Order ID</TableCell>
                      <TableCell>Seller</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>#{order.id}</TableCell>
                        <TableCell>{order.sellerName}</TableCell>
                        <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Chip 
                            label={order.status} 
                            color={getStatusColor(order.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {new Date(order.orderDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small"
                            startIcon={<Receipt />}
                            onClick={() => {
                              setSelectedOrder(order);
                              setOrderDialogOpen(true);
                            }}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Order Details Dialog */}
      <Dialog open={orderDialogOpen} onClose={() => setOrderDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Order Details #{selectedOrder?.id || selectedOrder?.orderId}</DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Seller:</Typography>
                  <Typography>{selectedOrder.sellerName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Total Amount:</Typography>
                  <Typography>${selectedOrder.totalAmount.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Status:</Typography>
                  <Chip 
                    label={selectedOrder.status} 
                    color={getStatusColor(selectedOrder.status)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">Order Date:</Typography>
                  <Typography>{new Date(selectedOrder.orderDate).toLocaleDateString()}</Typography>
                </Grid>
                {selectedOrder.deliveryAddress && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Delivery Address:</Typography>
                    <Typography>{selectedOrder.deliveryAddress}</Typography>
                  </Grid>
                )}
                {selectedOrder.notes && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Notes:</Typography>
                    <Typography>{selectedOrder.notes}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOrderDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BuyerDashboard;
