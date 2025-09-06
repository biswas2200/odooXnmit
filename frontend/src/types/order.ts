export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  trackingNumber?: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: {
    id: string;
    title: string;
    images: string[];
    size: string;
    color: string;
  };
  quantity: number;
  price: number;
  sellerId: string;
  seller: {
    id: string;
    username: string;
    avatar?: string;
  };
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderHistory {
  orders: Order[];
  totalOrders: number;
  totalSpent: number;
  averageOrderValue: number;
}

export interface OrderFilters {
  status?: OrderStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
  minAmount?: number;
  maxAmount?: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: string;
  expiryYear?: string;
}
