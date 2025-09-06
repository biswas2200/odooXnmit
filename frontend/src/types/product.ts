export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  size: string;
  color: string;
  condition: ProductCondition;
  material: string[];
  sustainabilityScore: number;
  sustainabilityBadges: SustainabilityBadge[];
  sellerId: string;
  seller: {
    id: string;
    username: string;
    avatar?: string;
    rating: number;
    reviewCount: number;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  isAvailable: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type ProductCategory = 
  | 'clothing'
  | 'shoes'
  | 'accessories'
  | 'bags'
  | 'jewelry'
  | 'home'
  | 'electronics'
  | 'books'
  | 'other';

export type ProductCondition = 
  | 'new'
  | 'like-new'
  | 'good'
  | 'fair'
  | 'poor';

export type SustainabilityBadge = 
  | 'organic'
  | 'recycled'
  | 'fair-trade'
  | 'vegan'
  | 'carbon-neutral'
  | 'local'
  | 'handmade';

export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition[];
  size?: string[];
  color?: string[];
  sustainabilityScore?: number;
  badges?: SustainabilityBadge[];
  location?: string;
  search?: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: File[];
  category: ProductCategory;
  subcategory?: string;
  brand?: string;
  size: string;
  color: string;
  condition: ProductCondition;
  material: string[];
  tags: string[];
  location: {
    city: string;
    state: string;
    country: string;
  };
}
