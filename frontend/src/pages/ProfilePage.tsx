import React from 'react';
import { User, Mail, MapPin, Calendar, Edit } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Profile Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-header-content">
          <div className="profile-header">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="profile-name">
              {user.firstName} {user.lastName}
            </div>
            <div className="profile-username">@{user.username}</div>
            
            <div className="profile-stats">
              <div className="profile-stat">
                <div className="profile-stat-value">12</div>
                <div className="profile-stat-label">Items Sold</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">8</div>
                <div className="profile-stat-label">Items Bought</div>
              </div>
              <div className="profile-stat">
                <div className="profile-stat-value">4.8</div>
                <div className="profile-stat-label">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-main">
        <div className="profile-layout">
          {/* Profile Sidebar */}
          <div className="profile-sidebar">
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Profile Information
                </h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  
                  {user.location && (
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Location</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{user.location}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Member Since</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {user.bio && (
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">Bio</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
                    </div>
                  )}
                </div>
                
                <button className="btn-outline w-full mt-6">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="profile-content">
            {/* Recent Activity */}
            <div className="profile-section">
              <div className="profile-section-title">Recent Activity</div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <span className="text-green-600 dark:text-green-400 text-sm font-medium">✓</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Item sold: Vintage Denim Jacket
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">2 days ago</p>
                  </div>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    +$45.00
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">🛒</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Item purchased: Sustainable Sneakers
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">5 days ago</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    -$78.00
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">⭐</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Received 5-star review
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">1 week ago</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sustainability Impact */}
            <div className="profile-section">
              <div className="profile-section-title">Your Sustainability Impact</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                    2.3kg
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ Saved</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    15L
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Water Saved</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                    8
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Items Recycled</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
