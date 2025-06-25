# DUATX - Company Website

## Overview

This is a static website for DUATX, a consultancy company specializing in AI, automation, and business intelligence solutions. The site is built using pure HTML5, CSS3, and vanilla JavaScript without any frameworks, focusing on a neomorphic dark design aesthetic with interactive animations and modern UI components.

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: HTML5, CSS3, and vanilla JavaScript (no frameworks)
- **Design System**: Neomorphic dark theme with custom CSS variables and ethereal backgrounds
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Animation Framework**: Custom JavaScript classes for scroll-triggered animations, parallax effects, and interactive elements
- **Icon System**: Lucide icons via CDN integration
- **Typography**: Montserrat font family with multiple weights (300-900)

### Backend Architecture
- **Server Framework**: Express.js serving static files
- **API Layer**: RESTful endpoints for contact form processing
- **Static File Serving**: Organized public directory structure with optimized asset delivery
- **Build System**: Custom Node.js build script with static file copying to dist directory
- **Development Server**: Hot-reload development environment with port 5000

## Key Components

### 1. Navigation System
- **Fixed Header**: Transparent navbar with scroll-based opacity transitions
- **Mobile Menu**: Responsive hamburger menu with smooth animations
- **Smooth Scrolling**: JavaScript-powered navigation between sections
- **Brand Identity**: SVG logo with optimized loading

### 2. Content Architecture
- **Hero Section**: Animated typewriter effects with gradient backgrounds and particle systems
- **Services Grid**: Interactive service cards with problem/solution/result structure
- **Sectors Showcase**: Industry-specific solutions with challenge/solution/result format
- **Technology Stack**: Categorized technology display with visual icons
- **Results Dashboard**: Success metrics with animated counters
- **Testimonials Carousel**: Client feedback with rotation and navigation
- **Blog System**: Article grid with search, filtering, and pagination capabilities
- **Contact Integration**: Form processing with WhatsApp API integration

### 3. Animation & Interaction Framework
- **Scroll Observer**: Intersection Observer API for performance-optimized animations
- **Parallax System**: Multi-layer background effects with CSS transforms
- **Counter Animations**: Numeric value animations triggered by viewport entry
- **Magnetic Effects**: Hover interactions with card lifting and shadow effects
- **Loading States**: Smooth transitions and progressive enhancement

### 4. Styling Architecture
- **Color Palette**: 
  - Primary: Deep blacks (#0B0D10, #1A1D23)
  - Accents: Orange (#AA5C2F), Blue (#2C6ECB), Green (#96B4A8)
  - Text: White (#FFFFFF) with opacity variations
- **Layout System**: CSS Grid for complex layouts, Flexbox for component alignment
- **Visual Effects**: Neomorphic shadows, gradient overlays, and ethereal particle backgrounds
- **Responsive Breakpoints**: Mobile-first design with tablet and desktop optimizations

## Data Flow

1. **Static Content**: Structured data in `js/data.js` for services, technologies, and sectors
2. **Dynamic Rendering**: JavaScript modules populate HTML templates with data
3. **User Interactions**: Event-driven responses for navigation, forms, and animations
4. **API Communication**: Contact forms processed through Express.js backend
5. **Asset Loading**: Optimized image and font loading with lazy loading strategies

## External Dependencies

### CDN Resources
- **Lucide Icons**: `https://unpkg.com/lucide@latest/dist/umd/lucide.js`
- **Google Fonts**: Montserrat font family with variable weights
- **Font Awesome**: Icon library for additional UI elements

### Development Dependencies
- **Express.js**: Static file server and API endpoints
- **Node.js**: Runtime environment for build processes
- **TypeScript**: Type checking for server-side code

### Third-Party Integrations
- **WhatsApp API**: Direct messaging integration for contact flows
- **Google Analytics**: User behavior tracking (configured via GTM)
- **Form Processing**: Server-side contact form handling with validation

## Deployment Strategy

### Static Site Generation
- **Build Process**: Custom Node.js script copies public files to dist directory
- **Asset Optimization**: Minification and compression for production builds
- **Deployment Target**: Static hosting platforms (Netlify, Vercel, GitHub Pages)

### Development Environment
- **Local Server**: Express.js development server with hot-reload
- **Port Configuration**: Default port 5000 with external port 80 mapping
- **Environment Variables**: Development/production environment handling

### Performance Optimization
- **Lazy Loading**: Images and non-critical resources loaded on demand
- **CSS Optimization**: Critical CSS inlined, non-critical CSS loaded asynchronously
- **JavaScript Bundling**: Modular JavaScript with selective loading
- **Caching Strategy**: Static asset caching with appropriate headers

## Changelog

- June 25, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.