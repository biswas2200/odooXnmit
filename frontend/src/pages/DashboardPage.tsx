import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Package } from 'lucide-react';

const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <h1 className="dashboard-title">Dashboard</h1>
        </div>
      </div>

      <div className="dashboard-main">
        {/* Overview Stats */}
        <div className="dashboard-overview">
          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="dashboard-stat">$2,450</div>
                <div className="dashboard-stat-label">Total Revenue</div>
                <div className="dashboard-stat-change dashboard-stat-change-positive">
                  +12.5% from last month
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="dashboard-stat">24</div>
                <div className="dashboard-stat-label">Items Sold</div>
                <div className="dashboard-stat-change dashboard-stat-change-positive">
                  +8.2% from last month
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="dashboard-stat">156</div>
                <div className="dashboard-stat-label">Total Views</div>
                <div className="dashboard-stat-change dashboard-stat-change-positive">
                  +23.1% from last month
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="dashboard-stat">4.8</div>
                <div className="dashboard-stat-label">Average Rating</div>
                <div className="dashboard-stat-change dashboard-stat-change-positive">
                  +0.2 from last month
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="dashboard-charts">
          <div className="dashboard-card">
            <div className="dashboard-card-title">Sales Overview</div>
            <div className="dashboard-chart">
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <BarChart3 className="w-16 h-16" />
                <span className="ml-4">Sales chart will be displayed here</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-title">Top Categories</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Clothing</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Shoes</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">Accessories</span>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-recent">
          <div className="dashboard-card">
            <div className="dashboard-card-title">Recent Orders</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-xs font-medium">✓</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Vintage Denim Jacket</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Order #12345</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">$45.00</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Completed</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 text-xs font-medium">⏳</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Sustainable Sneakers</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Order #12346</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">$78.00</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Processing</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">📦</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Eco-Friendly Bag</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Order #12347</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">$32.00</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Shipped</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card-title">Quick Actions</div>
            <div className="space-y-3">
              <button className="w-full btn-primary">
                <ShoppingBag className="w-4 h-4 mr-2" />
                List New Item
              </button>
              <button className="w-full btn-outline">
                <Users className="w-4 h-4 mr-2" />
                View Messages
              </button>
              <button className="w-full btn-outline">
                <Package className="w-4 h-4 mr-2" />
                Manage Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
