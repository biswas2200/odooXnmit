import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { useFeaturedProducts } from '@/hooks/useProducts';

const HomePage: React.FC = () => {
  const { data: featuredProducts, isLoading } = useFeaturedProducts(8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="max-w-3xl">
            <h1 className="home-hero-title">
              Discover Sustainable Fashion with{' '}
              <span className="text-green-300">AI-Powered</span> Recommendations
            </h1>
            <p className="home-hero-subtitle">
              Join thousands of eco-conscious shoppers finding their perfect style while making a positive impact on the planet.
            </p>
            <div className="home-hero-actions">
              <Link
                to="/products"
                className="btn-primary btn-lg"
              >
                Start Shopping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/sell"
                className="btn-secondary btn-lg"
              >
                Sell Your Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="home-stats">
        <div className="home-stats-content">
          <div className="home-stats-grid">
            <div className="home-stat">
              <div className="home-stat-value">10K+</div>
              <div className="home-stat-label">Active Users</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-value">50K+</div>
              <div className="home-stat-label">Products Listed</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-value">2.5M</div>
              <div className="home-stat-label">CO₂ Saved (kg)</div>
            </div>
            <div className="home-stat">
              <div className="home-stat-value">98%</div>
              <div className="home-stat-label">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-features-content">
          <h2 className="home-features-title">Why Choose ECoFinds?</h2>
          <div className="home-features-grid">
            <div className="home-feature">
              <div className="home-feature-icon">
                <Leaf className="w-16 h-16" />
              </div>
              <h3 className="home-feature-title">AI-Powered Echo Stylist</h3>
              <p className="home-feature-description">
                Get personalized fashion recommendations that match your style and values, powered by our advanced AI.
              </p>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <TrendingUp className="w-16 h-16" />
              </div>
              <h3 className="home-feature-title">Sustainability Scoring</h3>
              <p className="home-feature-description">
                Every product comes with a detailed sustainability score and environmental impact metrics.
              </p>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <Users className="w-16 h-16" />
              </div>
              <h3 className="home-feature-title">Community Driven</h3>
              <p className="home-feature-description">
                Join a community of like-minded individuals committed to sustainable fashion and environmental responsibility.
              </p>
            </div>
            <div className="home-feature">
              <div className="home-feature-icon">
                <ShoppingBag className="w-16 h-16" />
              </div>
              <h3 className="home-feature-title">Easy Shopping</h3>
              <p className="home-feature-description">
                Swipe through products with our intuitive interface, just like your favorite social media apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Featured Products
            </h2>
            <Link
              to="/products"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-1 inline" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="skeleton h-80 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Sustainable Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of eco-conscious shoppers and discover fashion that's good for you and the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="btn-secondary btn-lg bg-white text-primary-600 hover:bg-gray-100"
            >
              Create Free Account
            </Link>
            <Link
              to="/products"
              className="btn-outline btn-lg border-white text-white hover:bg-white hover:text-primary-600"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
