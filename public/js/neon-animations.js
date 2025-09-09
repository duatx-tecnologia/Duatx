// Neon Glass Animations for DUATX
class NeonAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupAnimations();
      });
    } else {
      this.setupAnimations();
    }
  }

  setupAnimations() {
    this.setupScrollReveal();
    this.setupTiltEffects();
    this.setupOrbs();
    this.setupTypewriter();
    console.log('Neon animations initialized');
  }

  // Scroll reveal animation
  setupScrollReveal() {
    const revealElements = document.querySelectorAll("[data-reveal]");
    
    if (revealElements.length === 0) {
      console.log('No reveal elements found');
      return;
    }

    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transition = "opacity .8s ease, transform .8s ease";
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add('revealed');
          intersectionObserver.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    // Initialize reveal elements
    revealElements.forEach(element => {
      element.style.opacity = 0;
      element.style.transform = "translateY(20px)";
      intersectionObserver.observe(element);
    });

    console.log(`Scroll reveal setup for ${revealElements.length} elements`);
  }

  // 3D Tilt effect on glass cards
  setupTiltEffects() {
    const tiltElements = document.querySelectorAll("[data-tilt]");
    
    if (tiltElements.length === 0) {
      console.log('No tilt elements found');
      return;
    }

    tiltElements.forEach(element => {
      let rafId = null;
      
      const handleMouseMove = (e) => {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / rect.width;
        const deltaY = (e.clientY - centerY) / rect.height;

        const rotateX = (deltaY * -10).toFixed(2);
        const rotateY = (deltaX * 10).toFixed(2);

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
            element.style.willChange = "transform";
            rafId = null;
          });
        }
      };

      const handleMouseLeave = () => {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
        element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
        element.style.willChange = "auto";
      };

      const handleMouseEnter = () => {
        element.style.transition = "none";
      };

      const handleTransitionEnd = () => {
        if (!element.matches(':hover')) {
          element.style.transition = "transform 0.3s ease-out";
        }
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
      element.addEventListener("transitionend", handleTransitionEnd);
      
      // Initialize transform
      element.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateZ(0)";
      element.style.transformStyle = "preserve-3d";
      element.style.transition = "transform 0.3s ease-out";
    });

    console.log(`3D tilt effect setup for ${tiltElements.length} elements`);
  }

  // Dynamic orbs creation and animation
  setupOrbs() {
    const orbsContainer = document.querySelector('.bg__orbs');
    
    if (!orbsContainer) {
      // Create the background structure if it doesn't exist
      this.createBackgroundStructure();
    }

    // Add extra orb for more dynamic effect
    const extraOrb = document.createElement('span');
    extraOrb.className = 'orb orb--d';
    orbsContainer.appendChild(extraOrb);
    
    console.log('Background orbs initialized');
  }

  // Create background structure if it doesn't exist
  createBackgroundStructure() {
    const existingBg = document.querySelector('.bg');
    
    if (existingBg) {
      return;
    }

    const bgDiv = document.createElement('div');
    bgDiv.className = 'bg';
    
    const gradientDiv = document.createElement('div');
    gradientDiv.className = 'bg__gradient';
    
    const noiseDiv = document.createElement('div');
    noiseDiv.className = 'bg__noise';
    
    const orbsDiv = document.createElement('div');
    orbsDiv.className = 'bg__orbs';
    
    // Create orbs
    const orbClasses = ['orb--a', 'orb--b', 'orb--c'];
    orbClasses.forEach(orbClass => {
      const orb = document.createElement('span');
      orb.className = `orb ${orbClass}`;
      orbsDiv.appendChild(orb);
    });
    
    bgDiv.appendChild(gradientDiv);
    bgDiv.appendChild(noiseDiv);
    bgDiv.appendChild(orbsDiv);
    
    document.body.insertBefore(bgDiv, document.body.firstChild);
    
    console.log('Background structure created');
  }

  // Utility method to add neon glow effect to elements
  addNeonGlow(element, color = 'var(--accent)') {
    if (!element) return;
    
    element.style.textShadow = `0 0 16px ${color}, 0 0 32px ${color}`;
    element.style.transition = 'text-shadow 0.3s ease';
  }

  // Method to enhance existing cards with glass effect
  enhanceCardsWithGlass() {
    const existingCards = document.querySelectorAll('.service-card, .result-card, .testimonial-card');
    
    existingCards.forEach(card => {
      if (!card.classList.contains('glass-card')) {
        card.classList.add('glass-card');
        card.setAttribute('data-tilt', '');
      }
    });
    
    // Re-setup tilt effects for enhanced cards
    this.setupTiltEffects();
  }

  // Method to add reveal animation to existing elements
  enhanceWithReveal() {
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.service-card, .result-card, .testimonial-card');
    
    sections.forEach((section, index) => {
      if (!section.hasAttribute('data-reveal')) {
        section.setAttribute('data-reveal', '');
        section.style.animationDelay = `${index * 0.2}s`;
      }
    });
    
    cards.forEach((card, index) => {
      if (!card.hasAttribute('data-reveal')) {
        card.setAttribute('data-reveal', '');
        card.style.animationDelay = `${index * 0.1}s`;
      }
    });
    
    // Re-setup scroll reveal
    this.setupScrollReveal();
  }

  // Parallax effect for hero elements
  setupParallaxEffect() {
    const heroElements = document.querySelectorAll('.hero-media .glass-card');
    
    if (heroElements.length === 0) return;
    
    let rafId;
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        heroElements.forEach((element, index) => {
          const offset = rate * (1 + index * 0.1);
          element.style.transform = `translate3d(0, ${offset}px, 0)`;
        });
        
        rafId = null;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    console.log('Parallax effect initialized');
  }

  // Method to animate counters/numbers
  animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-counter'));
          const duration = 2000;
          const start = performance.now();
          
          const animate = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            counter.textContent = current.toLocaleString();
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              counter.textContent = target.toLocaleString();
            }
          };
          
          requestAnimationFrame(animate);
          counterObserver.unobserve(counter);
        }
      });
    });
    
    counters.forEach(counter => {
      counter.textContent = '0';
      counterObserver.observe(counter);
    });
  }

  // Mouse tracking for gradient movement
  setupMouseTracking() {
    const bgGradient = document.querySelector('.bg__gradient');
    
    if (!bgGradient) {
      console.log('Background gradient not found');
      return;
    }

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        bgGradient.style.setProperty('--mouse-x', `${x}%`);
        bgGradient.style.setProperty('--mouse-y', `${y}%`);
        
        rafId = null;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Initialize with center position
    bgGradient.style.setProperty('--mouse-x', '50%');
    bgGradient.style.setProperty('--mouse-y', '50%');
    
    console.log('Mouse tracking initialized for gradient');
  }

  // Typewriter effect for hero tagline
  setupTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    const cursor = document.querySelector('.typewriter-cursor');
    
    if (!typewriterElement) {
      console.log('Typewriter element not found');
      return;
    }

    const text = "Dados, Inteligência Artificial e Software para Otimização de Resultados.";
    let index = 0;
    let isDeleting = false;
    
    const typeSpeed = 80; // Speed of typing
    const deleteSpeed = 30; // Speed of deleting
    const pauseTime = 2000; // Pause at end before restarting
    
    const typeWriter = () => {
      if (!isDeleting && index < text.length) {
        // Typing
        typewriterElement.textContent = text.substring(0, index + 1);
        index++;
        setTimeout(typeWriter, typeSpeed);
      } else if (isDeleting && index > 0) {
        // Deleting
        typewriterElement.textContent = text.substring(0, index - 1);
        index--;
        setTimeout(typeWriter, deleteSpeed);
      } else if (index === text.length) {
        // Pause at end, then start deleting
        setTimeout(() => {
          isDeleting = true;
          typeWriter();
        }, pauseTime);
      } else if (index === 0 && isDeleting) {
        // Restart typing
        isDeleting = false;
        setTimeout(typeWriter, 500);
      }
    };

    // Start typing effect after a small delay
    setTimeout(typeWriter, 1000);
    
    console.log('Typewriter effect initialized');
  }
}

// Initialize animations when script loads
const neonAnimations = new NeonAnimations();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.NeonAnimations = NeonAnimations;
}