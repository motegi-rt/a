// Cinema Lovers Blog JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initMobileNavigation();
    initScrollAnimations();
    initSmoothScrolling();
    initCardInteractions();
    initScrollEffects();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-toggle__icon');
    
    // Check for saved theme preference or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a nice transition effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// Mobile Navigation
function initMobileNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('nav__toggle--active');
        navMenu.classList.toggle('nav__menu--open');
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('nav__toggle--active');
            navMenu.classList.remove('nav__menu--open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('nav__toggle--active');
            navMenu.classList.remove('nav__menu--open');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
    const ctaButton = document.querySelector('.hero__cta');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA button scroll to reviews
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const reviewsSection = document.getElementById('reviews');
            if (reviewsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = reviewsSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to elements
    const animateElements = document.querySelectorAll(
        '.review-card, .movie-card, .category-card, .section__title'
    );
    
    animateElements.forEach((el, index) => {
        el.classList.add('scroll-fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Card Interactions
function initCardInteractions() {
    // Review Cards
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        // Click interaction
        card.addEventListener('click', function() {
            const title = this.querySelector('.review-card__title').textContent;
            showToast(`「${title}」の記事を開いています...`);
        });
    });
    
    // Movie Cards
    const movieCards = document.querySelectorAll('.movie-card');
    movieCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.movie-card__title').textContent;
            const rating = this.querySelector('.rating-score').textContent;
            showMovieModal(title, rating);
        });
    });
    
    // Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.querySelector('.category-card__title').textContent;
            const count = this.querySelector('.category-card__count').textContent;
            showToast(`${category}カテゴリ（${count}）を表示します`);
        });
    });
}

// Header Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background opacity
        if (scrollTop > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Toast Notification System
function showToast(message) {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast__content">
            <span class="toast__icon">🎬</span>
            <span class="toast__message">${message}</span>
        </div>
    `;
    
    // Add toast styles
    const toastStyles = `
        .toast {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-mocha);
            color: var(--color-text);
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            z-index: 1001;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }
        
        .toast__content {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .toast__icon {
            font-size: 20px;
        }
        
        .toast__message {
            font-weight: 500;
        }
        
        .toast.show {
            transform: translateX(0);
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'toast-styles';
        styleSheet.textContent = toastStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// Movie Modal System
function showMovieModal(title, rating) {
    // Remove existing modal
    const existingModal = document.querySelector('.movie-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'movie-modal';
    modal.innerHTML = `
        <div class="movie-modal__backdrop"></div>
        <div class="movie-modal__content">
            <div class="movie-modal__header">
                <h3 class="movie-modal__title">${title}</h3>
                <button class="movie-modal__close">&times;</button>
            </div>
            <div class="movie-modal__body">
                <div class="movie-modal__rating">
                    <span class="rating-score">${rating}</span>
                    <span class="stars">${generateStars(rating)}</span>
                </div>
                <p>この映画の詳細情報やレビューをもっと見たいですか？</p>
                <div class="movie-modal__actions">
                    <button class="btn btn--primary">詳細を見る</button>
                    <button class="btn btn--secondary movie-modal__cancel">キャンセル</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .movie-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .movie-modal__backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .movie-modal__content {
            background: var(--color-surface);
            border-radius: 16px;
            border: 1px solid var(--color-border);
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .movie-modal.show .movie-modal__content {
            transform: scale(1);
        }
        
        .movie-modal__header {
            padding: 24px;
            border-bottom: 1px solid var(--color-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .movie-modal__title {
            color: var(--color-gold);
            margin: 0;
            font-size: 24px;
        }
        
        .movie-modal__close {
            background: none;
            border: none;
            font-size: 28px;
            color: var(--color-text-secondary);
            cursor: pointer;
            padding: 0;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s ease;
        }
        
        .movie-modal__close:hover {
            background: var(--color-secondary);
            color: var(--color-text);
        }
        
        .movie-modal__body {
            padding: 24px;
        }
        
        .movie-modal__rating {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
        }
        
        .movie-modal__actions {
            display: flex;
            gap: 12px;
            margin-top: 24px;
        }
        
        @media (max-width: 480px) {
            .movie-modal__actions {
                flex-direction: column;
            }
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to page
    document.body.appendChild(modal);
    
    // Show animation
    setTimeout(() => {
        modal.classList.add('show');
        modal.style.opacity = '1';
    }, 100);
    
    // Close handlers
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.movie-modal__content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    modal.querySelector('.movie-modal__close').addEventListener('click', closeModal);
    modal.querySelector('.movie-modal__cancel').addEventListener('click', closeModal);
    modal.querySelector('.movie-modal__backdrop').addEventListener('click', closeModal);
    
    // Detail button
    modal.querySelector('.btn--primary').addEventListener('click', () => {
        showToast(`「${title}」の詳細ページに移動します`);
        closeModal();
    });
}

// Helper function to generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return '★'.repeat(fullStars) + (hasHalfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// Add some easter eggs
function initEasterEggs() {
    let clickCount = 0;
    const logo = document.querySelector('.nav__title');
    
    logo.addEventListener('click', function() {
        clickCount++;
        if (clickCount === 5) {
            showToast('🎉 映画愛が溢れています！');
            this.style.animation = 'pulse 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
            clickCount = 0;
        }
    });
}

// Initialize easter eggs
initEasterEggs();

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // T key to toggle theme
    if (e.key === 't' || e.key === 'T') {
        if (!e.target.matches('input, textarea')) {
            document.getElementById('themeToggle').click();
        }
    }
    
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modal = document.querySelector('.movie-modal');
        if (modal) {
            modal.querySelector('.movie-modal__close').click();
        }
    }
});

// Performance optimization - Debounced scroll handler
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add subtle parallax effect to hero
window.addEventListener('scroll', debounce(function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero__bg-image');
    if (hero && scrolled <= window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
}, 10));