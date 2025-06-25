// Main JavaScript functionality for DUATX website
class DuatxWebsite {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupNavigation();
      this.renderServices();
      this.renderSectors();
      this.renderResults();
      this.renderTestimonials();
      this.setupContactForm();
      this.setupScrollEffects();
      this.setupAnimations();
      
      // Setup carousels after a small delay to ensure DOM is ready
      setTimeout(() => {
        this.setupTechnologiesCarousel();
        this.setupResultsCarousel();
        this.setupBlogCarousel();
        this.setupTestimonialsCarousel();
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
    const visibleCards = Math.floor(container.parentElement.offsetWidth / (cardWidth + gap));
    const maxIndex = Math.max(0, totalCards - visibleCards);

    // Create dots
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
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

  setupTechnologiesCarousel() {
    const container = document.querySelector('.technologies-carousel .tech-categories');
    const prevBtn = document.getElementById('technologies-prev');
    const nextBtn = document.getElementById('technologies-next');
    const dotsContainer = document.getElementById('technologies-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    const categories = container.querySelectorAll('.tech-category');
    const totalCategories = categories.length;
    
    if (totalCategories === 0) return;
    
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 350 : 300);
    const gap = 32;
    const containerWidth = container.parentElement.offsetWidth;
    const visibleCards = Math.max(1, Math.floor(containerWidth / (cardWidth + gap)));
    const maxIndex = Math.max(0, totalCategories - visibleCards);

    // Use existing dots and add click handlers
    const dots = dotsContainer.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      if (index < totalCategories) {
        dot.style.display = 'block';
        dot.addEventListener('click', () => goToSlide(index));
      } else {
        dot.style.display = 'none';
      }
    });

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

    // Resize handler
    window.addEventListener('resize', () => {
      const newVisibleCards = Math.floor(container.parentElement.offsetWidth / (cardWidth + gap));
      const newMaxIndex = Math.max(0, totalCategories - newVisibleCards);
      if (currentIndex > newMaxIndex) {
        currentIndex = newMaxIndex;
      }
      updateCarousel();
    });

    // Initial setup
    updateCarousel();
    container.style.cursor = 'grab';
  }

  setupResultsCarousel() {
    const container = document.querySelector('.results-carousel');
    const prevBtn = document.getElementById('results-prev');
    const nextBtn = document.getElementById('results-next');
    const dotsContainer = document.getElementById('results-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll('.result-card');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 380 : 350);
    const gap = 32;
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
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
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

    // Touch events
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX;
    });

    container.addEventListener('touchmove', (e) => {
      e.preventDefault();
    });

    container.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].pageX;
      const diffX = startX - endX;
      
      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    });

    // Keyboard navigation
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    });

    // Auto-play (optional)
    let autoPlayInterval;
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(() => {
        if (currentIndex >= maxIndex) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        updateCarousel();
      }, 5000);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    container.addEventListener('mouseenter', stopAutoPlay);
    container.addEventListener('mouseleave', startAutoPlay);

    // Initialize
    updateCarousel();
    startAutoPlay();
    container.style.cursor = 'grab';
  }

  setupBlogCarousel() {
    const container = document.querySelector('.blog-carousel');
    const prevBtn = document.getElementById('blog-prev');
    const nextBtn = document.getElementById('blog-next');
    const dotsContainer = document.getElementById('blog-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll('.blog-card');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 380 : 350);
    const gap = 32;
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
      
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

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

  setupTestimonialsCarousel() {
    const container = document.querySelector('.testimonials-carousel');
    const prevBtn = document.getElementById('testimonials-prev');
    const nextBtn = document.getElementById('testimonials-next');
    const dotsContainer = document.getElementById('testimonials-dots');
    
    if (!container || !prevBtn || !nextBtn || !dotsContainer) {
      return;
    }

    let currentIndex = 0;
    const cards = container.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    if (totalCards === 0) return;
    
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 380 : 350);
    const gap = 32;
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
      
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

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
        <div class="result-company">${caseStudy.company}</div>
        <div class="result-sector">${caseStudy.sector}</div>
        <p class="result-description">${caseStudy.challenge}</p>
        <p class="result-description" style="color: hsl(var(--blue-400));">${caseStudy.solution}</p>
        <div class="result-metrics">
          ${caseStudy.metrics.map(metric => `
            <span class="result-metric">${metric}</span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container || !DATA.testimonials) return;

    container.innerHTML = DATA.testimonials.map((testimonial, index) => `
      <div class="testimonial-card fade-in stagger-${index + 1}">
        <div class="testimonial-content">
          "${testimonial.content}"
        </div>
        <div class="testimonial-author">
          <img src="${testimonial.avatar}" alt="${testimonial.name}" class="testimonial-avatar">
          <div class="testimonial-info">
            <div class="testimonial-name">${testimonial.name}</div>
            <div class="testimonial-role">${testimonial.role}</div>
            <div class="testimonial-rating">
              ${Array(testimonial.rating).fill('★').join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
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
}

// Initialize the website
const website = new DuatxWebsite();

// Global functions for button clicks
window.scrollToSection = function(sectionId) {
  website.scrollToSection(sectionId);
};

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