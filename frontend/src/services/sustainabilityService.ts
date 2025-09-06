import { apiClient, handleApiError } from './api';
import { 
  SustainabilityMetrics, 
  UserImpact, 
  CarbonCalculation, 
  EnvironmentalImpact, 
  SustainabilityScore, 
  SustainabilityReport 
} from '@/types/sustainability';

export const sustainabilityService = {
  // Get user's sustainability impact
  async getUserImpact(): Promise<UserImpact> {
    try {
      const response = await apiClient.get<UserImpact>('/sustainability/impact');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Calculate carbon footprint for a product
  async calculateCarbonFootprint(productId: string): Promise<CarbonCalculation> {
    try {
      const response = await apiClient.get<CarbonCalculation>(`/sustainability/carbon/${productId}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Calculate environmental impact for a product
  async calculateEnvironmentalImpact(productId: string): Promise<EnvironmentalImpact> {
    try {
      const response = await apiClient.get<EnvironmentalImpact>(`/sustainability/environmental/${productId}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability score for a product
  async getSustainabilityScore(productId: string): Promise<SustainabilityScore> {
    try {
      const response = await apiClient.get<SustainabilityScore>(`/sustainability/score/${productId}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability metrics for multiple products
  async getBulkSustainabilityMetrics(productIds: string[]): Promise<{
    [productId: string]: {
      carbonFootprint: CarbonCalculation;
      environmentalImpact: EnvironmentalImpact;
      sustainabilityScore: SustainabilityScore;
    };
  }> {
    try {
      const response = await apiClient.post<{
        [productId: string]: {
          carbonFootprint: CarbonCalculation;
          environmentalImpact: EnvironmentalImpact;
          sustainabilityScore: SustainabilityScore;
        };
      }>('/sustainability/bulk', { productIds });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability report
  async getSustainabilityReport(period: 'monthly' | 'yearly' = 'monthly'): Promise<SustainabilityReport> {
    try {
      const response = await apiClient.get<SustainabilityReport>(`/sustainability/report?period=${period}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get global sustainability statistics
  async getGlobalStats(): Promise<{
    totalUsers: number;
    totalCarbonSaved: number;
    totalWaterSaved: number;
    totalWasteDiverted: number;
    totalEnergySaved: number;
    totalTreesEquivalent: number;
    topCategories: {
      category: string;
      impact: number;
    }[];
    recentAchievements: {
      userId: string;
      achievement: string;
      timestamp: string;
    }[];
  }> {
    try {
      const response = await apiClient.get('/sustainability/global-stats');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability leaderboard
  async getLeaderboard(period: 'monthly' | 'yearly' | 'all-time' = 'monthly', limit = 50): Promise<{
    users: {
      userId: string;
      username: string;
      avatar?: string;
      level: string;
      totalImpact: number;
      rank: number;
    }[];
    userRank?: {
      rank: number;
      totalImpact: number;
    };
  }> {
    try {
      const response = await apiClient.get(`/sustainability/leaderboard?period=${period}&limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability badges
  async getAvailableBadges(): Promise<{
    badges: {
      id: string;
      name: string;
      description: string;
      icon: string;
      requirements: {
        metric: string;
        threshold: number;
      }[];
      rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    }[];
  }> {
    try {
      const response = await apiClient.get('/sustainability/badges');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get user's earned badges
  async getUserBadges(): Promise<{
    badges: {
      id: string;
      name: string;
      description: string;
      icon: string;
      earnedAt: string;
      rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    }[];
    totalBadges: number;
    rareBadges: number;
    epicBadges: number;
    legendaryBadges: number;
  }> {
    try {
      const response = await apiClient.get('/sustainability/user-badges');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Calculate savings from purchase
  async calculatePurchaseSavings(productIds: string[], quantities: number[]): Promise<{
    totalSavings: SustainabilityMetrics;
    breakdown: {
      productId: string;
      quantity: number;
      savings: SustainabilityMetrics;
    }[];
  }> {
    try {
      const response = await apiClient.post('/sustainability/calculate-savings', {
        products: productIds.map((id, index) => ({
          productId: id,
          quantity: quantities[index],
        })),
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability tips
  async getSustainabilityTips(category?: string): Promise<{
    tips: {
      id: string;
      title: string;
      description: string;
      category: string;
      impact: string;
      difficulty: 'easy' | 'medium' | 'hard';
      estimatedSavings: SustainabilityMetrics;
    }[];
  }> {
    try {
      const params = category ? `?category=${category}` : '';
      const response = await apiClient.get(`/sustainability/tips${params}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Mark tip as completed
  async completeTip(tipId: string): Promise<void> {
    try {
      await apiClient.post(`/sustainability/tips/${tipId}/complete`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability challenges
  async getChallenges(): Promise<{
    challenges: {
      id: string;
      title: string;
      description: string;
      category: string;
      duration: number; // in days
      reward: SustainabilityMetrics;
      participants: number;
      isActive: boolean;
      startDate: string;
      endDate: string;
    }[];
  }> {
    try {
      const response = await apiClient.get('/sustainability/challenges');
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Join sustainability challenge
  async joinChallenge(challengeId: string): Promise<void> {
    try {
      await apiClient.post(`/sustainability/challenges/${challengeId}/join`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get challenge progress
  async getChallengeProgress(challengeId: string): Promise<{
    progress: number; // percentage
    currentValue: number;
    targetValue: number;
    timeRemaining: number; // in days
    participants: number;
    userRank?: number;
  }> {
    try {
      const response = await apiClient.get(`/sustainability/challenges/${challengeId}/progress`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Share sustainability achievement
  async shareAchievement(achievementId: string, platform: 'twitter' | 'facebook' | 'instagram'): Promise<{
    shareUrl: string;
    message: string;
  }> {
    try {
      const response = await apiClient.post(`/sustainability/share/${achievementId}`, {
        platform,
      });
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Get sustainability education content
  async getEducationContent(category?: string): Promise<{
    articles: {
      id: string;
      title: string;
      excerpt: string;
      category: string;
      readTime: number; // in minutes
      publishedAt: string;
      author: string;
      imageUrl?: string;
    }[];
  }> {
    try {
      const params = category ? `?category=${category}` : '';
      const response = await apiClient.get(`/sustainability/education${params}`);
      return response;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Track article read
  async trackArticleRead(articleId: string): Promise<void> {
    try {
      await apiClient.post(`/sustainability/education/${articleId}/read`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};
