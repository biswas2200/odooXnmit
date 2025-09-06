import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">ECoFinds</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Your sustainable second-hand marketplace. Discover eco-friendly fashion with AI-powered recommendations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <Link to="/products" className="footer-link">
                Browse Products
              </Link>
              <Link to="/sell" className="footer-link">
                Sell Items
              </Link>
              <Link to="/sustainability" className="footer-link">
                Sustainability
              </Link>
              <Link to="/about" className="footer-link">
                About Us
              </Link>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h3 className="footer-title">Categories</h3>
            <div className="footer-links">
              <Link to="/products?category=clothing" className="footer-link">
                Clothing
              </Link>
              <Link to="/products?category=shoes" className="footer-link">
                Shoes
              </Link>
              <Link to="/products?category=accessories" className="footer-link">
                Accessories
              </Link>
              <Link to="/products?category=bags" className="footer-link">
                Bags
              </Link>
              <Link to="/products?category=jewelry" className="footer-link">
                Jewelry
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h3 className="footer-title">Support</h3>
            <div className="footer-links">
              <Link to="/help" className="footer-link">
                Help Center
              </Link>
              <Link to="/shipping" className="footer-link">
                Shipping Info
              </Link>
              <Link to="/returns" className="footer-link">
                Returns & Exchanges
              </Link>
              <Link to="/privacy" className="footer-link">
                Privacy Policy
              </Link>
              <Link to="/terms" className="footer-link">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Email</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">support@ecofinds.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Phone</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Address</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} ECoFinds. All rights reserved.
              </p>
              <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for the planet</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
