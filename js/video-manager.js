/**
 * Enhanced Video Manager
 * Optimized video loading and management system with performance improvements
 */

(() => {
  'use strict';

  const CONFIG_URL = 'js/video-config.json';
  const SUPPORTED_FORMATS = ['webm', 'mp4', 'ogg'];

  // Performance monitoring
  const perfMetrics = {
    videosLoaded: 0,
    videosFailed: 0,
    loadTime: 0
  };

  // Video instances cache
  const videoInstances = new Map();
  const loadedConfigs = new Map();

  /**
   * Utilities for URL handling
   */
  const UrlUtils = {
    join(base, path) {
      if (!path) return base;
      if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
      if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1);
      if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
      return base + path;
    },

    getExtension(url) {
      return url.split('.').pop().toLowerCase().split('?')[0];
    }
  };

  /**
   * Device and capability detection
   */
  const DeviceUtils = {
    isMobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),

    supportsVideoFormat(format) {
      const video = document.createElement('video');
      const mimeTypes = {
        webm: 'video/webm; codecs="vp8, vorbis"',
        mp4: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        ogg: 'video/ogg; codecs="theora, vorbis"'
      };
      return video.canPlayType(mimeTypes[format] || '') !== '';
    },

    getBestVideoFormat(sources) {
      const supportedSources = sources.filter(source => {
        const ext = UrlUtils.getExtension(source.src);
        return this.supportsVideoFormat(ext);
      });

      // Prefer webm for better compression, then mp4
      const formatPriority = ['webm', 'mp4', 'ogg'];

      for (const format of formatPriority) {
        const source = supportedSources.find(s => UrlUtils.getExtension(s.src) === format);
        if (source) return [source];
      }

      return supportedSources;
    },

    shouldReduceMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    isIntersectionObserverSupported() {
      return 'IntersectionObserver' in window;
    }
  };

  /**
   * Optimized video element creation
   */
  function createOptimizedVideoEl(options) {
    const startTime = performance.now();
    const {
      sources = [],
      poster,
      preload = 'metadata',
      fit = 'cover',
      crossorigin = 'anonymous',
      lazy = false
    } = options || {};

    const video = document.createElement('video');

    // Essential attributes
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.className = 'video-el';
    video.preload = lazy ? 'none' : preload;
    video.crossOrigin = crossorigin;

    // Set attributes for mobile compatibility
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    // Disable picture-in-picture if supported
    try {
      video.disablePictureInPicture = true;
    } catch (_) {}

    // Optimize sources for device
    const optimizedSources = DeviceUtils.getBestVideoFormat(sources);

    optimizedSources.forEach(source => {
      if (!source || !source.src) return;
      const sourceEl = document.createElement('source');
      sourceEl.src = source.src;
      if (source.type) sourceEl.type = source.type;
      video.appendChild(sourceEl);
    });

    // Set poster if provided
    if (poster) {
      video.setAttribute('poster', poster);
    }

    // Apply styles for performance
    const styles = {
      width: '100%',
      height: '100%',
      objectFit: fit === 'contain' ? 'contain' : 'cover',
      pointerEvents: 'none',
      willChange: 'auto' // Avoid unnecessary compositing
    };

    Object.assign(video.style, styles);

    // Performance metrics
    video.addEventListener('loadstart', () => {
      perfMetrics.loadTime = performance.now() - startTime;
    }, { once: true });

    video.addEventListener('canplaythrough', () => {
      perfMetrics.videosLoaded++;
      video.style.willChange = 'auto';
    }, { once: true });

    video.addEventListener('error', () => {
      perfMetrics.videosFailed++;
      console.warn(`[VideoManager] Failed to load video:`, video.src);
    }, { once: true });

    return video;
  }

  /**
   * Lazy loading implementation
   */
  class LazyVideoLoader {
    constructor() {
      this.observer = null;
      this.pendingElements = new Set();
      this.init();
    }

    init() {
      if (!DeviceUtils.isIntersectionObserverSupported()) {
        // Fallback to immediate loading
        return;
      }

      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          rootMargin: '50px',
          threshold: 0.1
        }
      );
    }

    observe(element, videoConfig) {
      if (!this.observer) {
        // Immediate loading fallback
        this.loadVideo(element, videoConfig);
        return;
      }

      element._videoConfig = videoConfig;
      this.pendingElements.add(element);
      this.observer.observe(element);
    }

    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const config = element._videoConfig;

          if (config) {
            this.loadVideo(element, config);
            this.observer.unobserve(element);
            this.pendingElements.delete(element);
          }
        }
      });
    }

    loadVideo(element, config) {
      const video = createOptimizedVideoEl(config);
      const wrapper = element.querySelector('.video-wrapper');

      if (wrapper) {
        wrapper.appendChild(video);

        // Auto-play with error handling
        setTimeout(() => {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(error => {
              console.warn('[VideoManager] Autoplay prevented:', error);
            });
          }
        }, 100);
      }
    }

    destroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }
      this.pendingElements.clear();
    }
  }

  /**
   * Enhanced container setup
   */
  function setupVideoContainer(container, entry, base, lazyLoader) {
    if (!entry || !container) return;

    const videoId = container.dataset.videoKey;

    // Prevent duplicate processing
    if (videoInstances.has(videoId)) {
      return;
    }

    const config = {
      sources: (entry.sources || []).map(s => ({
        src: UrlUtils.join(base, s.src),
        type: s.type || `video/${UrlUtils.getExtension(s.src)}`
      })),
      poster: entry.poster ? UrlUtils.join(base, entry.poster) : undefined,
      preload: entry.preload || (container.classList.contains('video-bg') ? 'metadata' : 'none'),
      fit: entry.fit || container.dataset.videoFit || 'cover',
      lazy: entry.lazy !== false // Default to lazy loading
    };

    // Skip videos if reduced motion is preferred
    if (DeviceUtils.shouldReduceMotion() && !entry.static) {
      if (config.poster) {
        container.style.backgroundImage = `url("${config.poster}")`;
        container.style.backgroundSize = config.fit;
        container.style.backgroundPosition = 'center';
      }
      return;
    }

    const isBg = container.classList.contains('video-bg');

    // Setup container styles
    this.setupContainerStyles(container, isBg);

    // Create video wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.zIndex = isBg ? '-1' : (container.dataset.videoZ || '0');

    container.prepend(wrapper);

    // Store instance
    videoInstances.set(videoId, {
      container,
      wrapper,
      config,
      loaded: false
    });

    // Use lazy loading for better performance
    if (config.lazy && !isBg) {
      lazyLoader.observe(container, config);
    } else {
      // Load immediately for background videos or non-lazy videos
      const video = createOptimizedVideoEl(config);
      wrapper.appendChild(video);

      // Handle error with poster fallback
      video.addEventListener('error', () => {
        if (config.poster) {
          wrapper.style.background = `center/${config.fit} no-repeat url("${config.poster}")`;
        }
      }, { once: true });

      // Auto-play
      setTimeout(() => {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {});
        }
      }, 0);
    }
  }

  /**
   * Setup container styles with performance optimizations
   */
  function setupContainerStyles(container, isBg) {
    if (isBg) {
      Object.assign(container.style, {
        position: 'fixed',
        inset: '0',
        zIndex: '-1',
        overflow: 'hidden',
        pointerEvents: 'none'
      });
    } else {
      const computedStyle = getComputedStyle(container);
      if (!computedStyle.position || computedStyle.position === 'static') {
        container.style.position = 'relative';
      }
      container.style.overflow = container.style.overflow || 'hidden';
    }
  }

  /**
   * Configuration loader with caching
   */
  async function loadConfig(url) {
    if (loadedConfigs.has(url)) {
      return loadedConfigs.get(url);
    }

    try {
      const response = await fetch(url, {
        cache: 'default', // Use browser cache
        mode: 'cors'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const config = await response.json();
      loadedConfigs.set(url, config);
      return config;
    } catch (error) {
      console.warn('[VideoManager] Failed to load config:', error);
      return null;
    }
  }

  /**
   * Main initialization function
   */
  async function initializeVideoManager() {
    const startTime = performance.now();

    // Load configuration
    const config = await loadConfig(CONFIG_URL);
    if (!config) {
      console.warn('[VideoManager] No configuration loaded, skipping video setup');
      return;
    }

    const base = config.base || '';
    const videos = config.videos || {};

    // Initialize lazy loader
    const lazyLoader = new LazyVideoLoader();

    // Find all video containers
    const containers = document.querySelectorAll('[data-video-key]');

    if (containers.length === 0) {
      console.info('[VideoManager] No video containers found');
      return;
    }

    // Process each container
    containers.forEach(container => {
      const key = container.getAttribute('data-video-key');
      const entry = videos[key];

      if (!entry) {
        console.warn(`[VideoManager] No configuration found for video key: ${key}`);
        return;
      }

      setupVideoContainer(container, entry, base, lazyLoader);
    });

    // Log performance metrics
    const initTime = performance.now() - startTime;
    console.info(`[VideoManager] Initialized in ${initTime.toFixed(2)}ms, found ${containers.length} video containers`);

    // Cleanup function for page unload
    window.addEventListener('beforeunload', () => {
      lazyLoader.destroy();
      videoInstances.clear();
    });
  }

  /**
   * Public API
   */
  window.VideoManager = {
    init: initializeVideoManager,

    getMetrics() {
      return { ...perfMetrics };
    },

    getInstances() {
      return new Map(videoInstances);
    },

    pauseAll() {
      videoInstances.forEach(instance => {
        const video = instance.wrapper.querySelector('video');
        if (video) video.pause();
      });
    },

    playAll() {
      videoInstances.forEach(instance => {
        const video = instance.wrapper.querySelector('video');
        if (video) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {});
          }
        }
      });
    },

    reload() {
      loadedConfigs.clear();
      videoInstances.clear();
      return initializeVideoManager();
    }
  };

  // Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeVideoManager);
  } else {
    initializeVideoManager();
  }

})();

