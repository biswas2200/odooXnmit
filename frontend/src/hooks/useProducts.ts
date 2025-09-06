import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { productService } from '@/services/productService';
import { Product, ProductFilters, ProductFormData } from '@/types/product';

// Hook for fetching products with filters
export const useProducts = (filters?: ProductFilters, page = 1, limit = 20) => {
  return useQuery(
    ['products', filters, page, limit],
    () => productService.getProducts(filters, page, limit),
    {
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching a single product
export const useProduct = (id: string) => {
  return useQuery(
    ['product', id],
    () => productService.getProduct(id),
    {
      enabled: !!id,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for fetching featured products
export const useFeaturedProducts = (limit = 10) => {
  return useQuery(
    ['products', 'featured', limit],
    () => productService.getFeaturedProducts(limit),
    {
      staleTime: 15 * 60 * 1000, // 15 minutes
    }
  );
};

// Hook for searching products
export const useProductSearch = (query: string, filters?: ProductFilters, page = 1, limit = 20) => {
  return useQuery(
    ['products', 'search', query, filters, page, limit],
    () => productService.searchProducts(query, filters, page, limit),
    {
      enabled: !!query && query.length > 0,
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

// Hook for fetching products by category
export const useProductsByCategory = (category: string, page = 1, limit = 20) => {
  return useQuery(
    ['products', 'category', category, page, limit],
    () => productService.getProductsByCategory(category, page, limit),
    {
      enabled: !!category,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching similar products
export const useSimilarProducts = (productId: string, limit = 5) => {
  return useQuery(
    ['products', 'similar', productId, limit],
    () => productService.getSimilarProducts(productId, limit),
    {
      enabled: !!productId,
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for fetching user's products
export const useUserProducts = (page = 1, limit = 20) => {
  return useQuery(
    ['products', 'user', page, limit],
    () => productService.getUserProducts(page, limit),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

// Hook for fetching favorite products
export const useFavoriteProducts = (page = 1, limit = 20) => {
  return useQuery(
    ['products', 'favorites', page, limit],
    () => productService.getFavoriteProducts(page, limit),
    {
      keepPreviousData: true,
      staleTime: 2 * 60 * 1000, // 2 minutes
    }
  );
};

// Hook for fetching product categories
export const useProductCategories = () => {
  return useQuery(
    ['products', 'categories'],
    () => productService.getCategories(),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for fetching product statistics
export const useProductStats = () => {
  return useQuery(
    ['products', 'stats'],
    () => productService.getProductStats(),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for creating a product
export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: ProductFormData) => productService.createProduct(data),
    {
      onSuccess: () => {
        // Invalidate and refetch product queries
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['products', 'user']);
        queryClient.invalidateQueries(['products', 'stats']);
      },
    }
  );
};

// Hook for updating a product
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: Partial<ProductFormData> }) =>
      productService.updateProduct(id, data),
    {
      onSuccess: (updatedProduct) => {
        // Update the product in cache
        queryClient.setQueryData(['product', updatedProduct.id], updatedProduct);
        
        // Invalidate related queries
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['products', 'user']);
        queryClient.invalidateQueries(['products', 'featured']);
      },
    }
  );
};

// Hook for deleting a product
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => productService.deleteProduct(id),
    {
      onSuccess: (_, deletedId) => {
        // Remove the product from cache
        queryClient.removeQueries(['product', deletedId]);
        
        // Invalidate related queries
        queryClient.invalidateQueries(['products']);
        queryClient.invalidateQueries(['products', 'user']);
        queryClient.invalidateQueries(['products', 'stats']);
      },
    }
  );
};

// Hook for saving/removing product from favorites
export const useFavoriteProduct = () => {
  const queryClient = useQueryClient();

  const saveToFavorites = useMutation(
    (productId: string) => productService.saveToFavorites(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products', 'favorites']);
      },
    }
  );

  const removeFromFavorites = useMutation(
    (productId: string) => productService.removeFromFavorites(productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['products', 'favorites']);
      },
    }
  );

  return {
    saveToFavorites: saveToFavorites.mutate,
    removeFromFavorites: removeFromFavorites.mutate,
    isSaving: saveToFavorites.isLoading,
    isRemoving: removeFromFavorites.isLoading,
  };
};

// Hook for reporting a product
export const useReportProduct = () => {
  return useMutation(
    ({ productId, reason, description }: { productId: string; reason: string; description?: string }) =>
      productService.reportProduct(productId, reason, description)
  );
};

// Hook for managing product form state
export const useProductForm = (initialData?: Partial<ProductFormData>) => {
  const [formData, setFormData] = useState<Partial<ProductFormData>>(initialData || {});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = useCallback((field: keyof ProductFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const setError = useCallback((field: string, message: string) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const resetForm = useCallback(() => {
    setFormData(initialData || {});
    setErrors({});
    setIsSubmitting(false);
  }, [initialData]);

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    updateField,
    setError,
    clearErrors,
    resetForm,
  };
};
