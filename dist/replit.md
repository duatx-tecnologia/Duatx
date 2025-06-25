# DUATX - Company Website

## Overview

This is a static website for DUATX, a company specializing in AI, automation, and business intelligence solutions. The site is built using pure HTML5, CSS3, and JavaScript without any frameworks, focusing on a neomorphic dark design with responsive layouts and smooth animations.

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: HTML5, CSS3, and vanilla JavaScript
- **Design System**: Neomorphic dark theme with custom CSS variables
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Animation System**: Custom JavaScript classes for scroll animations, parallax effects, and interactive elements
- **Icon System**: Lucide icons loaded via CDN

### Backend Architecture
- **Server**: Express.js serving static files
- **API Layer**: Contact form endpoint with logging middleware
- **Static File Serving**: Public directory structure with organized assets
- **Build System**: Custom build script that copies files to dist directory

## Key Components

### 1. Navigation System
- Fixed navbar with scroll-based transparency effects
- Mobile-responsive hamburger menu
- Smooth scroll navigation between sections

### 2. Content Sections
- **Hero Section**: Animated typewriter effects and gradient backgrounds
- **Services**: Interactive service cards with problem/solution/result structure
- **Sectors**: Industry-specific solutions carousel
- **Technologies**: Tech stack showcase with categorized display
- **Results**: Success metrics and case studies
- **Testimonials**: Client feedback carousel
- **Blog**: Article grid with search and filtering capabilities
- **Contact**: Form with WhatsApp integration

### 3. Animation Framework
- Intersection Observer API for scroll-triggered animations
- Custom CSS animations for fade-in, slide-in effects
- Parallax scrolling for background elements
- Counter animations for statistics
- Magnetic card effects on hover

### 4. Styling System
- **Color Palette**: Dark theme with accent colors (orange #AA5C2F, blue #2C6ECB, green #96B4A8)
- **Typography**: Montserrat font family with multiple weights
- **Layout**: CSS Grid and Flexbox for responsive layouts
- **Effects**: Neomorphic shadows, gradients, and ethereal backgrounds

## Data Flow

### 1. Static Content
- Content data stored in `public/js/data.js` as JavaScript objects
- Dynamic rendering of services, technologies, sectors, and testimonials
- Blog content structure defined for future CMS integration

### 2. Contact Form
- Frontend form validation and submission
- Express.js API endpoint at `/api/contact`
- Form data processing with email and phone validation
- WhatsApp API integration for direct messaging

### 3. Search and Filtering
- Client-side blog search functionality
- Topic-based filtering system
- Real-time content filtering without page reloads

## External Dependencies

### CDN Resources
- **Google Fonts**: Montserrat font family
- **Lucide Icons**: Icon library for UI elements
- **Font Awesome**: Additional icons for specific components

### Planned Integrations
- **Database**: Drizzle ORM with PostgreSQL for future dynamic content
- **Analytics**: Google Tag Manager integration ready
- **Payment**: Stripe/Hotmart integration planned
- **Scheduling**: Calendly integration for consultation booking

## Deployment Strategy

### Static Deployment
- **Target**: Static hosting platforms (Netlify, Vercel, etc.)
- **Build Process**: Custom build script copies public files to dist directory
- **Assets**: Self-contained with minimal external dependencies

### Server Deployment (Optional)
- **Express Server**: Can be deployed for API functionality
- **Environment**: Node.js runtime with TypeScript support
- **Port Configuration**: Configurable port with default 5000

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Run Command**: `npm run dev`
- **Build**: Vite-compatible build process
- **Public Directory**: Static file serving from public folder

## Changelog

```
Changelog:
- June 17, 2025: Initial setup
- June 17, 2025: Blog section redesigned with modern layout matching user's reference image
  - Implemented 6 articles with exact SVG icons and color scheme
  - Added carousel functionality with responsive design (4/2/1 cards)
  - Repositioned search field alongside category filters
  - Applied exact visual styling from user's design reference
- June 18, 2025: Article layout optimization
  - Removed sidebars from all blog articles per user request
  - Adjusted article layout to single column (max-width: 900px)
  - Added consistent footer across all articles with DUATX copyright
  - Maintained professional photos and centralized content design
  - Removed "Impacto Real" section from main site
  - Removed testimonials image container and centralized testimonials carousel
  - Reduced spacing between hero section and article body to 5rem
  - Fixed blog "Ler mais" buttons to link correctly to individual articles
  - Created two new comprehensive articles with full content:
    * "Transformação Digital: O Futuro dos Negócios" (artigo-transformacao-digital.html)
    * "Segurança de Dados na Era da IA" (artigo-seguranca-dados-ia.html)
  - Added new blog cards to homepage and blog listing with functional links
  - Added CSS styles for new article categories (green/red gradients)
  - Replicated navbar from main site to articles 5 and 6 for consistency
  - Aligned breadcrumbs and article-meta structure in articles 5 and 6
  - Updated article 1 image to be more relevant to AI topic
- June 20, 2025: Content organization optimization
  - Removed articles 5 and 6 from main site homepage (index.html)
  - Kept articles 5 and 6 available in dedicated blog page (blog.html)
  - Main site now shows only 4 core articles for better focus
  - Blog page maintains all 6 articles for comprehensive content access
  - Fixed WhatsApp button responsiveness and removed duplicated floating button
  - Restored original gradient colors for WhatsApp icon
- June 20, 2025: Deploy preparation and file organization
  - Organized all important files in public/ folder for easy deployment
  - Created comprehensive deploy documentation (DEPLOY-README.md)
  - Added server configuration files (.htaccess, _redirects)
  - Implemented SEO optimization (robots.txt, sitemap.xml)
  - Added PWA manifest for progressive web app functionality
  - Site is 100% ready for static hosting deployment
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```