import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { orderService } from '@/services/orderService';
import { Order, OrderHistory, OrderFilters } from '@/types/order';

// Hook for fetching orders
export const useOrders = (filters?: OrderFilters, page = 1, limit = 20) => {
  return useQuery(
    ['orders', filters, page, limit],
    () => orderService.getOrders(filters, page, limit),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

// Hook for fetching a single order
export const useOrder = (id: string) => {
  return useQuery(
    ['order', id],
    () => orderService.getOrder(id),
    {
      enabled: !!id,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching order history
export const useOrderHistory = () => {
  return useQuery(
    ['orders', 'history'],
    () => orderService.getOrderHistory(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching seller orders
export const useSellerOrders = (filters?: OrderFilters, page = 1, limit = 20) => {
  return useQuery(
    ['orders', 'seller', filters, page, limit],
    () => orderService.getSellerOrders(filters, page, limit),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

// Hook for fetching order statistics
export const useOrderStats = () => {
  return useQuery(
    ['orders', 'stats'],
    () => orderService.getOrderStats(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching seller order statistics
export const useSellerOrderStats = () => {
  return useQuery(
    ['orders', 'seller', 'stats'],
    () => orderService.getSellerOrderStats(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for tracking an order
export const useOrderTracking = (id: string) => {
  return useQuery(
    ['order', 'tracking', id],
    () => orderService.trackOrder(id),
    {
      enabled: !!id,
      staleTime: 1 * 60 * 1000, // 1 minute
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    }
  );
};

// Hook for cancelling an order
export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, reason }: { id: string; reason?: string }) =>
      orderService.cancelOrder(id, reason),
    {
      onSuccess: (_, { id }) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['orders']);
        queryClient.invalidateQueries(['orders', 'stats']);
      },
    }
  );
};

// Hook for requesting a refund
export const useRequestRefund = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, reason, description }: { id: string; reason: string; description?: string }) =>
      orderService.requestRefund(id, reason, description),
    {
      onSuccess: (_, { id }) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['orders']);
      },
    }
  );
};

// Hook for updating order status (seller)
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, status, notes }: { id: string; status: string; notes?: string }) =>
      orderService.updateOrderStatus(id, status, notes),
    {
      onSuccess: (_, { id }) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['orders']);
        queryClient.invalidateQueries(['orders', 'seller']);
      },
    }
  );
};

// Hook for adding tracking information (seller)
export const useAddTrackingInfo = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, trackingNumber, carrier }: { id: string; trackingNumber: string; carrier: string }) =>
      orderService.addTrackingInfo(id, trackingNumber, carrier),
    {
      onSuccess: (_, { id }) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['order', 'tracking', id]);
        queryClient.invalidateQueries(['orders']);
        queryClient.invalidateQueries(['orders', 'seller']);
      },
    }
  );
};

// Hook for marking order as delivered
export const useMarkAsDelivered = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => orderService.markAsDelivered(id),
    {
      onSuccess: (_, id) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['orders']);
        queryClient.invalidateQueries(['orders', 'seller']);
      },
    }
  );
};

// Hook for confirming order receipt
export const useConfirmReceipt = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => orderService.confirmReceipt(id),
    {
      onSuccess: (_, id) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', id]);
        queryClient.invalidateQueries(['orders']);
      },
    }
  );
};

// Hook for leaving a review
export const useLeaveReview = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ orderId, productId, rating, comment }: {
      orderId: string;
      productId: string;
      rating: number;
      comment: string;
    }) => orderService.leaveReview(orderId, productId, rating, comment),
    {
      onSuccess: (_, { orderId }) => {
        // Update the order in cache
        queryClient.invalidateQueries(['order', orderId]);
        queryClient.invalidateQueries(['order', 'reviews', orderId]);
      },
    }
  );
};

// Hook for fetching order reviews
export const useOrderReviews = (orderId: string) => {
  return useQuery(
    ['order', 'reviews', orderId],
    () => orderService.getOrderReviews(orderId),
    {
      enabled: !!orderId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for downloading order invoice
export const useDownloadInvoice = () => {
  return useMutation(
    (orderId: string) => orderService.downloadInvoice(orderId),
    {
      onSuccess: (blob, orderId) => {
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${orderId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
    }
  );
};

// Hook for reordering items
export const useReorder = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (orderId: string) => orderService.reorder(orderId),
    {
      onSuccess: () => {
        // Invalidate cart queries to reflect new items
        queryClient.invalidateQueries(['cart']);
        queryClient.invalidateQueries(['cart', 'count']);
      },
    }
  );
};

// Hook for managing order filters
export const useOrderFilters = (initialFilters?: OrderFilters) => {
  const [filters, setFilters] = useState<OrderFilters>(initialFilters || {});
  const [page, setPage] = useState(1);

  const updateFilter = useCallback((key: keyof OrderFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    filters,
    page,
    setPage,
    updateFilter,
    clearFilters,
    resetPage,
  };
};

// Hook for order status management
export const useOrderStatus = () => {
  const getStatusColor = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-purple-600 bg-purple-100';
      case 'shipped':
        return 'text-indigo-600 bg-indigo-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      case 'refunded':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'confirmed':
        return '✅';
      case 'processing':
        return '🔄';
      case 'shipped':
        return '📦';
      case 'delivered':
        return '🎉';
      case 'cancelled':
        return '❌';
      case 'refunded':
        return '💰';
      default:
        return '❓';
    }
  }, []);

  const isOrderActive = useCallback((status: string) => {
    return !['cancelled', 'refunded', 'delivered'].includes(status.toLowerCase());
  }, []);

  const canCancel = useCallback((status: string) => {
    return ['pending', 'confirmed'].includes(status.toLowerCase());
  }, []);

  const canRefund = useCallback((status: string) => {
    return ['delivered'].includes(status.toLowerCase());
  }, []);

  return {
    getStatusColor,
    getStatusIcon,
    isOrderActive,
    canCancel,
    canRefund,
  };
};
