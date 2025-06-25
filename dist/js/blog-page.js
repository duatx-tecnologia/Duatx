// Blog Page JavaScript
class BlogPage {
  constructor() {
    this.articles = [];
    this.currentFilter = 'all';
    this.currentSort = 'date';
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupSearch();
    this.setupFilters();
    this.setupPagination();
    this.setupMobileMenu();
    this.loadArticles();
  }

  setupNavigation() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');

    if (mobileToggle && menu) {
      mobileToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const menu = document.querySelector('.menu');

    if (mobileToggle && menu) {
      mobileToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove('active');
          mobileToggle.classList.remove('active');
        }
      });
    }
  }

  setupSearch() {
    const searchInput = document.getElementById('blogPageSearch');
    if (!searchInput) return;

    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        this.filterArticles(e.target.value.toLowerCase().trim());
      }, 300);
    });
  }

  setupFilters() {
    // Category filters
    const categoryLinks = document.querySelectorAll('.category-list a');
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = link.getAttribute('data-category');
        this.filterByCategory(category);
        
        // Update active state
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');
        this.sortArticles(filter);
        
        // Update active state
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      });
    });
  }

  setupPagination() {
    const pageNumbers = document.querySelectorAll('.page-num');
    const prevBtn = document.querySelector('.page-btn.prev');
    const nextBtn = document.querySelector('.page-btn.next');

    pageNumbers.forEach(pageNum => {
      pageNum.addEventListener('click', () => {
        // Update active state
        pageNumbers.forEach(p => p.classList.remove('active'));
        pageNum.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-num.active');
        const prevPage = activePage.previousElementSibling;
        if (prevPage && prevPage.classList.contains('page-num')) {
          pageNumbers.forEach(p => p.classList.remove('active'));
          prevPage.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const activePage = document.querySelector('.page-num.active');
        const nextPage = activePage.nextElementSibling;
        if (nextPage && nextPage.classList.contains('page-num')) {
          pageNumbers.forEach(p => p.classList.remove('active'));
          nextPage.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  loadArticles() {
    this.articles = Array.from(document.querySelectorAll('.blog-article'));
    this.updateArticleVisibility();
  }

  filterArticles(searchTerm) {
    this.articles.forEach(article => {
      const title = article.querySelector('h2').textContent.toLowerCase();
      const description = article.querySelector('p').textContent.toLowerCase();
      const category = article.querySelector('.category').textContent.toLowerCase();
      const tags = Array.from(article.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());

      const isVisible = !searchTerm || 
        title.includes(searchTerm) || 
        description.includes(searchTerm) ||
        category.includes(searchTerm) ||
        tags.some(tag => tag.includes(searchTerm));

      if (isVisible) {
        article.style.display = 'flex';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
      } else {
        article.style.display = 'none';
      }
    });

    this.updateResultCount();
  }

  filterByCategory(category) {
    this.currentFilter = category;
    this.articles.forEach(article => {
      const articleCategory = article.getAttribute('data-category');
      const isVisible = category === 'all' || articleCategory === category;

      if (isVisible) {
        article.style.display = 'flex';
        article.style.opacity = '1';
        article.style.transform = 'translateY(0)';
      } else {
        article.style.display = 'none';
      }
    });

    this.updateResultCount();
  }

  sortArticles(sortType) {
    this.currentSort = sortType;
    const container = document.getElementById('blogArticleGrid');
    let sortedArticles = [...this.articles];

    switch (sortType) {
      case 'recentes':
        sortedArticles.sort((a, b) => {
          const dateA = new Date(a.getAttribute('data-date'));
          const dateB = new Date(b.getAttribute('data-date'));
          return dateB - dateA;
        });
        break;
      case 'populares':
        // Simulate popularity based on reading time
        sortedArticles.sort((a, b) => {
          const timeA = parseInt(a.querySelector('.meta-info span').textContent);
          const timeB = parseInt(b.querySelector('.meta-info span').textContent);
          return timeB - timeA;
        });
        break;
      default:
        // Keep original order
        break;
    }

    // Reorder DOM elements
    sortedArticles.forEach(article => {
      container.appendChild(article);
    });

    this.animateArticles();
  }

  updateArticleVisibility() {
    this.articles.forEach((article, index) => {
      article.style.animation = `slideInUp 0.6s ease forwards`;
      article.style.animationDelay = `${index * 0.1}s`;
    });
  }

  animateArticles() {
    this.articles.forEach((article, index) => {
      if (article.style.display !== 'none') {
        article.style.animation = 'none';
        article.offsetHeight; // Trigger reflow
        article.style.animation = `slideInUp 0.6s ease forwards`;
        article.style.animationDelay = `${index * 0.1}s`;
      }
    });
  }

  updateResultCount() {
    const visibleArticles = this.articles.filter(article => article.style.display !== 'none');
    console.log(`Showing ${visibleArticles.length} of ${this.articles.length} articles`);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new BlogPage();
});

// Animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);