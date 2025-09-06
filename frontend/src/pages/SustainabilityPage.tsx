import React from 'react';
import { Leaf, Award, TrendingUp, Users, Target, Zap } from 'lucide-react';
import { useUserImpact } from '@/hooks/useSustainability';

const SustainabilityPage: React.FC = () => {
  const { data: userImpact, isLoading } = useUserImpact();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your sustainability impact...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sustainability-page">
      <div className="sustainability-header">
        <div className="sustainability-header-content">
          <h1 className="sustainability-title">Your Sustainability Impact</h1>
          <p className="sustainability-subtitle">
            Track your environmental contributions and see how you're making a difference
          </p>
        </div>
      </div>

      <div className="sustainability-main">
        {/* Overview Metrics */}
        <div className="sustainability-overview">
          <div className="sustainability-metric-card">
            <div className="sustainability-metric-icon">
              <Leaf className="w-12 h-12" />
            </div>
            <div className="sustainability-metric-value">
              {userImpact?.sustainabilityMetrics.carbonFootprintSaved.toFixed(1) || '0.0'}kg
            </div>
            <div className="sustainability-metric-label">CO₂ Saved</div>
          </div>

          <div className="sustainability-metric-card">
            <div className="sustainability-metric-icon">
              <Zap className="w-12 h-12" />
            </div>
            <div className="sustainability-metric-value">
              {userImpact?.sustainabilityMetrics.waterSaved.toFixed(0) || '0'}L
            </div>
            <div className="sustainability-metric-label">Water Saved</div>
          </div>

          <div className="sustainability-metric-card">
            <div className="sustainability-metric-icon">
              <Target className="w-12 h-12" />
            </div>
            <div className="sustainability-metric-value">
              {userImpact?.sustainabilityMetrics.wasteDiverted.toFixed(1) || '0.0'}kg
            </div>
            <div className="sustainability-metric-label">Waste Diverted</div>
          </div>

          <div className="sustainability-metric-card">
            <div className="sustainability-metric-icon">
              <TrendingUp className="w-12 h-12" />
            </div>
            <div className="sustainability-metric-value">
              {userImpact?.sustainabilityMetrics.energySaved.toFixed(1) || '0.0'}kWh
            </div>
            <div className="sustainability-metric-label">Energy Saved</div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="sustainability-metrics">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Environmental Impact Breakdown
              </h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Carbon Footprint</span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                      {userImpact?.sustainabilityMetrics.carbonFootprintSaved.toFixed(2) || '0.00'} kg CO₂
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((userImpact?.sustainabilityMetrics.carbonFootprintSaved || 0) / 10 * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Water Conservation</span>
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {userImpact?.sustainabilityMetrics.waterSaved.toFixed(0) || '0'} L
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((userImpact?.sustainabilityMetrics.waterSaved || 0) / 100 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Waste Reduction</span>
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      {userImpact?.sustainabilityMetrics.wasteDiverted.toFixed(2) || '0.00'} kg
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((userImpact?.sustainabilityMetrics.wasteDiverted || 0) / 5 * 100, 100)}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Energy Efficiency</span>
                    <span className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      {userImpact?.sustainabilityMetrics.energySaved.toFixed(2) || '0.00'} kWh
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min((userImpact?.sustainabilityMetrics.energySaved || 0) / 50 * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Your Sustainability Level
              </h2>
            </div>
            <div className="card-body">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {userImpact?.level ? userImpact.level.replace('-', ' ').toUpperCase() : 'BEGINNER'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Keep up the great work! You're making a positive impact on the environment.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {userImpact?.totalPurchases || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      ${userImpact?.totalSavings.toFixed(2) || '0.00'}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Money Saved</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {userImpact?.badges.length || 0}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Badges Earned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="sustainability-badges">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Your Sustainability Badges
              </h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userImpact?.badges.map((badge) => (
                  <div key={badge} className="sustainability-badge-card">
                    <div className="sustainability-badge-icon">
                      🏆
                    </div>
                    <h3 className="sustainability-badge-title">
                      {badge.replace('-', ' ').toUpperCase()}
                    </h3>
                    <p className="sustainability-badge-description">
                      Congratulations! You've earned this badge for your sustainable shopping habits.
                    </p>
                  </div>
                )) || (
                  <div className="col-span-full text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      No badges yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start shopping sustainably to earn your first badge!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Sustainability Tips
              </h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Choose Organic Materials</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Look for items made from organic cotton, hemp, or other sustainable materials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Support Local Sellers</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Buying from local sellers reduces transportation emissions and supports your community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Quality Over Quantity</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Invest in high-quality items that will last longer and reduce the need for frequent replacements.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainabilityPage;
