// Animation and scroll management
class AnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }

  init() {
    this.setupScrollObserver();
    this.setupParallaxEffects();
    this.setupCounterAnimations();
    this.setupScrollProgress();
    this.setupMagneticCards();
    this.setupTypewriterEffect();
  }

  setupScrollObserver() {
    if (!window.IntersectionObserver) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger counter animations for impact and stats sections
          if (entry.target.classList.contains('impact-number') || entry.target.classList.contains('stat-number')) {
            this.animateCounter(entry.target);
          }
        }
      });
    }, this.observerOptions);

    // Observe all animated elements
    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stat-number, .impact-number');
      animatedElements.forEach(el => this.observer.observe(el));
      
      // Special observer for services circular section
      const servicesCircular = document.querySelector('.services-circular');
      if (servicesCircular) {
        this.observer.observe(servicesCircular);
      }
    });
  }

  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      
      // Hero background parallax
      const heroBackground = document.querySelector('.hero-background');
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  setupCounterAnimations() {
    this.counters = new Map();
  }

  animateCounter(element) {
    if (this.counters.has(element)) return; // Already animated
    
    // Get target value from data-count attribute or text content
    const targetValue = element.getAttribute('data-count') || element.textContent;
    const isPercentage = targetValue.includes('%') || element.nextElementSibling?.textContent.includes('%');
    const isNegative = targetValue.includes('-');
    const isPositive = targetValue.includes('+');
    
    let numericValue = parseFloat(targetValue.replace(/[^0-9]/g, ''));
    if (isNaN(numericValue)) return;
    
    this.counters.set(element, true);
    
    let current = 0;
    const increment = numericValue / 60; // 60 steps for smoother animation
    const duration = 2500; // 2.5 seconds
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      let displayValue = Math.floor(current).toString();
      if (isPositive && current > 0) displayValue = '+' + displayValue;
      if (isNegative) displayValue = '-' + displayValue;
      if (isPercentage && !element.nextElementSibling?.textContent.includes('%')) {
        displayValue += '%';
      }
      
      element.textContent = displayValue;
    }, stepTime);
  }

  // Smooth scroll to section
  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const targetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }

  // Add stagger animation to grid items
  staggerElements(selector, delay = 100) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * delay}ms`;
      el.classList.add('fade-in');
    });
  }

  // Add hover animations to cards
  setupCardHovers() {
    const cards = document.querySelectorAll('.neomorphic-card, .service-card, .sector-card, .result-card, .testimonial-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Typewriter effect for hero text
  typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // Floating animation for hero elements
  setupFloatingAnimation() {
    const floatingElements = document.querySelectorAll('[data-float]');
    
    floatingElements.forEach((el, index) => {
      const amplitude = 10 + (index * 5);
      const frequency = 0.02 + (index * 0.01);
      let start = Date.now();
      
      function animate() {
        const elapsed = Date.now() - start;
        const y = Math.sin(elapsed * frequency) * amplitude;
        el.style.transform = `translateY(${y}px)`;
        requestAnimationFrame(animate);
      }
      
      animate();
    });
  }

  // Progress bar animation
  animateProgressBar(element, percentage, duration = 1000) {
    const progressBar = element.querySelector('.progress-fill');
    if (!progressBar) return;
    
    let start = 0;
    const increment = percentage / (duration / 16); // 60fps
    
    function animate() {
      start += increment;
      if (start >= percentage) {
        start = percentage;
      } else {
        requestAnimationFrame(animate);
      }
      
      progressBar.style.width = `${start}%`;
    }
    
    animate();
  }

  // Text reveal animation
  revealText(element, duration = 1000) {
    const text = element.textContent;
    const chars = text.split('');
    element.innerHTML = '';
    
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `all 0.3s ease ${index * 50}ms`;
      element.appendChild(span);
    });
    
    // Trigger animation
    setTimeout(() => {
      const spans = element.querySelectorAll('span');
      spans.forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 100);
  }

  // Loading animation
  showLoading(element) {
    element.classList.add('loading');
  }

  hideLoading(element) {
    element.classList.remove('loading');
  }

  // Pulse animation for CTA buttons
  pulseElement(element, duration = 2000) {
    element.style.animation = `pulse ${duration}ms ease-in-out infinite`;
  }

  // Remove all animations (for reduced motion preference)
  disableAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Setup scroll progress indicator
  setupScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    });
  }

  // Setup magnetic effect for service cards
  setupMagneticCards() {
    const cards = document.querySelectorAll('.service-card, .tech-item, .stat-item');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `
          perspective(1000px) 
          rotateX(${rotateX}deg) 
          rotateY(${rotateY}deg) 
          translateZ(10px)
        `;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // Setup typewriter effect for hero section
  setupTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter-headline');
    if (!typewriterElement) return;

    const originalText = "Dados, Inteligência Artificial e Software para Otimização de Resultados.";
    const speed = 50; // milliseconds per character
    
    // Clear the element and start typing
    typewriterElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        typewriterElement.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
      } else {
        // After typing is complete, add the blinking cursor class
        typewriterElement.classList.add('typewriter-complete');
      }
    };
    
    // Start the typewriter effect after a short delay
    setTimeout(typeWriter, 1500);
  }

  // Check for reduced motion preference
  respectReducedMotion() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAnimations();
    }
  }
}

// Initialize animation manager
const animationManager = new AnimationManager();

// Global scroll function for buttons
function scrollToSection(sectionId) {
  animationManager.scrollToSection(sectionId);
}

// Add CSS for additional animations
const additionalStyles = `
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}

.stagger-1 { animation-delay: 0.1s; }
.stagger-2 { animation-delay: 0.2s; }
.stagger-3 { animation-delay: 0.3s; }
.stagger-4 { animation-delay: 0.4s; }
.stagger-5 { animation-delay: 0.5s; }
.stagger-6 { animation-delay: 0.6s; }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);