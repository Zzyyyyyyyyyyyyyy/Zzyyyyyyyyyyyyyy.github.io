/**
 * Section Indicators System
 * Replaces browser scrollbar with visual section navigation
 */

class SectionIndicators {
    constructor(options = {}) {
        this.options = {
            containerSelector: 'body',
            sectionSelector: '[data-section]',
            indicatorContainer: '.section-indicators',
            activeClass: 'active',
            offsetThreshold: 0.3, // 30% of viewport height
            smoothScrollDuration: 1000,
            ...options
        };

        this.sections = [];
        this.indicators = [];
        this.currentActiveIndex = 0;
        this.isScrolling = false;
        this.observer = null;

        this.init();
    }

    init() {
        this.detectSections();
        this.createIndicators();
        this.setupScrollDetection();
        this.setupEventListeners();
        this.updateActiveSection();
    }

    detectSections() {
        // Auto-detect sections based on common selectors
        const autoSections = [
            'header',
            'main > section',
            'section',
            '.section',
            '[id^="section"]',
            '.hero-section',
            '.info-grid',
            '.portfolio-section',
            '.about-section',
            '.contact-section',
            '.footer-section',
            '.skills-section',
            '.selected-works-section',
            '.slider-section',
            '.final-section'
        ];

        let foundSections = [];

        // First try data-section attribute
        const dataSections = document.querySelectorAll(this.options.sectionSelector);
        if (dataSections.length > 0) {
            foundSections = Array.from(dataSections);
        } else {
            // Auto-detect sections
            for (const selector of autoSections) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    foundSections = foundSections.concat(Array.from(elements));
                }
            }
        }

        // Remove duplicates and sort by position
        this.sections = foundSections
            .filter((section, index, arr) => arr.indexOf(section) === index)
            .sort((a, b) => a.offsetTop - b.offsetTop)
            .map((section, index) => ({
                element: section,
                id: section.id || section.dataset.section || `section-${index}`,
                name: section.dataset.sectionName ||
                      section.getAttribute('aria-label') ||
                      section.querySelector('h1, h2, h3')?.textContent?.trim() ||
                      `Section ${index + 1}`
            }));

        console.log('Detected sections:', this.sections);
    }

    createIndicators() {
        if (this.sections.length <= 0) {
            console.log('No sections found to create indicators');
            return;
        }

        // Create container if it doesn't exist
        let container = document.querySelector(this.options.indicatorContainer);
        if (!container) {
            container = document.createElement('div');
            container.className = 'section-indicators';
            document.body.appendChild(container);
        }

        // Clear existing indicators
        container.innerHTML = '';

        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'section-indicators-progress';
        container.appendChild(progressBar);

        // Create indicators
        this.indicators = this.sections.map((section, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';
            indicator.dataset.index = index;
            indicator.dataset.section = section.id;
            indicator.setAttribute('role', 'button');
            indicator.setAttribute('tabindex', '0');
            indicator.setAttribute('aria-label', `Navigate to ${section.name}`);

            // Create tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'section-indicator-tooltip';
            tooltip.textContent = section.name;
            indicator.appendChild(tooltip);

            container.appendChild(indicator);
            return indicator;
        });
    }

    setupScrollDetection() {
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, falling back to scroll listener');
            this.setupFallbackScrollDetection();
            return;
        }

        const options = {
            root: null,
            rootMargin: `-${Math.round(window.innerHeight * this.options.offsetThreshold)}px 0px`,
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        this.observer = new IntersectionObserver((entries) => {
            if (this.isScrolling) return;

            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionIndex = this.sections.findIndex(
                        section => section.element === entry.target
                    );
                    if (sectionIndex !== -1 && sectionIndex !== this.currentActiveIndex) {
                        this.setActiveSection(sectionIndex);
                    }
                }
            });
        }, options);

        // Observe all sections
        this.sections.forEach(section => {
            this.observer.observe(section.element);
        });
    }

    setupFallbackScrollDetection() {
        let ticking = false;

        const updateActiveSection = () => {
            if (this.isScrolling) return;

            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;
            const threshold = windowHeight * this.options.offsetThreshold;

            let activeIndex = 0;

            for (let i = this.sections.length - 1; i >= 0; i--) {
                const section = this.sections[i];
                const rect = section.element.getBoundingClientRect();

                if (rect.top <= threshold) {
                    activeIndex = i;
                    break;
                }
            }

            if (activeIndex !== this.currentActiveIndex) {
                this.setActiveSection(activeIndex);
            }

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveSection);
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    setupEventListeners() {
        // Click events
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.scrollToSection(index);
            });

            // Keyboard support
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.scrollToSection(index);
                } else if (e.key === 'ArrowUp' && index > 0) {
                    e.preventDefault();
                    this.indicators[index - 1].focus();
                } else if (e.key === 'ArrowDown' && index < this.indicators.length - 1) {
                    e.preventDefault();
                    this.indicators[index + 1].focus();
                }
            });
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.updateProgressBar();
        }, { passive: true });
    }

    setActiveSection(index) {
        // Remove previous active states
        this.indicators.forEach(indicator => {
            indicator.classList.remove(this.options.activeClass);
        });

        // Set new active state
        if (this.indicators[index]) {
            this.indicators[index].classList.add(this.options.activeClass);
            this.currentActiveIndex = index;
            this.updateProgressBar();
        }
    }

    updateActiveSection() {
        // Initial active section detection
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const threshold = windowHeight * this.options.offsetThreshold;

        let activeIndex = 0;

        for (let i = this.sections.length - 1; i >= 0; i--) {
            const section = this.sections[i];
            if (section.element.offsetTop <= scrollTop + threshold) {
                activeIndex = i;
                break;
            }
        }

        this.setActiveSection(activeIndex);
    }

    updateProgressBar() {
        const progressBar = document.querySelector('.section-indicators-progress');
        if (!progressBar || this.sections.length <= 1) return;

        const progress = (this.currentActiveIndex / (this.sections.length - 1)) * 100;
        progressBar.style.height = `${progress}%`;
    }

    scrollToSection(index) {
        if (index < 0 || index >= this.sections.length) return;

        const targetSection = this.sections[index].element;
        const targetTop = targetSection.offsetTop;

        this.isScrolling = true;

        // Use GSAP if available, otherwise fallback to native smooth scroll
        if (window.gsap && window.gsap.to) {
            gsap.to(window, {
                duration: this.options.smoothScrollDuration / 1000,
                scrollTo: { y: targetTop, autoKill: false },
                ease: "power2.inOut",
                onComplete: () => {
                    this.isScrolling = false;
                }
            });
        } else {
            window.scrollTo({
                top: targetTop,
                behavior: 'smooth'
            });

            // Estimate scroll duration for fallback
            setTimeout(() => {
                this.isScrolling = false;
            }, this.options.smoothScrollDuration);
        }

        // Immediately update active section for better UX
        this.setActiveSection(index);
    }

    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }

        const container = document.querySelector(this.options.indicatorContainer);
        if (container) {
            container.remove();
        }
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if there are sections to navigate
    const potentialSections = document.querySelectorAll('section, .section, [data-section], header, main > div');

    if (potentialSections.length > 0) {
        window.sectionIndicators = new SectionIndicators();
    }
});

// Export for manual initialization
window.SectionIndicators = SectionIndicators;