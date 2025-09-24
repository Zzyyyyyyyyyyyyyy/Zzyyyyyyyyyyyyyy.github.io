/**
 * DOM Utilities
 * Helper functions for DOM manipulation and querying
 */

class DOMUtils {
  /**
   * Safely query a single element
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (optional)
   * @returns {Element|null}
   */
  static query(selector, context = document) {
    return context.querySelector(selector);
  }

  /**
   * Safely query multiple elements
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element (optional)
   * @returns {NodeList}
   */
  static queryAll(selector, context = document) {
    return context.querySelectorAll(selector);
  }

  /**
   * Check if element exists in DOM
   * @param {string|Element} element - Selector or element
   * @returns {boolean}
   */
  static exists(element) {
    if (typeof element === 'string') {
      return this.query(element) !== null;
    }
    return element instanceof Element && document.contains(element);
  }

  /**
   * Wait for element to exist in DOM
   * @param {string} selector - CSS selector
   * @param {number} timeout - Timeout in milliseconds
   * @returns {Promise<Element>}
   */
  static waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const element = this.query(selector);
      if (element) {
        resolve(element);
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        const element = this.query(selector);
        if (element) {
          obs.disconnect();
          resolve(element);
        }
      });

      observer.observe(document, {
        childList: true,
        subtree: true
      });

      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      }, timeout);
    });
  }

  /**
   * Add multiple classes to element
   * @param {Element} element
   * @param {string[]} classes
   */
  static addClasses(element, classes) {
    if (!element || !Array.isArray(classes)) return;
    element.classList.add(...classes.filter(cls => typeof cls === 'string'));
  }

  /**
   * Remove multiple classes from element
   * @param {Element} element
   * @param {string[]} classes
   */
  static removeClasses(element, classes) {
    if (!element || !Array.isArray(classes)) return;
    element.classList.remove(...classes.filter(cls => typeof cls === 'string'));
  }

  /**
   * Toggle classes on element
   * @param {Element} element
   * @param {string[]} classes
   */
  static toggleClasses(element, classes) {
    if (!element || !Array.isArray(classes)) return;
    classes.filter(cls => typeof cls === 'string')
           .forEach(cls => element.classList.toggle(cls));
  }

  /**
   * Check if element has all specified classes
   * @param {Element} element
   * @param {string[]} classes
   * @returns {boolean}
   */
  static hasClasses(element, classes) {
    if (!element || !Array.isArray(classes)) return false;
    return classes.every(cls => element.classList.contains(cls));
  }

  /**
   * Create element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} options - Element options
   * @returns {Element}
   */
  static createElement(tag, options = {}) {
    const element = document.createElement(tag);

    if (options.classes) {
      this.addClasses(element, options.classes);
    }

    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
      });
    }

    if (options.styles) {
      Object.entries(options.styles).forEach(([key, value]) => {
        element.style[key] = value;
      });
    }

    if (options.text) {
      element.textContent = options.text;
    }

    if (options.html) {
      element.innerHTML = options.html;
    }

    if (options.children) {
      options.children.forEach(child => {
        if (child instanceof Element) {
          element.appendChild(child);
        }
      });
    }

    return element;
  }

  /**
   * Get element's computed style property
   * @param {Element} element
   * @param {string} property
   * @returns {string}
   */
  static getStyle(element, property) {
    if (!element) return '';
    return window.getComputedStyle(element).getPropertyValue(property);
  }

  /**
   * Set multiple CSS properties on element
   * @param {Element} element
   * @param {Object} styles
   */
  static setStyles(element, styles) {
    if (!element || typeof styles !== 'object') return;
    Object.entries(styles).forEach(([property, value]) => {
      element.style[property] = value;
    });
  }

  /**
   * Get element's offset position relative to viewport
   * @param {Element} element
   * @returns {Object}
   */
  static getOffset(element) {
    if (!element) return { top: 0, left: 0, width: 0, height: 0 };
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height
    };
  }

  /**
   * Check if element is in viewport
   * @param {Element} element
   * @param {number} threshold - Percentage of element that should be visible
   * @returns {boolean}
   */
  static isInViewport(element, threshold = 0.1) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    if (!vertInView || !horInView) return false;

    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;

    return totalArea > 0 && (visibleArea / totalArea) >= threshold;
  }

  /**
   * Smoothly scroll to element
   * @param {Element|string} target - Element or selector
   * @param {Object} options - Scroll options
   */
  static scrollTo(target, options = {}) {
    const element = typeof target === 'string' ? this.query(target) : target;
    if (!element) return;

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
      offset: 0
    };

    const scrollOptions = { ...defaultOptions, ...options };

    if (scrollOptions.offset) {
      const elementPosition = this.getOffset(element).top;
      const offsetPosition = elementPosition - scrollOptions.offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: scrollOptions.behavior
      });
    } else {
      element.scrollIntoView({
        behavior: scrollOptions.behavior,
        block: scrollOptions.block,
        inline: scrollOptions.inline
      });
    }
  }

  /**
   * Debounce function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function}
   */
  static debounce(func, wait) {
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

  /**
   * Throttle function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function}
   */
  static throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  /**
   * Add event listener with automatic cleanup
   * @param {Element} element
   * @param {string} event
   * @param {Function} handler
   * @param {Object} options
   * @returns {Function} Cleanup function
   */
  static addEventListener(element, event, handler, options = {}) {
    if (!element || typeof handler !== 'function') return () => {};

    element.addEventListener(event, handler, options);

    return () => {
      element.removeEventListener(event, handler, options);
    };
  }

  /**
   * Add multiple event listeners at once
   * @param {Element} element
   * @param {Object} events - Event name to handler mapping
   * @param {Object} options
   * @returns {Function} Cleanup function
   */
  static addEventListeners(element, events, options = {}) {
    if (!element || typeof events !== 'object') return () => {};

    const cleanupFunctions = Object.entries(events).map(([event, handler]) =>
      this.addEventListener(element, event, handler, options)
    );

    return () => {
      cleanupFunctions.forEach(cleanup => cleanup());
    };
  }

  /**
   * Get current page info
   * @returns {Object}
   */
  static getPageInfo() {
    const pathname = window.location.pathname;
    const filename = pathname.split('/').pop() || 'index.html';

    return {
      pathname,
      filename,
      search: window.location.search,
      hash: window.location.hash,
      isHomePage: filename === 'index.html' || filename === '',
      isContactPage: filename.toLowerCase().includes('contact'),
      isAboutPage: filename.toLowerCase().includes('about'),
      isWorksPage: filename.toLowerCase().includes('works')
    };
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DOMUtils;
}

// Global availability
window.DOMUtils = DOMUtils;