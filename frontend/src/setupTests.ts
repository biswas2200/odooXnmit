import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';

// Mock the context providers
vi.mock('@/context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="auth-provider">{children}</div>,
}));

vi.mock('@/context/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="cart-provider">{children}</div>,
}));

vi.mock('@/context/ThemeContext', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <div data-testid="theme-provider">{children}</div>,
}));

// Mock the components
vi.mock('@/components/common/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <div data-testid="error-boundary">{children}</div>,
}));

vi.mock('@/components/auth/ProtectedRoute', () => ({
  ProtectedRoute: ({ children }: { children: React.ReactNode }) => <div data-testid="protected-route">{children}</div>,
}));

vi.mock('@/components/common/Header', () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock('@/components/common/Footer', () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

// Mock the pages
vi.mock('@/pages/HomePage', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('@/pages/LoginPage', () => ({
  default: () => <div data-testid="login-page">Login Page</div>,
}));

vi.mock('@/pages/RegisterPage', () => ({
  default: () => <div data-testid="register-page">Register Page</div>,
}));

vi.mock('@/pages/ProductsPage', () => ({
  default: () => <div data-testid="products-page">Products Page</div>,
}));

vi.mock('@/pages/ProductDetailPage', () => ({
  default: () => <div data-testid="product-detail-page">Product Detail Page</div>,
}));

vi.mock('@/pages/CartPage', () => ({
  default: () => <div data-testid="cart-page">Cart Page</div>,
}));

vi.mock('@/pages/ProfilePage', () => ({
  default: () => <div data-testid="profile-page">Profile Page</div>,
}));

vi.mock('@/pages/DashboardPage', () => ({
  default: () => <div data-testid="dashboard-page">Dashboard Page</div>,
}));

vi.mock('@/pages/SustainabilityPage', () => ({
  default: () => <div data-testid="sustainability-page">Sustainability Page</div>,
}));

// Mock styles
vi.mock('./styles/globals.css', () => ({}));
vi.mock('./styles/components/index.css', () => ({}));
vi.mock('./styles/pages/index.css', () => ({}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{ui}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });

  it('renders all context providers', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('auth-provider')).toBeInTheDocument();
    expect(screen.getByTestId('cart-provider')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('renders home page by default', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });

  it('renders login page at /login', () => {
    window.history.pushState({}, '', '/login');
    renderWithProviders(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders register page at /register', () => {
    window.history.pushState({}, '', '/register');
    renderWithProviders(<App />);
    expect(screen.getByTestId('register-page')).toBeInTheDocument();
  });

  it('renders products page at /products', () => {
    window.history.pushState({}, '', '/products');
    renderWithProviders(<App />);
    expect(screen.getByTestId('products-page')).toBeInTheDocument();
  });

  it('renders product detail page at /products/:id', () => {
    window.history.pushState({}, '', '/products/123');
    renderWithProviders(<App />);
    expect(screen.getByTestId('product-detail-page')).toBeInTheDocument();
  });

  it('renders protected routes with ProtectedRoute wrapper', () => {
    window.history.pushState({}, '', '/cart');
    renderWithProviders(<App />);
    expect(screen.getByTestId('protected-route')).toBeInTheDocument();
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });

  it('redirects unknown routes to home', () => {
    window.history.pushState({}, '', '/unknown-route');
    renderWithProviders(<App />);
    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
