export interface SustainabilityMetrics {
  carbonFootprintSaved: number; // in kg CO2
  waterSaved: number; // in liters
  wasteDiverted: number; // in kg
  energySaved: number; // in kWh
  treesEquivalent: number; // number of trees
}

export interface UserImpact {
  userId: string;
  totalPurchases: number;
  totalSavings: number;
  sustainabilityMetrics: SustainabilityMetrics;
  badges: SustainabilityBadge[];
  level: SustainabilityLevel;
  createdAt: string;
  updatedAt: string;
}

export type SustainabilityLevel = 
  | 'beginner'
  | 'eco-conscious'
  | 'sustainable'
  | 'environmentalist'
  | 'eco-champion';

export type SustainabilityBadge = 
  | 'first-purchase'
  | 'eco-starter'
  | 'carbon-saver'
  | 'water-warrior'
  | 'waste-warrior'
  | 'energy-efficient'
  | 'tree-planter'
  | 'sustainability-champion'
  | 'eco-influencer'
  | 'planet-protector';

export interface CarbonCalculation {
  productId: string;
  productType: string;
  material: string[];
  manufacturingEmissions: number;
  transportationEmissions: number;
  packagingEmissions: number;
  totalEmissions: number;
  savingsVsNew: number;
}

export interface EnvironmentalImpact {
  productId: string;
  waterUsage: number;
  energyUsage: number;
  wasteGenerated: number;
  chemicalUsage: number;
  landUse: number;
}

export interface SustainabilityScore {
  overall: number;
  material: number;
  manufacturing: number;
  transportation: number;
  packaging: number;
  endOfLife: number;
  socialImpact: number;
}

export interface SustainabilityReport {
  userId: string;
  period: 'monthly' | 'yearly';
  metrics: SustainabilityMetrics;
  topCategories: {
    category: string;
    impact: number;
  }[];
  achievements: SustainabilityBadge[];
  recommendations: string[];
  generatedAt: string;
}
