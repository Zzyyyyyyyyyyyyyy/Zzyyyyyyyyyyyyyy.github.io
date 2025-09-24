/**
 * Animation Component
 * Handles page animations, scroll-triggered effects, and transitions
 */

class AnimationManager {
  constructor() {
    this.observers = new Map();
    this.animatedElements = new Set();
    this.scrollElements = [];
    this.isInitialized = false;

    this.config = {
      rootMargin: '0px 0px -10% 0px',
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      staggerDelay: 0.15,
      defaultDuration: 0.8,
      defaultEasing: 'cubic-bezier(0.16, 1, 0.3, 1)'
    };

    this.init();
  }

  /**
   * Initialize animation system
   */
  init() {
    if (this.isInitialized) return;

    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupPageLoadAnimations();
    this.bindEvents();

    this.isInitialized = true;
  }

  /**
   * Setup intersection observer for scroll-triggered animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      this.fallbackScrollHandler();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateElement(entry.target);
        }
      });
    }, this.config);

    this.observers.set('scroll', observer);
  }

  /**
   * Setup scroll-triggered animations
   */
  setupScrollAnimations() {
    // Find elements that should animate on scroll
    const animatableElements = DOMUtils.queryAll(`
      .fade-in,
      .slide-up,
      .scale-in,
      .page-title,
      .about-section,
      .contact-form-container,
      .local-time-container,
      .final-section,
      .grid-item
    `);

    animatableElements.forEach((element, index) => {
      this.prepareElementForAnimation(element, index);
      this.observers.get('scroll').observe(element);
    });

    this.scrollElements = Array.from(animatableElements);
  }

  /**
   * Prepare element for animation
   * @param {Element} element - Element to prepare
   * @param {number} index - Element index for stagger delays
   */
  prepareElementForAnimation(element, index = 0) {
    if (this.animatedElements.has(element)) return;

    // Set initial animation state
    const animationType = this.getAnimationType(element);
    const delay = this.calculateDelay(element, index);

    // Apply initial styles
    this.setInitialState(element, animationType);

    // Store animation config
    element.dataset.animationType = animationType;
    element.dataset.animationDelay = delay;
    element.dataset.animationIndex = index;
  }

  /**
   * Get animation type for element
   * @param {Element} element
   * @returns {string}
   */
  getAnimationType(element) {
    if (element.classList.contains('fade-in')) return 'fade-in';
    if (element.classList.contains('slide-up')) return 'slide-up';
    if (element.classList.contains('scale-in')) return 'scale-in';

    // Default animation based on element type
    if (element.classList.contains('page-title')) return 'fade-in';
    if (element.classList.contains('about-section')) return 'slide-up';
    if (element.classList.contains('grid-item')) return 'fade-in';

    return 'fade-in';
  }

  /**
   * Calculate animation delay
   * @param {Element} element
   * @param {number} index
   * @returns {number}
   */
  calculateDelay(element, index) {
    // Check for explicit delay
    const explicitDelay = parseFloat(element.dataset.delay || '0');
    if (explicitDelay > 0) return explicitDelay;

    // Calculate staggered delay
    const baseDelay = 0.1;
    const staggerDelay = index * this.config.staggerDelay;

    return baseDelay + staggerDelay;
  }

  /**
   * Set initial animation state
   * @param {Element} element
   * @param {string} animationType
   */
  setInitialState(element, animationType) {
    element.style.willChange = 'opacity, transform';

    switch (animationType) {
      case 'fade-in':
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        break;
      case 'slide-up':
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        break;
      case 'scale-in':
        element.style.opacity = '0';
        element.style.transform = 'scale(0.9)';
        break;
      default:
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
    }

    // Set transition
    const duration = element.dataset.duration || this.config.defaultDuration;
    const easing = element.dataset.easing || this.config.defaultEasing;

    element.style.transition = `opacity ${duration}s ${easing}, transform ${duration}s ${easing}`;
  }

  /**
   * Animate element into view
   * @param {Element} element
   */
  animateElement(element) {
    if (this.animatedElements.has(element)) return;

    const delay = parseFloat(element.dataset.animationDelay || '0');

    setTimeout(() => {
      this.performAnimation(element);
    }, delay * 1000);
  }

  /**
   * Perform the actual animation
   * @param {Element} element
   */
  performAnimation(element) {
    if (this.animatedElements.has(element)) return;

    const animationType = element.dataset.animationType;

    // Add show class and reset transforms
    element.classList.add('show', 'animate-in');
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) scale(1)';

    // Mark as animated
    this.animatedElements.add(element);

    // Clean up after animation
    setTimeout(() => {
      element.style.willChange = 'auto';
      element.classList.remove('animate-in');
    }, (parseFloat(element.dataset.duration || this.config.defaultDuration) + 0.1) * 1000);

