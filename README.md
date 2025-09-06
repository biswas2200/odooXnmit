# EcoFinds - Sustainable Second-Hand Marketplace Platform

## Table of Contents
- [Overview](#overview)
- [Problem Statement](#problem-statement)
- [Solution](#solution)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Business Model](#business-model)
- [Environmental Impact](#environmental-impact)
- [Demo](#demo)
- [Contributing](#contributing)
- [License](#license)

## Overview

EcoFinds is a dual-purpose sustainability platform that combines a consumer-to-consumer marketplace with a business enablement platform. It allows individuals to buy and sell second-hand goods while tracking real environmental impact, and enables businesses to create their own sustainable marketplaces with industry-specific templates.

**Developed for**: Odoo x NMIT Hackathon 2025
**Team**: [Bytestorm]
**Category**: Problem Statement 1 - Sustainable Marketplace

## Problem Statement

The current second-hand marketplace landscape faces several critical issues:

1. **Environmental Disconnect**: Existing platforms don't quantify the environmental impact of sustainable purchases
2. **Business Waste**: Companies lack efficient ways to monetize excess inventory, returned goods, or near-expiry products
3. **Fragmented Solutions**: No unified platform serves both individual consumers and businesses
4. **Limited Industry Focus**: Generic marketplaces don't address specific industry needs (education, FMCG, electronics, fashion)

## Solution

EcoFinds addresses these challenges through a comprehensive platform that:

### Consumer Marketplace
- **Real-time Impact Tracking**: Calculates and displays carbon savings, water conservation, and tree equivalent for every purchase
- **Smart Categorization**: Industry-specific categories with tailored carbon emission factors
- **Gamification**: Sustainability achievement system and impact certificates
- **Quality Assurance**: Condition rating system and seller verification

### Business Platform
- **Industry Templates**: Pre-configured marketplace solutions for specific sectors
- **Sustainability Analytics**: Comprehensive environmental impact dashboards
- **Revenue Recovery**: Transform waste streams into profitable revenue channels
- **ERP Integration**: Seamless integration with existing business systems

## Features

### Core Marketplace Features
- ✅ User registration and authentication (JWT-based)
- ✅ Product listing with CRUD operations
- ✅ Advanced search and category filtering
- ✅ Shopping cart with quantity management
- ✅ Order history and tracking
- ✅ Mobile-responsive design

### Sustainability Features
- ✅ **Carbon Footprint Calculator**: Real-time CO2 savings calculation
- ✅ **Environmental Metrics**: Water saved, trees equivalent display
- ✅ **Personal Impact Dashboard**: Track individual sustainability contributions
- ✅ **Community Impact**: Collective environmental achievements
- ✅ **Impact Certificates**: Shareable sustainability accomplishments

### Business Features
- 🚧 **Marketplace-as-a-Service**: Enable businesses to create custom marketplaces
- 🚧 **Industry Templates**: 
  - Educational publishers (textbook lifecycle management)
  - FMCG companies (near-expiry product flows)
  - Corporate IT (asset recovery and data security)
  - Fashion brands (seasonal clearance automation)
- 🚧 **Analytics Dashboard**: Business sustainability metrics and ROI tracking

### Technical Features
- ✅ RESTful API architecture
- ✅ Database optimization with proper indexing
- ✅ Security implementation with Spring Security
- ✅ Error handling and validation
- ✅ API documentation with Swagger/OpenAPI

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 21
- **Database**: MySQL 8.0
- **Security**: Spring Security + JWT
- **ORM**: Hibernate/JPA
- **Documentation**: SpringDoc OpenAPI
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18+
- **UI Library**: Material-UI (MUI)
- **State Management**: Context API
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **Styling**: Material-UI Theme

### Development Tools
- **IDE**: IntelliJ IDEA / VS Code
- **Version Control**: Git
- **API Testing**: Postman
- **Database Tool**: MySQL Workbench

## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │   Spring Boot   │    │   MySQL         │
│   (Port 3000)   │◄──►│   Backend       │◄──►│   Database      │
│                 │    │   (Port 8080)   │    │   (Port 3306)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌─────────┐              ┌─────────┐           ┌─────────┐
    │Material │              │   JWT   │           │  JPA    │
    │   UI    │              │Security │           │Hibernate│
    └─────────┘              └─────────┘           └─────────┘
```

### Database Schema
- **Users**: Authentication and profile management
- **Products**: Marketplace items with sustainability metrics
- **Categories**: Product categorization with carbon factors
- **Cart/CartItems**: Shopping cart functionality
- **Orders/OrderItems**: Transaction history and tracking

## Installation & Setup

### Prerequisites
- Java 21 or higher
- Node.js 16+ and npm
- MySQL 8.0
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/your-username/ecofinds.git
cd ecofinds/backend
```

2. **Database Configuration**
```sql
CREATE DATABASE ecofinds;
USE ecofinds;
```

3. **Update application.properties**
```properties
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
jwt.secret=your-secret-key
```

4. **Run the application**
```bash
mvn clean install
mvn spring-boot:run
```

Backend will be available at: `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd ../frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

Frontend will be available at: `http://localhost:3000`

### Default Data Setup
```sql
-- Insert default categories
INSERT INTO categories (name, description, carbon_factor) VALUES 
('Electronics', 'Electronic devices and gadgets', 45.2),
('Books', 'Books and educational materials', 2.7),
('Furniture', 'Home and office furniture', 12.8),
('Clothing', 'Fashion and apparel', 15.1),
('Sports', 'Sports equipment and accessories', 8.5);
```

## API Documentation

### Authentication Endpoints
```
POST /api/auth/register - User registration
POST /api/auth/login    - User login
```

### Product Endpoints
```
GET    /api/products              - Get all products (paginated)
POST   /api/products              - Create new product (auth required)
GET    /api/products/{id}         - Get product by ID
PUT    /api/products/{id}         - Update product (auth required)
DELETE /api/products/{id}         - Delete product (auth required)
GET    /api/products/search       - Search products by keyword
GET    /api/products/category/{id}- Get products by category
```

### Cart Endpoints
```
GET    /api/cart           - Get user's cart (auth required)
POST   /api/cart/add       - Add item to cart (auth required)
PUT    /api/cart/update/{productId} - Update cart item quantity
DELETE /api/cart/remove/{productId} - Remove item from cart
DELETE /api/cart/clear     - Clear entire cart
```

### User Endpoints
```
GET /api/users/profile - Get current user profile (auth required)
```

**Swagger Documentation**: Available at `http://localhost:8080/swagger-ui.html`

## Business Model

### Revenue Streams

#### Consumer Market
- **Transaction Fees**: 2.5% commission on successful sales
- **Premium Listings**: Enhanced visibility for sellers (₹50-200 per listing)
- **Verification Services**: Seller and product authentication (₹500-2000)
- **Sustainability Certifications**: Eco-product verification (₹100-500)

#### Business Market (Future Implementation)
- **SaaS Subscriptions**: ₹10,000-₹1,00,000/month based on business size
- **Implementation Services**: Custom marketplace setup (₹50,000-₹5,00,000)
- **Analytics & Insights**: Advanced sustainability reporting (₹5,000-₹25,000/month)
- **API Access**: Third-party integrations (₹2,000-₹10,000/month)

#### Partnership Revenue
- **Carbon Offset Sales**: Commission from verified offset providers
- **Eco-logistics**: Partnership with sustainable shipping companies
- **Sustainability Consulting**: Environmental impact advisory services

### Market Opportunity
- **Global second-hand market**: $177 billion (growing 15% annually)
- **Smart waste management market**: $2.5 billion → $6.5 billion by 2028
- **85% of customers** willing to pay premium for sustainable products

## Environmental Impact

### Carbon Calculation Methodology
```
Carbon Savings = New Product Emissions - Second-hand Product Emissions
where:
- New Product Emissions = Weight × Category Carbon Factor
- Second-hand Emissions = New Product Emissions × 0.15 (transport factor)
```

### Impact Metrics
- **CO2 Savings**: Quantified carbon footprint reduction
- **Water Conservation**: Manufacturing water usage avoided
- **Tree Equivalent**: Forest conservation impact
- **Waste Diversion**: Landfill waste prevention

### Category Carbon Factors (kg CO2/kg)
- Electronics: 45.2
- Furniture: 12.8
- Clothing: 15.1
- Books: 2.7
- Sports Equipment: 8.5

## Demo

### Live Demo URLs
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8080`
- **API Documentation**: `http://localhost:8080/swagger-ui.html`

### Test Credentials
```
Email: demo@ecofinds.com
Password: password123
```

### Demo Scenarios

1. **Consumer Journey**
   - Register/Login → Browse products → Add to cart → View impact

2. **Seller Journey**
   - Create product listing → Set condition/price → Track sustainability impact

3. **Sustainability Tracking**
   - View personal carbon savings → Community impact → Achievement system

## Contributing

### Development Guidelines
1. Follow Java coding standards and Spring Boot best practices
2. Use React functional components with hooks
3. Maintain consistent code formatting
4. Write comprehensive unit tests
5. Update documentation for any API changes

### Git Workflow
```bash
git checkout -b feature/your-feature-name
git commit -m "feat: add new feature description"
git push origin feature/your-feature-name
# Create pull request
```

### Issue Reporting
Please use GitHub issues for bug reports and feature requests with:
- Clear description of the problem/feature
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Odoo & NMIT** for organizing the hackathon
- **Spring Boot Community** for excellent framework documentation
- **React Community** for comprehensive ecosystem support
- **Environmental data sources** for carbon footprint calculations

---

**Developed with 💚 for a sustainable future**

**Contact**: [your-email@domain.com]
**Repository**: [https://github.com/your-username/ecofinds](https://github.com/your-username/ecofinds)
