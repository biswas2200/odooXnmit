import api from './api';

export const productService = {
  async getProducts(page = 0, size = 12) {
    try {
      const response = await api.get(`/products?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product');
    }
  },

  async searchProducts(keyword, page = 0, size = 12) {
    try {
      const response = await api.get(`/products/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  },

  async getProductsByCategory(categoryId, page = 0, size = 12) {
    try {
      const response = await api.get(`/products/category/${categoryId}?page=${page}&size=${size}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products by category');
    }
  },

  async createProduct(productData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product');
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product');
    }
  },

  async deleteProduct(id) {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product');
    }
  }
};

export const categoryService = {
  async getCategories() {
    try {
      console.log('Fetching categories from:', `${api.defaults.baseURL}/categories`);
      const response = await api.get('/categories');
      console.log('Categories response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Category fetch error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        url: error.config?.url,
        data: error.response?.data
      });
      throw new Error(error.response?.data?.message || 'Failed to fetch categories');
    }
  }
};
