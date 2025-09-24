/**
 * Navigation Component
 * Handles navigation functionality, active states, and scroll effects
 */

class Navigation {
  constructor() {
    this.navbar = DOMUtils.query('.navbar');
    this.navbarContainer = DOMUtils.query('.navbar-container');
    this.navLinks = DOMUtils.queryAll('.nav-links a');
    this.logo = DOMUtils.query('.logo');

    this.scrollThreshold = 50;
    this.isScrolled = false;

    this.init();
  }

  /**
   * Initialize navigation functionality
   */
  init() {
    if (!this.navbar) return;

    this.setActiveNavLink();
    this.bindEvents();
    this.handleInitialScroll();
  }

  /**
   * Set active navigation link based on current page
   */
  setActiveNavLink() {
    const pageInfo = DOMUtils.getPageInfo();

    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.remove('active');

      // Match current page with navigation link
      if (this.isLinkActive(href, pageInfo)) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Check if navigation link should be active
   * @param {string} href - Link href attribute
   * @param {Object} pageInfo - Current page information
   * @returns {boolean}
   */
  isLinkActive(href, pageInfo) {
    if (!href) return false;

    // Handle special cases for About ME.html and Contact.html
    if (pageInfo.isAboutPage && href.toLowerCase().includes('about')) {
      return true;
    }

    if (pageInfo.isContactPage && href.toLowerCase().includes('contact')) {
      return true;
    }

    if (pageInfo.isWorksPage && href.toLowerCase().includes('works')) {
      return true;
    }

    // Handle home page
    if (pageInfo.isHomePage && (href === 'index.html' || href === '#')) {
      return true;
    }

    // Direct match
    return href === pageInfo.filename;
  }

  /**
   * Bind navigation events
   */
  bindEvents() {
    // Scroll effect
    const handleScroll = DOMUtils.throttle(() => {
      this.handleScroll();
    }, 16); // ~60fps

    DOMUtils.addEventListener(window, 'scroll', handleScroll, { passive: true });

    // Navigation link interactions
    this.bindNavLinkEvents();

    // Logo interactions
    this.bindLogoEvents();

    // Handle page navigation
    this.bindPageNavigation();
  }

  /**
   * Handle scroll effects on navbar
   */
  handleScroll() {
    const scrollY = window.scrollY;
    const shouldBeScrolled = scrollY > this.scrollThreshold;

    if (shouldBeScrolled !== this.isScrolled) {
      this.isScrolled = shouldBeScrolled;
      this.updateScrollState();
    }
  }

  /**
   * Handle initial scroll state
   */
  handleInitialScroll() {
    this.handleScroll();
  }

  /**
   * Update navbar appearance based on scroll state
   */
  updateScrollState() {
    if (!this.navbar || !this.navbarContainer) return;

    if (this.isScrolled) {
      // Scrolled state
      this.navbar.style.padding = '1rem 3%';
      this.navbarContainer.style.paddingTop = '8px';

      // Add scrolled class for additional styling
      this.navbar.classList.add('scrolled');
      this.navbarContainer.classList.add('scrolled');
    } else {
      // Default state
      this.navbar.style.padding = '1.5rem 3%';
      this.navbarContainer.style.paddingTop = '15px';

      // Remove scrolled class
      this.navbar.classList.remove('scrolled');
      this.navbarContainer.classList.remove('scrolled');
    }
  }

  /**
   * Bind navigation link events
   */
  bindNavLinkEvents() {
    this.navLinks.forEach(link => {
      // Enhanced hover effects
      DOMUtils.addEventListener(link, 'mouseenter', () => {
        this.onNavLinkHover(link, true);
      });

      DOMUtils.addEventListener(link, 'mouseleave', () => {
        this.onNavLinkHover(link, false);
      });

      // Click handling for same-page navigation
      DOMUtils.addEventListener(link, 'click', (e) => {
        this.onNavLinkClick(e, link);
      });

      // Keyboard navigation
      DOMUtils.addEventListener(link, 'keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          this.onNavLinkClick(e, link);
        }
      });
    });
  }

  /**
   * Handle navigation link hover
   * @param {Element} link - Navigation link element
   * @param {boolean} isHovering - Whether currently hovering
   */
  onNavLinkHover(link, isHovering) {
    if (isHovering) {
      // Add hover effects
      link.style.setProperty('--nav-link-scale', '1.02');
    } else {
      // Remove hover effects
      link.style.removeProperty('--nav-link-scale');
    }
  }

  /**
   * Handle navigation link click
   * @param {Event} e - Click event
   * @param {Element} link - Navigation link element
   */
  onNavLinkClick(e, link) {
    const href = link.getAttribute('href');
    const pageInfo = DOMUtils.getPageInfo();

    // If clicking on current page link, scroll to top smoothly
    if (this.isLinkActive(href, pageInfo)) {
      e.preventDefault();
      this.scrollToTop();
      return;
    }

    // For external links or different pages, allow default behavior
    // but add loading state
    this.addLoadingState(link);
  }

  /**
   * Bind logo events
   */
  bindLogoEvents() {
    if (!this.logo) return;

    DOMUtils.addEventListener(this.logo, 'click', (e) => {
      e.preventDefault();
      this.scrollToTop();
    });

    // Logo hover effects
    DOMUtils.addEventListener(this.logo, 'mouseenter', () => {
      this.onLogoHover(true);
    });

    DOMUtils.addEventListener(this.logo, 'mouseleave', () => {
      this.onLogoHover(false);
    });
  }

  /**
   * Handle logo hover effects
   * @param {boolean} isHovering - Whether currently hovering
   */
  onLogoHover(isHovering) {
    const logoImg = DOMUtils.query('.logo img');
    if (!logoImg) return;

    if (isHovering) {
      logoImg.style.transform = 'scale(1.15)';
      logoImg.style.filter = 'drop-shadow(0 0 12px rgba(255, 62, 127, 0.5))';
    } else {
      logoImg.style.transform = '';
      logoImg.style.filter = '';
    }
  }

  /**
   * Smooth scroll to top of page
   */
  scrollToTop() {
    // Use GSAP if available, otherwise fallback to native smooth scroll
    if (window.gsap && window.gsap.to) {
      gsap.to(window, {
        duration: 1.5,
        scrollTo: 0,
        ease: "power2.inOut"
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  /**
   * Add loading state to navigation link
   * @param {Element} link - Navigation link element
   */
  addLoadingState(link) {
    link.classList.add('loading');

    // Remove loading state after navigation
    setTimeout(() => {
      link.classList.remove('loading');
    }, 1000);
  }

  /**
   * Bind page navigation events
   */
  bindPageNavigation() {
    // Listen for page visibility changes
    DOMUtils.addEventListener(document, 'visibilitychange', () => {
      if (!document.hidden) {
        // Page became visible, refresh active state
        this.setActiveNavLink();
      }
    });

    // Listen for history changes (back/forward buttons)
    DOMUtils.addEventListener(window, 'popstate', () => {
      this.setActiveNavLink();
    });
  }

  /**
   * Update navigation state programmatically
   * @param {string} activeHref - Href of link to make active
   */
  setActive(activeHref) {
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === activeHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  /**
   * Show/hide navigation
   * @param {boolean} show - Whether to show navigation
   */
  toggle(show = true) {
    if (!this.navbarContainer) return;

    if (show) {
      this.navbarContainer.style.transform = 'translateY(0)';
      this.navbarContainer.style.opacity = '1';
    } else {
      this.navbarContainer.style.transform = 'translateY(-100%)';
      this.navbarContainer.style.opacity = '0';
    }
  }

  /**
   * Get current active navigation link
   * @returns {Element|null}
   */
  getActiveLink() {
    return DOMUtils.query('.nav-links a.active');
  }

  /**
   * Destroy navigation component
   */
  destroy() {
    // Remove event listeners (they're automatically cleaned up by our DOMUtils)
    // Reset states
    this.isScrolled = false;

    if (this.navbar) {
      this.navbar.classList.remove('scrolled');
      this.navbar.style.padding = '';
    }

    if (this.navbarContainer) {
      this.navbarContainer.classList.remove('scrolled');
      this.navbarContainer.style.paddingTop = '';
    }
  }
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
  DOMUtils.addEventListener(document, 'DOMContentLoaded', () => {
    window.navigationComponent = new Navigation();
  });
} else {
  window.navigationComponent = new Navigation();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Navigation;
}