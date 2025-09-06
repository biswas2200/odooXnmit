import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { sustainabilityService } from '@/services/sustainabilityService';
import { 
  SustainabilityMetrics, 
  UserImpact, 
  CarbonCalculation, 
  EnvironmentalImpact, 
  SustainabilityScore, 
  SustainabilityReport 
} from '@/types/sustainability';

// Hook for fetching user's sustainability impact
export const useUserImpact = () => {
  return useQuery(
    ['sustainability', 'user-impact'],
    () => sustainabilityService.getUserImpact(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for calculating carbon footprint
export const useCarbonFootprint = (productId: string) => {
  return useQuery(
    ['sustainability', 'carbon', productId],
    () => sustainabilityService.calculateCarbonFootprint(productId),
    {
      enabled: !!productId,
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for calculating environmental impact
export const useEnvironmentalImpact = (productId: string) => {
  return useQuery(
    ['sustainability', 'environmental', productId],
    () => sustainabilityService.calculateEnvironmentalImpact(productId),
    {
      enabled: !!productId,
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for fetching sustainability score
export const useSustainabilityScore = (productId: string) => {
  return useQuery(
    ['sustainability', 'score', productId],
    () => sustainabilityService.getSustainabilityScore(productId),
    {
      enabled: !!productId,
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for fetching bulk sustainability metrics
export const useBulkSustainabilityMetrics = (productIds: string[]) => {
  return useQuery(
    ['sustainability', 'bulk', productIds],
    () => sustainabilityService.getBulkSustainabilityMetrics(productIds),
    {
      enabled: productIds.length > 0,
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for fetching sustainability report
export const useSustainabilityReport = (period: 'monthly' | 'yearly' = 'monthly') => {
  return useQuery(
    ['sustainability', 'report', period],
    () => sustainabilityService.getSustainabilityReport(period),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for fetching global sustainability statistics
export const useGlobalSustainabilityStats = () => {
  return useQuery(
    ['sustainability', 'global-stats'],
    () => sustainabilityService.getGlobalStats(),
    {
      staleTime: 15 * 60 * 1000, // 15 minutes
    }
  );
};

// Hook for fetching sustainability leaderboard
export const useSustainabilityLeaderboard = (period: 'monthly' | 'yearly' | 'all-time' = 'monthly', limit = 50) => {
  return useQuery(
    ['sustainability', 'leaderboard', period, limit],
    () => sustainabilityService.getLeaderboard(period, limit),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for fetching available badges
export const useAvailableBadges = () => {
  return useQuery(
    ['sustainability', 'badges'],
    () => sustainabilityService.getAvailableBadges(),
    {
      staleTime: 60 * 60 * 1000, // 1 hour
    }
  );
};

// Hook for fetching user's earned badges
export const useUserBadges = () => {
  return useQuery(
    ['sustainability', 'user-badges'],
    () => sustainabilityService.getUserBadges(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );
};

// Hook for calculating purchase savings
export const useCalculatePurchaseSavings = () => {
  return useMutation(
    ({ productIds, quantities }: { productIds: string[]; quantities: number[] }) =>
      sustainabilityService.calculatePurchaseSavings(productIds, quantities)
  );
};

// Hook for fetching sustainability tips
export const useSustainabilityTips = (category?: string) => {
  return useQuery(
    ['sustainability', 'tips', category],
    () => sustainabilityService.getSustainabilityTips(category),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for completing a tip
export const useCompleteTip = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (tipId: string) => sustainabilityService.completeTip(tipId),
    {
      onSuccess: () => {
        // Invalidate user impact and badges
        queryClient.invalidateQueries(['sustainability', 'user-impact']);
        queryClient.invalidateQueries(['sustainability', 'user-badges']);
        queryClient.invalidateQueries(['sustainability', 'tips']);
      },
    }
  );
};

// Hook for fetching sustainability challenges
export const useSustainabilityChallenges = () => {
  return useQuery(
    ['sustainability', 'challenges'],
    () => sustainabilityService.getChallenges(),
    {
      staleTime: 10 * 60 * 1000, // 10 minutes
    }
  );
};

// Hook for joining a challenge
export const useJoinChallenge = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (challengeId: string) => sustainabilityService.joinChallenge(challengeId),
    {
      onSuccess: () => {
        // Invalidate challenges and user impact
        queryClient.invalidateQueries(['sustainability', 'challenges']);
        queryClient.invalidateQueries(['sustainability', 'user-impact']);
      },
    }
  );
};

// Hook for fetching challenge progress
export const useChallengeProgress = (challengeId: string) => {
  return useQuery(
    ['sustainability', 'challenge-progress', challengeId],
    () => sustainabilityService.getChallengeProgress(challengeId),
    {
      enabled: !!challengeId,
      staleTime: 1 * 60 * 1000, // 1 minute
      refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
    }
  );
};

// Hook for sharing sustainability achievement
export const useShareAchievement = () => {
  return useMutation(
    ({ achievementId, platform }: { achievementId: string; platform: 'twitter' | 'facebook' | 'instagram' }) =>
      sustainabilityService.shareAchievement(achievementId, platform)
  );
};

// Hook for fetching education content
export const useEducationContent = (category?: string) => {
  return useQuery(
    ['sustainability', 'education', category],
    () => sustainabilityService.getEducationContent(category),
    {
      staleTime: 30 * 60 * 1000, // 30 minutes
    }
  );
};

// Hook for tracking article read
export const useTrackArticleRead = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (articleId: string) => sustainabilityService.trackArticleRead(articleId),
    {
      onSuccess: () => {
        // Invalidate user impact
        queryClient.invalidateQueries(['sustainability', 'user-impact']);
      },
    }
  );
};

// Hook for sustainability calculations and utilities
export const useSustainabilityUtils = () => {
  const formatMetrics = useCallback((metrics: SustainabilityMetrics) => {
    return {
      carbonFootprint: `${metrics.carbonFootprint.toFixed(2)} kg CO₂`,
      waterSaved: `${metrics.waterSaved.toFixed(0)} L`,
      wasteDiverted: `${metrics.wasteDiverted.toFixed(2)} kg`,
      energySaved: `${metrics.energySaved.toFixed(2)} kWh`,
      treesEquivalent: `${metrics.treesEquivalent.toFixed(1)} trees`,
    };
  }, []);

  const calculateTotalImpact = useCallback((metrics: SustainabilityMetrics) => {
    // Weighted calculation based on environmental importance
    const weights = {
      carbonFootprint: 0.4,
      waterSaved: 0.2,
      wasteDiverted: 0.2,
      energySaved: 0.1,
      treesEquivalent: 0.1,
    };

    const normalizedMetrics = {
      carbonFootprint: Math.min(metrics.carbonFootprint / 100, 1), // Normalize to 0-1
      waterSaved: Math.min(metrics.waterSaved / 1000, 1),
      wasteDiverted: Math.min(metrics.wasteDiverted / 100, 1),
      energySaved: Math.min(metrics.energySaved / 1000, 1),
      treesEquivalent: Math.min(metrics.treesEquivalent / 10, 1),
    };

    const totalScore = Object.entries(weights).reduce((score, [key, weight]) => {
      return score + (normalizedMetrics[key as keyof typeof normalizedMetrics] * weight);
    }, 0);

    return Math.round(totalScore * 100);
  }, []);

  const getImpactLevel = useCallback((score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (score >= 40) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    if (score >= 20) return { level: 'Poor', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { level: 'Very Poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  }, []);

  const getBadgeRarity = useCallback((rarity: string) => {
    switch (rarity) {
      case 'common':
        return { color: 'text-gray-600', bgColor: 'bg-gray-100', icon: '🥉' };
      case 'uncommon':
        return { color: 'text-green-600', bgColor: 'bg-green-100', icon: '🥈' };
      case 'rare':
        return { color: 'text-blue-600', bgColor: 'bg-blue-100', icon: '🥇' };
      case 'epic':
        return { color: 'text-purple-600', bgColor: 'bg-purple-100', icon: '💎' };
      case 'legendary':
        return { color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: '👑' };
      default:
        return { color: 'text-gray-600', bgColor: 'bg-gray-100', icon: '🥉' };
    }
  }, []);

  return {
    formatMetrics,
    calculateTotalImpact,
    getImpactLevel,
    getBadgeRarity,
  };
};

// Hook for sustainability dashboard data
export const useSustainabilityDashboard = () => {
  const { data: userImpact, isLoading: impactLoading } = useUserImpact();
  const { data: globalStats, isLoading: statsLoading } = useGlobalSustainabilityStats();
  const { data: userBadges, isLoading: badgesLoading } = useUserBadges();
  const { data: leaderboard, isLoading: leaderboardLoading } = useSustainabilityLeaderboard();

  const isLoading = impactLoading || statsLoading || badgesLoading || leaderboardLoading;

  return {
    userImpact,
    globalStats,
    userBadges,
    leaderboard,
    isLoading,
  };
};
