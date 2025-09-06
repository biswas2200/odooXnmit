import { apiClient, handleApiError } from './api';
import { Product, ProductFilters, ProductFormData } from '@/types/product';

export const productService = {
  // Get all products with filters
  async getProducts(filters?: ProductFilters, page = 1, limit = 20): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams();
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v.toString()));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get(`/products?${params.toString()}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get single product by ID
  async getProduct(id: string): Promise<Product> {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Create new product
  async createProduct(data: ProductFormData): Promise<Product> {
    try {
      const formData = new FormData();
      
      // Append basic fields
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('price', data.price.toString());
      if (data.originalPrice) {
        formData.append('originalPrice', data.originalPrice.toString());
      }
      formData.append('category', data.category);
      if (data.subcategory) {
        formData.append('subcategory', data.subcategory);
      }
      if (data.brand) {
        formData.append('brand', data.brand);
      }
      formData.append('size', data.size);
      formData.append('color', data.color);
      formData.append('condition', data.condition);
      formData.append('material', JSON.stringify(data.material));
      formData.append('tags', JSON.stringify(data.tags));
      formData.append('location', JSON.stringify(data.location));
      
      // Append images
      data.images.forEach((image, index) => {
        formData.append(`images`, image);
      });
      
      const response = await apiClient.upload<Product>('/products', formData);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Update product
  async updateProduct(id: string, data: Partial<ProductFormData>): Promise<Product> {
    try {
      const formData = new FormData();
      
      // Append updated fields
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === 'images' && Array.isArray(value)) {
            value.forEach((image, index) => {
              formData.append(`images`, image);
            });
          } else if (key === 'material' || key === 'tags') {
            formData.append(key, JSON.stringify(value));
          } else if (key === 'location') {
            formData.append(key, JSON.stringify(value));
          } else {
            formData.append(key, value.toString());
          }
        }
      });
      
      const response = await apiClient.put<Product>(`/products/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Delete product
  async deleteProduct(id: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user's products
  async getUserProducts(page = 1, limit = 20): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const response = await apiClient.get(`/products/user?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Search products
  async searchProducts(query: string, filters?: ProductFilters, page = 1, limit = 20): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const params = new URLSearchParams();
      params.append('q', query);
      
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
              value.forEach(v => params.append(key, v.toString()));
            } else {
              params.append(key, value.toString());
            }
          }
        });
      }
      
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      
      const response = await apiClient.get(`/products/search?${params.toString()}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get featured products
  async getFeaturedProducts(limit = 10): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>(`/products/featured?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get products by category
  async getProductsByCategory(category: string, page = 1, limit = 20): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const response = await apiClient.get(`/products/category/${category}?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get similar products
  async getSimilarProducts(productId: string, limit = 5): Promise<Product[]> {
    try {
      const response = await apiClient.get<Product[]>(`/products/${productId}/similar?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get product categories
  async getCategories(): Promise<{ name: string; count: number }[]> {
    try {
      const response = await apiClient.get<{ name: string; count: number }[]>('/products/categories');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get product statistics
  async getProductStats(): Promise<{
    totalProducts: number;
    totalCategories: number;
    averagePrice: number;
    totalSellers: number;
  }> {
    try {
      const response = await apiClient.get('/products/stats');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Report product
  async reportProduct(productId: string, reason: string, description?: string): Promise<void> {
    try {
      await apiClient.post(`/products/${productId}/report`, {
        reason,
        description,
      });
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Save product to favorites
  async saveToFavorites(productId: string): Promise<void> {
    try {
      await apiClient.post(`/products/${productId}/favorite`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Remove product from favorites
  async removeFromFavorites(productId: string): Promise<void> {
    try {
      await apiClient.delete(`/products/${productId}/favorite`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user's favorite products
  async getFavoriteProducts(page = 1, limit = 20): Promise<{
    products: Product[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    try {
      const response = await apiClient.get(`/products/favorites?page=${page}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