    // Unobserve element to improve performance
    if (this.observers.get('scroll')) {
      this.observers.get('scroll').unobserve(element);
    }
  }

  /**
   * Setup page load animations
   */
  setupPageLoadAnimations() {
    // Handle page load animations
    const handlePageLoad = () => {
      // Remove no-transitions class to enable animations
      document.documentElement.classList.remove('no-transitions');

      // Animate elements that should appear immediately
      const immediateElements = DOMUtils.queryAll('.animate-immediate');
      immediateElements.forEach((element, index) => {
        setTimeout(() => {
          this.animateElement(element);
        }, index * 100);
      });

      // Special handling for hero section elements
      this.animateHeroSection();
    };

    if (document.readyState === 'complete') {
      setTimeout(handlePageLoad, 100);
    } else {
      DOMUtils.addEventListener(window, 'load', () => {
        setTimeout(handlePageLoad, 100);
      });
    }
  }

  /**
   * Animate hero section elements with special timing
   */
  animateHeroSection() {
    const heroElements = DOMUtils.queryAll('.hero .grid-item');

    heroElements.forEach((element, index) => {
      setTimeout(() => {
        if (!this.animatedElements.has(element)) {
          this.prepareElementForAnimation(element, index);
          this.animateElement(element);
        }
      }, 200 + (index * 150)); // Staggered animation
    });
  }

  /**
   * Bind animation events
   */
  bindEvents() {
    // Handle reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.disableAnimations();
    }

    // Listen for reduced motion changes
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      if (mediaQuery.matches) {
        this.disableAnimations();
      } else {
        this.enableAnimations();
      }
    });

    // Handle page visibility changes
    DOMUtils.addEventListener(document, 'visibilitychange', () => {
      if (!document.hidden) {
        this.refreshAnimations();
      }
    });

    // Handle window resize
    const handleResize = DOMUtils.debounce(() => {
      this.refreshAnimations();
    }, 250);

    DOMUtils.addEventListener(window, 'resize', handleResize);
  }

  /**
   * Disable all animations for accessibility
   */
  disableAnimations() {
    const style = document.createElement('style');
    style.id = 'disable-animations';
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);

    // Immediately show all elements
    this.scrollElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'none';
      this.animatedElements.add(element);
    });
  }

  /**
   * Re-enable animations
   */
  enableAnimations() {
    const disableStyle = document.getElementById('disable-animations');
    if (disableStyle) {
      disableStyle.remove();
    }

    // Reset animation states for elements not yet animated
    this.scrollElements.forEach(element => {
      if (!this.animatedElements.has(element)) {
        const animationType = this.getAnimationType(element);
        this.setInitialState(element, animationType);
      }
    });
  }

  /**
   * Refresh animations (useful after content changes)
   */
  refreshAnimations() {
    // Check for new animatable elements
    const newElements = DOMUtils.queryAll(`
      .fade-in:not([data-animation-type]),
      .slide-up:not([data-animation-type]),
      .scale-in:not([data-animation-type])
    `);

    newElements.forEach((element, index) => {
      this.prepareElementForAnimation(element, this.scrollElements.length + index);

      if (this.observers.get('scroll')) {
        this.observers.get('scroll').observe(element);
      }

      this.scrollElements.push(element);
    });
  }

  /**
   * Fallback scroll handler for older browsers
   */
  fallbackScrollHandler() {
    const handleScroll = DOMUtils.throttle(() => {
      this.scrollElements.forEach(element => {
        if (!this.animatedElements.has(element) && DOMUtils.isInViewport(element, 0.1)) {
          this.animateElement(element);
        }
      });
    }, 16);

    DOMUtils.addEventListener(window, 'scroll', handleScroll, { passive: true });
  }

  /**
   * Manually trigger animation for specific element
   * @param {Element|string} target - Element or selector
   * @param {string} animationType - Animation type override
   */
  triggerAnimation(target, animationType = null) {
    const element = typeof target === 'string' ? DOMUtils.query(target) : target;
    if (!element) return;

    if (animationType) {
      element.dataset.animationType = animationType;
    }

    if (!this.animatedElements.has(element)) {
      this.prepareElementForAnimation(element, 0);
    }

    this.animateElement(element);
  }

  /**
   * Reset animation for element (useful for re-triggering)
   * @param {Element|string} target - Element or selector
   */
  resetAnimation(target) {
    const element = typeof target === 'string' ? DOMUtils.query(target) : target;
    if (!element) return;

    this.animatedElements.delete(element);
    element.classList.remove('show', 'animate-in');

    const animationType = this.getAnimationType(element);
    this.setInitialState(element, animationType);
  }

  /**
   * Get animation progress (useful for debugging)
   * @returns {Object}
   */
  getProgress() {
    return {
      totalElements: this.scrollElements.length,
      animatedElements: this.animatedElements.size,
      percentage: Math.round((this.animatedElements.size / this.scrollElements.length) * 100) || 0
    };
  }

  /**
   * Destroy animation manager
   */
  destroy() {
    // Disconnect observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();

    // Clean up sets and arrays
    this.animatedElements.clear();
    this.scrollElements.length = 0;

    // Remove added styles
    const disableStyle = document.getElementById('disable-animations');
    if (disableStyle) {
      disableStyle.remove();
    }

    this.isInitialized = false;
  }
}

// Auto-initialize animation manager
if (document.readyState === 'loading') {
  DOMUtils.addEventListener(document, 'DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();
  });
} else {
  window.animationManager = new AnimationManager();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AnimationManager;
}