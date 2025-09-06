export interface CartItem {
  id: string;
  productId: string;
  product: {
    id: string;
    title: string;
    price: number;
    images: string[];
    size: string;
    color: string;
    seller: {
      id: string;
      username: string;
    };
  };
  quantity: number;
  addedAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
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

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  billingAddress?: ShippingAddress;
  notes?: string;
}

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  card?: {
    number: string;
    expiryMonth: string;
    expiryYear: string;
    cvv: string;
    name: string;
  };
  paypalEmail?: string;
}
