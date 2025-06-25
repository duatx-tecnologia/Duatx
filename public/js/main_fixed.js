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
      this.setupBlogSearch();
      this.setupScrollEffects();
      this.setupAnimations();
      this.setupWhatsAppCTA();
      
      // Setup carousels after a small delay to ensure DOM is ready
      setTimeout(() => {
        this.setupSectorsCarousel();
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
  }

  setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }
  }

  closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  }

  setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (navbar) {
        if (currentScrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
          navbar.classList.add('hidden');
        } else {
          navbar.classList.remove('hidden');
        }
      }
      
      lastScrollY = currentScrollY;
      this.updateActiveNavLink();
    });
  }

  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
      const offsetTop = element.offsetTop - navbarHeight - 20;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  renderServices() {
    const container = document.getElementById('services-container');
    if (!container || !DATA.services) return;

    container.innerHTML = DATA.services.map(service => `
      <div class="service-card">
        <div class="service-icon">
          <i data-lucide="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <ul class="service-features">
          ${service.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="service-cta">
          <button class="btn btn-outline" onclick="scrollToSection('contato')">
            Saiba Mais
          </button>
        </div>
      </div>
    `).join('');

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  renderSectors() {
    const container = document.getElementById('sectors-container');
    if (!container || !DATA.sectors) return;

    container.innerHTML = DATA.sectors.map(sector => `
      <div class="sector-card">
        <div class="sector-icon">
          <i data-lucide="${sector.icon}"></i>
        </div>
        <h3>${sector.title}</h3>
        <p>${sector.description}</p>
        <div class="sector-solutions">
          ${sector.solutions.map(solution => `<span class="solution-tag">${solution}</span>`).join('')}
        </div>
      </div>
    `).join('');

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  setupSectorsCarousel() {
    const container = document.querySelector('.sectors-carousel');
    const prevBtn = document.getElementById('sectors-prev');
    const nextBtn = document.getElementById('sectors-next');
    const dotsContainer = document.getElementById('sectors-dots');
    
    if (!container || !DATA.sectors) return;

    let currentIndex = 0;
    const totalCards = DATA.sectors.length;
    const cardWidth = window.innerWidth >= 1024 ? 400 : (window.innerWidth >= 768 ? 350 : 300);
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

    // Initialize
    updateCarousel();
  }

  setupTechnologiesCarousel() {
    const carouselTrack = document.getElementById('technologiesCarouselTrack');
    const prevBtn = document.getElementById('techCarouselPrev');
    const nextBtn = document.getElementById('techCarouselNext');
    
    if (!carouselTrack || !prevBtn || !nextBtn) {
      return;
    }

    let currentIndex = 0;
    let isAnimating = false;
    const categories = carouselTrack.querySelectorAll('.tech-category');
    const totalCategories = categories.length;
    
    if (totalCategories === 0) return;

    // Clone items for infinite scroll
    const firstClones = [];
    const lastClones = [];
    const cloneCount = Math.min(3, totalCategories);

    // Clone last items and prepend
    for (let i = totalCategories - cloneCount; i < totalCategories; i++) {
      const clone = categories[i].cloneNode(true);
      clone.classList.add('clone');
      carouselTrack.insertBefore(clone, carouselTrack.firstChild);
      lastClones.push(clone);
    }

    // Clone first items and append
    for (let i = 0; i < cloneCount; i++) {
      const clone = categories[i].cloneNode(true);
      clone.classList.add('clone');
      carouselTrack.appendChild(clone);
      firstClones.push(clone);
    }

    const allItems = carouselTrack.querySelectorAll('.tech-category');
    const cardWidth = window.innerWidth >= 1024 ? 420 : (window.innerWidth >= 768 ? 400 : 370);
    const gap = 32;
    
    // Set initial position (skip the cloned items at the beginning)
    currentIndex = cloneCount;
    
    function updateCarousel(animate = true) {
      const translateX = -currentIndex * (cardWidth + gap);
      carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
      carouselTrack.style.transform = `translateX(${translateX}px)`;
    }

    function handleInfiniteScroll() {
      if (currentIndex >= totalCategories + cloneCount) {
        currentIndex = cloneCount;
        setTimeout(() => updateCarousel(false), 50);
      } else if (currentIndex < cloneCount) {
        currentIndex = totalCategories + cloneCount - 1;
        setTimeout(() => updateCarousel(false), 50);
      }
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

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto-play functionality
    let autoPlayInterval;
    
    function startAutoPlay() {
      autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
      clearInterval(autoPlayInterval);
    }

    // Initialize
    updateCarousel(false);
    startAutoPlay();

    // Pause auto-play on hover
    const carousel = document.querySelector('.technologies-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', startAutoPlay);
    }

    // Re-initialize icons for cloned content
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
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

    // Initialize
    updateCarousel();
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
    if (!container || !DATA.results) return;

    container.innerHTML = DATA.results.map(result => `
      <div class="result-card">
        <div class="result-metric">
          <span class="metric-value" data-count="${result.value}">${result.value}</span>
          <span class="metric-unit">${result.unit}</span>
        </div>
        <h3>${result.title}</h3>
        <p>${result.description}</p>
        <div class="result-tags">
          ${result.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }

  renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container || !DATA.testimonials) return;

    container.innerHTML = DATA.testimonials.map(testimonial => `
      <div class="testimonial-card">
        <div class="testimonial-rating">
          <img src="assets/avaliacao-2.png" alt="5 estrelas" class="rating-image">
        </div>
        <blockquote>
          "${testimonial.content}"
        </blockquote>
        <div class="testimonial-author">
          <div class="author-info">
            <cite>${testimonial.author}</cite>
            <span class="author-title">${testimonial.position}</span>
            <span class="author-company">${testimonial.company}</span>
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
      
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      // Show loading state
      this.setLoading(submitBtn, true);
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      this.showNotification('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
      
      // Reset form
      form.reset();
      this.setLoading(submitBtn, false);
      submitBtn.textContent = originalText;
    });
  }

  setupBlogSearch() {
    const searchInput = document.getElementById('blog-search');
    const topicFilters = document.querySelectorAll('.topic-filter');
    
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterBlogArticles(e.target.value);
      });
    }
    
    topicFilters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Remove active class from all filters
        topicFilters.forEach(f => f.classList.remove('active'));
        // Add active class to clicked filter
        filter.classList.add('active');
        
        const topic = filter.dataset.topic;
        this.filterBlogArticlesByTopic(topic);
      });
    });
  }

  filterBlogArticles(searchTerm) {
    const articles = document.querySelectorAll('.blog-card');
    let visibleCount = 0;
    
    articles.forEach(article => {
      const title = article.querySelector('h3').textContent.toLowerCase();
      const excerpt = article.querySelector('p').textContent.toLowerCase();
      const isVisible = title.includes(searchTerm.toLowerCase()) || 
                       excerpt.includes(searchTerm.toLowerCase());
      
      article.style.display = isVisible ? 'block' : 'none';
      if (isVisible) visibleCount++;
    });
    
    this.updateBlogResultsCount(visibleCount, searchTerm);
  }

  filterBlogArticlesByTopic(topic) {
    const articles = document.querySelectorAll('.blog-card');
    let visibleCount = 0;
    
    articles.forEach(article => {
      const articleTopic = article.dataset.topic;
      const isVisible = topic === 'all' || articleTopic === topic;
      
      article.style.display = isVisible ? 'block' : 'none';
      if (isVisible) visibleCount++;
    });
    
    this.updateBlogResultsCount(visibleCount);
  }

  updateBlogResultsCount(count, searchTerm = '') {
    const resultsCount = document.getElementById('blog-results-count');
    if (resultsCount) {
      const message = searchTerm ? 
        `${count} artigo(s) encontrado(s) para "${searchTerm}"` :
        `${count} artigo(s) disponível(is)`;
      resultsCount.textContent = message;
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }

  setupScrollEffects() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Animate counters for result cards
          const counters = entry.target.querySelectorAll('[data-count]');
          counters.forEach(counter => this.animateNumber(counter));
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .sector-card, .result-card, .testimonial-card, .tech-category');
    animatedElements.forEach(el => observer.observe(el));
  }

  animateNumber(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  setupAnimations() {
    // Add stagger animation to cards
    const cardGroups = [
      '.services-grid .service-card',
      '.sectors-grid .sector-card',
      '.results-grid .result-card'
    ];

    cardGroups.forEach(selector => {
      const cards = document.querySelectorAll(selector);
      cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
      });
    });
  }

  formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  }

  setLoading(element, isLoading) {
    if (isLoading) {
      element.classList.add('loading');
      element.disabled = true;
      element.textContent = 'Enviando...';
    } else {
      element.classList.remove('loading');
      element.disabled = false;
    }
  }

  setupWhatsAppCTA() {
    // Show WhatsApp CTA after 6 seconds
    setTimeout(() => {
      const whatsappCTA = document.getElementById('whatsapp-cta');
      if (whatsappCTA) {
        whatsappCTA.classList.add('show');
        
        // Add click handler for close button
        const closeBtn = whatsappCTA.querySelector('.whatsapp-close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            whatsappCTA.classList.remove('show');
          });
        }
      }
    }, 6000);
  }
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
    const offsetTop = element.offsetTop - navbarHeight - 20;
    
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
}

// Initialize the website
const duatxWebsite = new DuatxWebsite();