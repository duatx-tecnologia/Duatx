// Main JavaScript functionality for DUATX website
class DuatxWebsite {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupNavigation();
      this.renderServices();
      this.renderTechnologies();
      this.renderSectors();
      this.renderResults();
      this.renderTestimonials();
      this.setupContactForm();
      this.setupBlogSearch();
      this.setupScrollEffects();
      this.setupAnimations();
      this.setupWhatsAppCTA();
      this.setupCookieBanner();
      
      // Setup carousels after a small delay to ensure DOM is ready
      setTimeout(() => {
        this.setupTechnologiesCarousel();
        this.setupBlogCarousel();
        this.setupTestimonialsCarousel();
        this.setupImageCarousel();
        this.setupImpactCounters();
      }, 100);
      
      // Initialize Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  }

  setupNavigation() {
    // Setup navbar scroll behavior
    this.setupNavbarScroll();
    
    // Setup mobile menu toggle
    this.setupMobileMenu();
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        this.scrollToSection(targetId);
        
        // Close mobile menu if open
        this.closeMobileMenu();
      });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
      this.updateActiveNavLink();
    });
  }

  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileToggle && menu) {
      mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        menu.classList.toggle('active');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !menu.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
      
      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.closeMobileMenu();
        }
      });
    }
  }

  closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (mobileToggle && menu) {
      mobileToggle.classList.remove('active');
      menu.classList.remove('active');
    }
  }

  setupNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.remove('transparent');
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.add('transparent');
      }
    });
  }

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

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.menu a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop <= 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  renderServices() {
    const container = document.getElementById('services-container');
    if (!container || !DATA.services) return;

    container.innerHTML = DATA.services.map((service, index) => `
      <div class="service-card fade-in stagger-${index + 1}">
        <div class="service-header">
          <div class="service-icon" style="background: ${COLOR_MAP[service.color] || COLOR_MAP['from-blue-600 to-blue-500']}">
            <i data-lucide="${ICON_MAP[service.icon] || 'code'}" class="w-6 h-6"></i>
          </div>
          <h3 class="service-title">${service.title}</h3>
        </div>
        
        <div class="service-section">
          <div class="service-label problem">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            Problema
          </div>
          <p class="service-description">${service.problem}</p>
        </div>
        
        <div class="service-section">
          <div class="service-label solution">
            <i data-lucide="cpu" class="w-4 h-4"></i>
            Solução
          </div>
          <p class="service-description">${service.solution}</p>
        </div>
        
        <div class="service-section">
          <div class="service-label result">
            <i data-lucide="check-circle" class="w-4 h-4"></i>
            Resultado
          </div>
          <p class="service-description">${service.result}</p>
        </div>
      </div>
    `).join('');

    // Re-initialize icons for new content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  renderSectors() {
    const container = document.getElementById('sectors-container');
    if (!container || !DATA.sectors) return;

    container.innerHTML = DATA.sectors.map((sector, index) => `
      <div class="sector-card fade-in stagger-${index + 1}">
        <div class="service-header">
          <div class="service-icon" style="background: ${COLOR_MAP[sector.color] || COLOR_MAP['blue']}">
            <i data-lucide="${ICON_MAP[sector.icon] || 'building'}" class="w-6 h-6"></i>
          </div>
          <h3 class="service-title">${sector.title}</h3>
        </div>
        
        <div class="service-section">
          <div class="service-label problem">
            <i data-lucide="alert-triangle" class="w-4 h-4"></i>
            Desafio
          </div>
          <p class="service-description">${sector.dor}</p>
        </div>
        
        <div class="service-section">
          <div class="service-label solution">
            <i data-lucide="cpu" class="w-4 h-4"></i>
            Solução
          </div>
          <p class="service-description">${sector.solucao}</p>
        </div>
        
        <div class="service-section">
          <div class="service-label result">
            <i data-lucide="trending-up" class="w-4 h-4"></i>
            Resultado
          </div>
          <p class="service-description">${sector.resultado}</p>
        </div>
      </div>
    `).join('');

    // Initialize carousel
    this.setupSectorsCarousel();

    // Re-initialize icons for new content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  setupSectorsCarousel() {
    const container = document.getElementById('sectors-container');
    const prevBtn = document.getElementById('sectors-prev');
    const nextBtn = document.getElementById('sectors-next');
    const dotsContainer = document.getElementById('sectors-dots');
    
    if (!container || !DATA.sectors) return;

    let currentIndex = 0;
    const totalCards = DATA.sectors.length;
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 350 : 300);
    const gap = 32; // 2rem gap
    const containerWidth = container.parentElement.offsetWidth;
    const visibleCards = Math.max(1, Math.floor(containerWidth / (cardWidth + gap)));
    const maxIndex = Math.max(0, totalCards - visibleCards);

    // Create dots
    dotsContainer.innerHTML = '';
    const dotsToShow = Math.max(1, maxIndex + 1);
    for (let i = 0; i < dotsToShow; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }

    function updateCarousel() {
      const translateX = -currentIndex * (cardWidth + gap);
      container.style.transform = `translateX(${translateX}px)`;
      
      // Update dots
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }

    function nextSlide() {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    });

    container.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
    });

    // Mouse drag support
    container.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      isDragging = true;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      const endX = e.clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Resize handler
    window.addEventListener('resize', () => {
      const newVisibleCards = Math.floor(container.parentElement.offsetWidth / (cardWidth + gap));
      const newMaxIndex = Math.max(0, totalCards - newVisibleCards);
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
      }
      updateCarousel();
    });

    // Initial setup
    updateCarousel();
    container.style.cursor = 'grab';
  }

  renderTechnologies() {
    const container = document.getElementById('technologies-container');
    if (!container || !DATA.technologies) return;

    // Create technology category HTML
    const techCategory = (category, index) => `
      <div class="tech-category">
        <h3 class="tech-category-title">${category.name}</h3>
        <div class="tech-items">
          ${category.items.map(item => `
            <div class="tech-item">
              <div class="tech-icon">
                <i data-lucide="${item.icon}" class="w-4 h-4"></i>
              </div>
              <span class="tech-name">${item.name}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Create original set and duplicate for infinite scroll (same as testimonials)
    const originalHTML = DATA.technologies.map((category, index) => techCategory(category, index)).join('');
    container.innerHTML = originalHTML + originalHTML;

    // Re-initialize icons for new content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }



  setupTechnologiesCarousel() {
    // Technologies carousel now uses CSS animation like testimonials
    // No additional setup needed - animation is handled by CSS
  }

  setupImpactCounters() {
    const impactCards = document.querySelectorAll('.impact-card');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const valueElement = entry.target.querySelector('.impact-value');
          const targetValue = parseInt(valueElement.dataset.target);
          const unit = valueElement.querySelector('.impact-unit').textContent;
          
          entry.target.dataset.animated = 'true';
          this.animateCounter(valueElement, targetValue, unit);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    impactCards.forEach(card => {
      observer.observe(card);
    });
  }

  animateCounter(element, target, unit) {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      
      let displayValue;
      if (target >= 1000) {
        displayValue = Math.round(current).toLocaleString('pt-BR');
      } else {
        displayValue = Math.round(current);
      }
      
      element.innerHTML = `${displayValue}<span class="impact-unit">${unit}</span>`;
    }, 16);
  }


  setupImageCarousel() {
    const slides = document.querySelectorAll('.image-carousel-slide');
    const dots = document.querySelectorAll('.image-carousel-dot');
    const prevBtn = document.getElementById('image-prev');
    const nextBtn = document.getElementById('image-next');
    
    if (!slides.length || !dots.length || !prevBtn || !nextBtn) {
      return;
    }
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    function showSlide(index) {
      // Remove active from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      
      // Add active to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');
      
      // Update button states
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSlides - 1;
    }
    
    function nextSlide() {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    }
    
    function prevSlide() {
      if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      }
    }
    
    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.target.closest('#image-carousel')) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      }
    });
    
    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const carousel = document.querySelector('#image-carousel');
    if (carousel) {
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
          if (diff > 0) {
            // Swiped left - next slide
            nextSlide();
          } else {
            // Swiped right - prev slide
            prevSlide();
          }
        }
      }
    }
    
    // Auto-slide functionality (optional - uncomment if needed)
    // setInterval(() => {
    //   if (currentSlide < totalSlides - 1) {
    //     nextSlide();
    //   } else {
    //     currentSlide = 0;
    //     showSlide(currentSlide);
    //   }
    // }, 5000);
    
    // Initialize
    showSlide(currentSlide);
  }

  setupBlogCarousel() {
    // Check for final blog carousel first
    const finalContainer = document.querySelector('.blog-carousel-final');
    const finalPrevBtn = document.getElementById('blog-final-prev');
    const finalNextBtn = document.getElementById('blog-final-next');
    const finalDotsContainer = document.getElementById('blog-final-dots');
    
    if (finalContainer && finalPrevBtn && finalNextBtn && finalDotsContainer) {
      this.setupFinalBlogCarousel();
      return;
    }

    // Check for modern blog carousel
    const modernContainer = document.querySelector('.blog-carousel-modern');
    const modernPrevBtn = document.getElementById('blog-exact-prev');
    const modernNextBtn = document.getElementById('blog-exact-next');
    const modernDotsContainer = document.getElementById('blog-exact-dots');
    
    if (modernContainer && modernPrevBtn && modernNextBtn && modernDotsContainer) {
      this.setupModernBlogCarousel();
      return;
    }

    // Fallback to old carousel
    const container = document.querySelector('.blog-carousel');
    const prevBtn = document.getElementById('blog-prev');
    const nextBtn = document.getElementById('blog-next');
    const dotsContainer = document.getElementById('blog-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      console.warn('Blog carousel elements not found');
      return;
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll('.blog-card-new');
    const totalCards = cards.length;
    
    if (totalCards === 0) {
      console.warn('No blog cards found');
      return;
    }

    console.log(`Setting up blog carousel with ${totalCards} modern cards`);
    
    function calculateDimensions() {
      const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 380 : 350);
      const gap = 32;
      const containerWidth = container.parentElement.offsetWidth;
      const visibleCards = Math.max(1, Math.floor(containerWidth / (cardWidth + gap)));
      const maxIndex = Math.max(0, totalCards - visibleCards);
      
      return { cardWidth, gap, visibleCards, maxIndex };
    }

    let { cardWidth, gap, visibleCards, maxIndex } = calculateDimensions();

    // Create dots
    function createDots() {
      dotsContainer.innerHTML = '';
      const dotsToShow = Math.max(1, maxIndex + 1);
      for (let i = 0; i < dotsToShow; i++) {
        const dot = document.createElement('div');
        dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
    }

    function updateCarousel() {
      const translateX = -currentIndex * (cardWidth + gap);
      container.style.transform = `translateX(${translateX}px)`;
      container.style.transition = 'transform 0.3s ease';
      
      // Update dots
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update button states
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
      
      // Update button opacity
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }

    function goToSlide(index) {
      currentIndex = Math.max(0, Math.min(index, maxIndex));
      updateCarousel();
    }

    function nextSlide() {
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    }

    // Event listeners
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Previous button clicked');
      prevSlide();
    });

    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('Next button clicked');
      nextSlide();
    });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    container.addEventListener('mousedown', (e) => {
      startX = e.pageX;
      isDragging = true;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const currentX = e.pageX;
      const diffX = startX - currentX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging = false;
        container.style.cursor = 'grab';
      }
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      const newDimensions = calculateDimensions();
      cardWidth = newDimensions.cardWidth;
      gap = newDimensions.gap;
      visibleCards = newDimensions.visibleCards;
      maxIndex = newDimensions.maxIndex;
      
      // Reset currentIndex if it's now out of bounds
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
      
      createDots();
      updateCarousel();
    });

    // Initialize
    createDots();
    updateCarousel();
    container.style.cursor = 'grab';
    
    console.log('Blog carousel initialized successfully');
  }

  setupTestimonialsCarousel() {
    const container = document.querySelector('.testimonials-carousel');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    let isAnimating = false;
    const originalCards = container.querySelectorAll('.testimonial-card');
    const totalCards = originalCards.length;
    
    if (totalCards === 0) return;

    // Clone cards for infinite scroll
    const cloneCount = Math.min(3, totalCards);
    
    // Clone last items and prepend
    for (let i = totalCards - cloneCount; i < totalCards; i++) {
      const clone = originalCards[i].cloneNode(true);
      clone.classList.add('clone');
      container.insertBefore(clone, container.firstChild);
    }

    // Clone first items and append
    for (let i = 0; i < cloneCount; i++) {
      const clone = originalCards[i].cloneNode(true);
      clone.classList.add('clone');
      container.appendChild(clone);
    }

    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 380 : 350);
    const gap = 32;
    
    // Set initial position (skip the cloned items at the beginning)
    currentIndex = cloneCount;

    // Create dots based on original cards only
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement('div');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i + cloneCount));
      dotsContainer.appendChild(dot);
    }

    function updateCarousel(animate = true) {
      const translateX = -currentIndex * (cardWidth + gap);
      container.style.transition = animate ? 'transform 0.5s ease' : 'none';
      container.style.transform = `translateX(${translateX}px)`;
      
      // Update dots based on original position
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      const realIndex = ((currentIndex - cloneCount) % totalCards + totalCards) % totalCards;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === realIndex);
      });

      // Never disable buttons in infinite mode
      prevBtn.disabled = false;
      nextBtn.disabled = false;
    }

    function handleInfiniteScroll() {
      if (currentIndex >= totalCards + cloneCount) {
        currentIndex = cloneCount;
        setTimeout(() => updateCarousel(false), 50);
      } else if (currentIndex < cloneCount) {
        currentIndex = totalCards + cloneCount - 1;
        setTimeout(() => updateCarousel(false), 50);
      }
    }

    function goToSlide(index) {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex = index;
      updateCarousel();
      setTimeout(() => {
        handleInfiniteScroll();
        isAnimating = false;
      }, 500);
    }

    function nextSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex++;
      updateCarousel();
      setTimeout(() => {
        handleInfiniteScroll();
        isAnimating = false;
      }, 500);
    }

    function prevSlide() {
      if (isAnimating) return;
      isAnimating = true;
      currentIndex--;
      updateCarousel();
      setTimeout(() => {
        handleInfiniteScroll();
        isAnimating = false;
      }, 500);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    container.addEventListener('mousedown', (e) => {
      startX = e.pageX;
      isDragging = true;
      container.style.cursor = 'grabbing';
    });

    container.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const currentX = e.pageX;
      const diffX = startX - currentX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        isDragging = false;
        container.style.cursor = 'grab';
      }
    });

    container.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    container.addEventListener('mouseleave', () => {
      isDragging = false;
      container.style.cursor = 'grab';
    });

    updateCarousel();
    container.style.cursor = 'grab';
  }

  renderResults() {
    const container = document.getElementById('results-container');
    if (!container || !DATA.cases) return;

    container.innerHTML = DATA.cases.map((caseStudy, index) => `
      <div class="result-card fade-in stagger-${index + 1}">
        <div class="result-image">
          <img src="${caseStudy.image}" alt="${caseStudy.company} - ${caseStudy.sector}" loading="lazy">
          <div class="result-overlay">
            <div class="result-company">${caseStudy.company}</div>
            <div class="result-sector">${caseStudy.sector}</div>
          </div>
        </div>
        <div class="result-content">
          <div class="result-section">
            <div class="result-label challenge">
              <i data-lucide="alert-triangle" class="w-4 h-4"></i>
              Desafio
            </div>
            <p class="result-description">${caseStudy.challenge}</p>
          </div>
          
          <div class="result-section">
            <div class="result-label solution">
              <i data-lucide="lightbulb" class="w-4 h-4"></i>
              Solução
            </div>
            <p class="result-description">${caseStudy.solution}</p>
          </div>
          
          <div class="result-metrics">
            ${caseStudy.metrics.map(metric => `
              <span class="result-metric">${metric}</span>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    // Re-initialize icons for new content
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container || !DATA.testimonials) return;

    // Generate testimonials HTML with rating images
    const testimonialsHTML = DATA.testimonials.map((testimonial, index) => `
      <div class="testimonial-card fade-in stagger-${index + 1}">
        <div class="testimonial-rating">
          <div class="stars-container">
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
            <i data-lucide="star" class="star filled"></i>
          </div>
        </div>
        <div class="testimonial-content">
          "${testimonial.content}"
        </div>
        <div class="testimonial-author">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
          </div>
        </div>
      </div>
    `).join('');

    // Duplicate testimonials for infinite scroll effect
    container.innerHTML = testimonialsHTML + testimonialsHTML;
  }

  setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        this.showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        this.showNotification('Por favor, insira um email válido.', 'error');
        return;
      }

      // Show loading state
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Enviando...';
      submitButton.disabled = true;

      try {
        // Send form data to server
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
          form.reset();
        } else {
          throw new Error('Erro ao enviar mensagem');
        }
      } catch (error) {
        console.error('Error sending contact form:', error);
        this.showNotification('Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.', 'error');
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }

  setupBlogSearch() {
    // Check for modern blog elements first
    const modernSearchInput = document.getElementById('blogSearchModern');
    const modernFilterTabs = document.querySelectorAll('.filter-tab-modern');
    const modernBlogCards = document.querySelectorAll('.blog-card-modern');
    
    if (modernSearchInput && modernFilterTabs.length && modernBlogCards.length) {
      this.setupModernBlogSearch();
      return;
    }

    // Fallback to old blog search
    const searchInput = document.getElementById('blogSearch');
    const topicItems = document.querySelectorAll('.topic-item');
    const blogCards = document.querySelectorAll('.blog-card');
    
    if (!searchInput || !blogCards.length) return;

    // Search functionality
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      this.filterBlogArticles(searchTerm);
    });

    // Topic filter functionality
    topicItems.forEach(item => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        topicItems.forEach(t => t.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        
        const topic = item.getAttribute('data-topic');
        this.filterBlogArticlesByTopic(topic);
      });
    });

    // Search icon functionality
    const searchIcon = document.querySelector('.search-bar .fas');
    if (searchIcon) {
      searchIcon.addEventListener('click', () => {
        searchInput.focus();
      });
    }
  }



  filterFinalBlogCards(searchTerm) {
    const blogCards = document.querySelectorAll('.blog-card-final');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-title-final')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.blog-desc-final')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.blog-category-final')?.textContent.toLowerCase() || '';

      const isVisible = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        category.includes(searchTerm);

      if (isVisible) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Search: ${visibleCount} final cards found for "${searchTerm}"`);
  }

  filterFinalBlogByCategory(category) {
    const blogCards = document.querySelectorAll('.blog-card-final');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      
      const isVisible = category === 'all' || 
        cardCategory === category || 
        cardCategory.includes(category.toLowerCase().replace('-', ' '));

      if (isVisible) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Filter: ${visibleCount} final cards found for category "${category}"`);
  }

  filterExactBlogCards(searchTerm) {
    const blogCards = document.querySelectorAll('.blog-card-exact');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-title-exact')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.blog-desc-exact')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.blog-category-exact')?.textContent.toLowerCase() || '';

      const isVisible = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        category.includes(searchTerm);

      if (isVisible) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Search: ${visibleCount} exact cards found for "${searchTerm}"`);
  }

  filterExactBlogByCategory(category) {
    const blogCards = document.querySelectorAll('.blog-card-exact');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      
      const isVisible = category === 'all' || 
        cardCategory === category || 
        cardCategory.includes(category.toLowerCase().replace('-', ' '));

      if (isVisible) {
        card.style.display = 'flex';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Filter: ${visibleCount} exact cards found for category "${category}"`);
  }

  filterModernBlogCards(searchTerm) {
    const blogCards = document.querySelectorAll('.blog-card-new');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('.blog-title-new')?.textContent.toLowerCase() || '';
      const description = card.querySelector('.blog-excerpt-new')?.textContent.toLowerCase() || '';
      const category = card.querySelector('.blog-category-label')?.textContent.toLowerCase() || '';

      const isVisible = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        category.includes(searchTerm);

      if (isVisible) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Search: ${visibleCount} cards found for "${searchTerm}"`);
  }

  filterBlogByCategory(category) {
    const blogCards = document.querySelectorAll('.blog-card-new');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      
      const isVisible = category === 'all' || 
        cardCategory === category || 
        cardCategory.includes(category.toLowerCase().replace('-', ' '));

      if (isVisible) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    console.log(`Filter: ${visibleCount} cards found for category "${category}"`);
    
    // Update carousel after filtering
    setTimeout(() => {
      this.setupBlogCarousel();
    }, 100);
  }

  filterBlogArticles(searchTerm) {
    const blogCards = document.querySelectorAll('.blog-card');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const title = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const description = card.querySelector('p')?.textContent.toLowerCase() || '';
      const badges = Array.from(card.querySelectorAll('.blog-badge')).map(badge => 
        badge.textContent.toLowerCase()
      ).join(' ');

      const isVisible = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) || 
        badges.includes(searchTerm);

      if (isVisible) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    this.updateBlogResultsCount(visibleCount, searchTerm);
  }

  filterBlogArticlesByTopic(topic) {
    const blogCards = document.querySelectorAll('.blog-card');
    let visibleCount = 0;

    blogCards.forEach(card => {
      const badges = Array.from(card.querySelectorAll('.blog-badge'));
      const cardTopics = badges.map(badge => 
        badge.textContent.toLowerCase().replace(/\s+/g, '').replace('ê', 'e').replace('ç', 'c')
      );

      const isVisible = topic === 'all' || cardTopics.some(cardTopic => {
        if (topic === 'automacao') return cardTopic.includes('automacao');
        if (topic === 'dashboards') return cardTopic.includes('dashboard');
        if (topic === 'cases') return cardTopic.includes('case') || cardTopic.includes('sucesso');
        return cardTopic.includes(topic);
      });

      if (isVisible) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease-in';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    this.updateBlogResultsCount(visibleCount);
  }

  updateBlogResultsCount(count, searchTerm = '') {
    const topicLabel = document.querySelector('.topic-label');
    if (topicLabel) {
      if (searchTerm) {
        topicLabel.textContent = `Resultados da busca: ${count} artigo${count !== 1 ? 's' : ''}`;
      } else {
        topicLabel.textContent = `Total: ${count} artigo${count !== 1 ? 's' : ''}`;
      }
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '1rem 1.5rem',
      borderRadius: '0.5rem',
      color: 'white',
      fontWeight: '500',
      zIndex: '9999',
      transform: 'translateX(100%)',
      transition: 'transform 0.3s ease',
      maxWidth: '400px',
      wordWrap: 'break-word'
    });

    // Set background color based on type
    switch (type) {
      case 'success':
        notification.style.backgroundColor = '#10b981';
        break;
      case 'error':
        notification.style.backgroundColor = '#ef4444';
        break;
      default:
        notification.style.backgroundColor = '#3b82f6';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }

  setupScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate impact numbers
          if (entry.target.classList.contains('impact-number')) {
            this.animateNumber(entry.target);
          }
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .impact-number');
    animatedElements.forEach(el => observer.observe(el));
  }

  animateNumber(element) {
    if (element.dataset.animated) return;
    element.dataset.animated = 'true';
    
    const text = element.textContent;
    const hasPercent = text.includes('%');
    const isNegative = text.includes('-');
    const isPositive = text.includes('+');
    
    const number = parseFloat(text.replace(/[^0-9]/g, ''));
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 60; // 60 frames
    
    const animate = () => {
      current += increment;
      if (current >= number) {
        current = number;
      }
      
      let display = Math.floor(current).toString();
      if (isPositive && current > 0) display = '+' + display;
      if (isNegative) display = '-' + display;
      if (hasPercent) display += '%';
      
      element.textContent = display;
      
      if (current < number) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }

  setupAnimations() {
    // Add stagger delays to elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const cards = section.querySelectorAll('.fade-in');
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    });

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }

  // Utility method to format phone numbers
  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  }

  // Add loading states for async operations
  setLoading(element, isLoading) {
    if (isLoading) {
      element.classList.add('loading');
      element.disabled = true;
    } else {
      element.classList.remove('loading');
      element.disabled = false;
    }
  }

  // Setup WhatsApp Call-to-Action
  setupWhatsAppCTA() {
    const whatsappCTA = document.getElementById('whatsapp-cta');
    
    if (whatsappCTA) {
      // Show the CTA after 6 seconds
      setTimeout(() => {
        whatsappCTA.style.display = 'block';
        setTimeout(() => {
          whatsappCTA.classList.add('show');
        }, 100);
      }, 6000);

      // Hide CTA after user clicks on WhatsApp button
      const whatsappLink = document.querySelector('.whatsapp-link');
      if (whatsappLink) {
        whatsappLink.addEventListener('click', () => {
          whatsappCTA.classList.remove('show');
          setTimeout(() => {
            whatsappCTA.style.display = 'none';
          }, 500);
        });
      }

      // Auto-hide CTA after 10 seconds of showing
      setTimeout(() => {
        if (whatsappCTA.classList.contains('show')) {
          whatsappCTA.classList.remove('show');
          setTimeout(() => {
            whatsappCTA.style.display = 'none';
          }, 500);
        }
      }, 16000); // 6 seconds delay + 10 seconds showing
    }
  }
}

// Initialize the website
const website = new DuatxWebsite();

// Global functions for button clicks
window.scrollToSection = function(sectionId) {
  website.scrollToSection(sectionId);
};

// Global functions for cookie banner (called from HTML onclick events)
function acceptAllCookies() {
  const preferences = {
    essential: true,
    analytics: true,
    marketing: true
  };
  website.saveConsentPreferences(preferences);
}

function showCookiePreferences() {
  website.showCookieModal();
}

function showCookieModal(event) {
  if (event) event.preventDefault();
  website.showCookieModal();
}

function closeCookieModal() {
  website.hideCookieModal();
}

function savePreferences() {
  const analyticsCheckbox = document.getElementById('analytics-cookies');
  const marketingCheckbox = document.getElementById('marketing-cookies');
  
  const preferences = {
    essential: true, // Always true
    analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
    marketing: marketingCheckbox ? marketingCheckbox.checked : false
  };
  
  website.saveConsentPreferences(preferences);
}

function rejectOptionalCookies() {
  const preferences = {
    essential: true,
    analytics: false,
    marketing: false
  };
  website.saveConsentPreferences(preferences);
}

// Phone number formatting for contact form
document.addEventListener('DOMContentLoaded', () => {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length >= 11) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length >= 7) {
        value = value.replace(/^(\d{2})(\d{4})(\d+)$/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/^(\d{2})(\d+)$/, '($1) $2');
      }
      
      e.target.value = value;
    });
  }
});

// Add CSS for notifications and loading states
const notificationStyles = `
.notification {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  border-left: 4px solid rgba(255, 255, 255, 0.3);
}

.loading {
  position: relative;
  pointer-events: none;
  opacity: 0.6;
}

.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid hsl(var(--primary));
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.nav-link.active {
  color: hsl(var(--blue-400));
}

.nav-link.active::after {
  width: 100%;
}

@media (max-width: 768px) {
  .notification {
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
`;

const styleElement = document.createElement('style');
styleElement.textContent = notificationStyles;
document.head.appendChild(styleElement);

// Modern Blog Carousel Extension for DuatxWebsite
DuatxWebsite.prototype.setupModernBlogCarousel = function() {
  const container = document.querySelector('.blog-carousel-modern');
  const prevBtn = document.getElementById('blog-exact-prev');
  const nextBtn = document.getElementById('blog-exact-next');
  const dotsContainer = document.getElementById('blog-exact-dots');
  
  if (!container || !prevBtn || !nextBtn || !dotsContainer) {
    console.warn('Modern blog carousel elements not found');
    return;
  }

  let currentIndex = 0;
  const cards = container.querySelectorAll('.blog-card-exact');
  const totalCards = cards.length;
  
  if (totalCards === 0) {
    console.warn('No modern blog cards found');
    return;
  }

  console.log(`Setting up modern blog carousel with ${totalCards} cards`);

  function calculateDimensions() {
    const cardWidth = window.innerWidth >= 1024 ? 300 : (window.innerWidth >= 768 ? 280 : 260);
    const gap = 24;
    const visibleCards = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 2 : 1);
    return { cardWidth, gap, visibleCards };
  }

  function createDots() {
    const { visibleCards } = calculateDimensions();
    const maxSlides = Math.max(1, totalCards - visibleCards + 1);
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < maxSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `dot-blog ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const { cardWidth, gap, visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    currentIndex = Math.min(currentIndex, maxIndex);
    
    const translateX = currentIndex * (cardWidth + gap);
    container.style.transform = `translateX(-${translateX}px)`;
    
    // Update dots
    document.querySelectorAll('.dot-blog').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function goToSlide(index) {
    const { visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
  }

  function nextSlide() {
    const { visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Initialize
  createDots();
  updateCarousel();

  // Handle resize
  window.addEventListener('resize', () => {
    createDots();
    updateCarousel();
  });

  console.log('Modern blog carousel initialized successfully');
};

// Final Blog Carousel Extension for DuatxWebsite
DuatxWebsite.prototype.setupFinalBlogCarousel = function() {
  const container = document.querySelector('.blog-carousel-final');
  const prevBtn = document.getElementById('blog-final-prev');
  const nextBtn = document.getElementById('blog-final-next');
  const dotsContainer = document.getElementById('blog-final-dots');
  
  if (!container || !prevBtn || !nextBtn || !dotsContainer) {
    console.warn('Final blog carousel elements not found');
    return;
  }

  let currentIndex = 0;
  const cards = container.querySelectorAll('.blog-card-final');
  const totalCards = cards.length;
  
  if (totalCards === 0) {
    console.warn('No final blog cards found');
    return;
  }

  console.log(`Setting up final blog carousel with ${totalCards} cards`);

  function calculateDimensions() {
    const cardWidth = window.innerWidth >= 1024 ? 280 : (window.innerWidth >= 768 ? 260 : 240);
    const gap = window.innerWidth >= 1024 ? 24 : (window.innerWidth >= 768 ? 20 : 16);
    const visibleCards = window.innerWidth >= 1024 ? 4 : (window.innerWidth >= 768 ? 2 : 1);
    return { cardWidth, gap, visibleCards };
  }

  function createDots() {
    const { visibleCards } = calculateDimensions();
    const maxSlides = Math.max(1, totalCards - visibleCards + 1);
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < maxSlides; i++) {
      const dot = document.createElement('div');
      dot.className = `blog-dot-final ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateCarousel() {
    const { cardWidth, gap, visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    
    currentIndex = Math.min(currentIndex, maxIndex);
    
    const translateX = currentIndex * (cardWidth + gap);
    container.style.transform = `translateX(-${translateX}px)`;
    
    // Update dots
    document.querySelectorAll('.blog-dot-final').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update buttons
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
  }

  function goToSlide(index) {
    const { visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateCarousel();
  }

  function nextSlide() {
    const { visibleCards } = calculateDimensions();
    const maxIndex = Math.max(0, totalCards - visibleCards);
    if (currentIndex < maxIndex) {
      currentIndex++;
      updateCarousel();
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  }

  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);

  // Initialize
  createDots();
  updateCarousel();

  // Handle resize
  window.addEventListener('resize', () => {
    createDots();
    updateCarousel();
  });

  console.log('Final blog carousel initialized successfully');
};

// Modern Blog Search Extension for DuatxWebsite
DuatxWebsite.prototype.setupModernBlogSearch = function() {
  const searchInput = document.getElementById('blogSearchModern');
  const filterTabs = document.querySelectorAll('.filter-tab-modern');
  const blogCards = document.querySelectorAll('.blog-card-modern');
  
  if (!searchInput || !filterTabs.length || !blogCards.length) {
    console.warn('Modern blog elements not found');
    return;
  }

  console.log(`Setting up modern blog search with ${blogCards.length} cards`);

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();
    this.filterModernBlogCards(searchTerm);
  });

  // Filter tab functionality
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      filterTabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      const filter = tab.getAttribute('data-filter');
      this.filterModernBlogByCategory(filter);
    });
  });

  // Search icon functionality
  const searchIcon = document.querySelector('.search-icon-modern');
  if (searchIcon) {
    searchIcon.addEventListener('click', () => {
      searchInput.focus();
    });
  }

  console.log('Modern blog search initialized successfully');
};

// Modern Blog Filter Functions
DuatxWebsite.prototype.filterModernBlogCards = function(searchTerm) {
  const blogCards = document.querySelectorAll('.blog-card-modern');
  let visibleCount = 0;
  
  blogCards.forEach(card => {
    const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
    const description = card.querySelector('.blog-description').textContent.toLowerCase();
    const category = card.querySelector('.blog-category-modern').textContent.toLowerCase();
    
    const isVisible = !searchTerm || 
      title.includes(searchTerm) || 
      description.includes(searchTerm) ||
      category.includes(searchTerm);
    
    if (isVisible) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  this.updateModernBlogResultsCount(visibleCount, searchTerm);
};

DuatxWebsite.prototype.filterModernBlogByCategory = function(category) {
  const blogCards = document.querySelectorAll('.blog-card-modern');
  let visibleCount = 0;
  
  blogCards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const isVisible = category === 'all' || cardCategory === category;
    
    if (isVisible) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  this.updateModernBlogResultsCount(visibleCount);
};

DuatxWebsite.prototype.updateModernBlogResultsCount = function(count, searchTerm = '') {
  const activeTab = document.querySelector('.filter-tab-modern.active');
  if (activeTab && !searchTerm) {
    // Update the count in the active tab text
    const tabText = activeTab.textContent.split('(')[0].trim();
    activeTab.textContent = `${tabText} (${count})`;
  }
  
  console.log(`Modern blog filtered: ${count} articles visible`);
};

DuatxWebsite.prototype.setupCookieBanner = function() {
  // Check if user has already given consent
  const cookieConsent = localStorage.getItem('cookieConsent');
  
  if (!cookieConsent) {
    // Show banner after a short delay to ensure page is loaded
    setTimeout(() => {
      this.showCookieBanner();
    }, 1000);
  } else {
    // Load and apply user's preferences
    this.applyCookiePreferences();
  }
};

DuatxWebsite.prototype.showCookieBanner = function() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'block';
  }
};

DuatxWebsite.prototype.hideCookieBanner = function() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.style.display = 'none';
  }
};

DuatxWebsite.prototype.showCookieModal = function() {
  const modal = document.getElementById('cookie-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Load current preferences
    this.loadCookiePreferences();
  }
};

DuatxWebsite.prototype.hideCookieModal = function() {
  const modal = document.getElementById('cookie-modal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
};

DuatxWebsite.prototype.loadCookiePreferences = function() {
  const savedPreferences = localStorage.getItem('cookiePreferences');
  if (savedPreferences) {
    try {
      const preferences = JSON.parse(savedPreferences);
      
      // Set checkbox states
      const analyticsCheckbox = document.getElementById('analytics-cookies');
      const marketingCheckbox = document.getElementById('marketing-cookies');
      
      if (analyticsCheckbox) analyticsCheckbox.checked = preferences.analytics || false;
      if (marketingCheckbox) marketingCheckbox.checked = preferences.marketing || false;
    } catch (e) {
      console.error('Error loading cookie preferences:', e);
    }
  }
};

DuatxWebsite.prototype.saveConsentPreferences = function(preferences) {
  const consentData = {
    timestamp: new Date().toISOString(),
    preferences: preferences,
    version: '1.0'
  };
  
  localStorage.setItem('cookieConsent', JSON.stringify(consentData));
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
  
  this.applyCookiePreferences();
  this.hideCookieBanner();
  this.hideCookieModal();
  
  console.log('Cookie preferences saved:', preferences);
};

DuatxWebsite.prototype.applyCookiePreferences = function() {
  const savedPreferences = localStorage.getItem('cookiePreferences');
  if (savedPreferences) {
    try {
      const preferences = JSON.parse(savedPreferences);
      
      // Apply analytics cookies
      if (preferences.analytics) {
        this.enableAnalyticsCookies();
      } else {
        this.disableAnalyticsCookies();
      }
      
      // Apply marketing cookies
      if (preferences.marketing) {
        this.enableMarketingCookies();
      } else {
        this.disableMarketingCookies();
      }
      
      console.log('Cookie preferences applied:', preferences);
    } catch (e) {
      console.error('Error applying cookie preferences:', e);
    }
  }
};

DuatxWebsite.prototype.enableAnalyticsCookies = function() {
  // Here you can add Google Analytics or other analytics tools
  console.log('Analytics cookies enabled');
  
  // Example: Load Google Analytics
  /*
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'YOUR-TRACKING-ID', 'auto');
  ga('send', 'pageview');
  */
};

DuatxWebsite.prototype.disableAnalyticsCookies = function() {
  // Clear analytics cookies
  console.log('Analytics cookies disabled');
  
  // Remove analytics cookies if they exist
  document.cookie = '_ga=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = '_gat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = '_gid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

DuatxWebsite.prototype.enableMarketingCookies = function() {
  // Here you can add marketing/advertising tools
  console.log('Marketing cookies enabled');
  
  // Example: Load Facebook Pixel, Google Ads, etc.
};

DuatxWebsite.prototype.disableMarketingCookies = function() {
  // Clear marketing cookies
  console.log('Marketing cookies disabled');
  
  // Remove marketing cookies if they exist
  document.cookie = '_fbp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'ads_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

