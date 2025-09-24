/**
 * Build Configuration
 * Development and production build settings for static site optimization
 */

const path = require('path');
const fs = require('fs');

const config = {
  // Project paths
  paths: {
    src: './',
    dist: './dist',
    assets: './assets',
    styles: './styles',
    js: './js',
    images: './images',
    sources: './Sources'
  },

  // Development server settings
  dev: {
    port: 8080,
    host: 'localhost',
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true
  },

  // Production build settings
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true,
    target: 'es2018',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap'],
          utils: ['js/utils/dom-utils.js'],
          components: [
            'js/components/navigation.js',
            'js/components/animations.js'
          ]
        }
      }
    }
  },

  // Asset optimization
  assets: {
    images: {
      formats: ['webp', 'avif', 'png', 'jpg'],
      quality: {
        webp: 80,
        avif: 65,
        png: 85,
        jpg: 80
      },
      sizes: [320, 640, 768, 1024, 1280, 1920],
      lazy: true
    },
    fonts: {
      preload: ['SpaceGrotesk-VariableFont_wght.ttf'],
      display: 'swap'
    },
    videos: {
      formats: ['webm', 'mp4'],
      quality: {
        webm: 'medium',
        mp4: 'medium'
      },
      lazy: true
    }
  },

  // CSS optimization
  css: {
    purge: {
      content: ['./**/*.html', './js/**/*.js'],
      safelist: [
        'active',
        'show',
        'animate-in',
        'animate-out',
        'scrolled',
        'loading',
        /^fa-/,
        /^fab-/,
        /^fas-/
      ]
    },
    autoprefixer: {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'Firefox ESR',
        'not dead'
      ]
    },
    cssnano: {
      preset: ['default', {
        discardComments: { removeAll: true },
        normalizeWhitespace: true,
        mergeLonghand: true,
        mergeRules: true
      }]
    }
  },

  // JavaScript optimization
  js: {
    minify: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    babel: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: [
              '> 1%',
              'last 2 versions',
              'Firefox ESR',
              'not dead'
            ]
          }
        }]
      ]
    }
  },

  // HTML optimization
  html: {
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    }
  },

  // Performance optimization
  performance: {
    budgets: [
      {
        type: 'initial',
        maximumWarning: '500kb',
        maximumError: '1mb'
      },
      {
        type: 'anyComponentStyle',
        maximumWarning: '50kb',
        maximumError: '100kb'
      }
    ],
    hints: 'warning',
    maxAssetSize: 1000000,
    maxEntrypointSize: 1000000
  },

  // PWA configuration
  pwa: {
    name: "Z's Portfolio",
    shortName: 'Z Portfolio',
    description: 'Zhengyuan Zhao - Interaction Designer Portfolio',
    themeColor: '#ff3e7f',
    backgroundColor: '#0D0C0E',
    display: 'standalone',
    orientation: 'portrait-primary',
    scope: '/',
    startUrl: '/',
    icons: [
      {
        src: 'icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png'
      },
      {
        src: 'icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png'
      },
      {
        src: 'icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png'
      },
      {
        src: 'icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png'
      },
      {
        src: 'icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png'
      },
      {
        src: 'icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: 'icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png'
      },
      {
        src: 'icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },

  // SEO optimization
  seo: {
    sitemap: {
      hostname: 'https://zzyyyyyyyyyyyyyy.github.io',
      urls: [
        { url: '/', changefreq: 'weekly', priority: 1.0 },
        { url: '/About%20ME.html', changefreq: 'monthly', priority: 0.8 },
        { url: '/works.html', changefreq: 'weekly', priority: 0.9 },
        { url: '/Contact.html', changefreq: 'monthly', priority: 0.7 }
      ]
    },
    robots: {
      userAgent: '*',
      allow: '/',
      sitemap: 'https://zzyyyyyyyyyyyyyy.github.io/sitemap.xml'
    }
  },

  // Analytics and monitoring
  analytics: {
    googleAnalytics: {
      id: process.env.GA_TRACKING_ID || '',
      anonymizeIp: true,
      respectDNT: true
    },
    webVitals: {
      enabled: true,
      debug: process.env.NODE_ENV === 'development'
    }
  },

  // Environment variables
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    BUILD_TIME: new Date().toISOString(),
    VERSION: require('./package.json').version || '1.0.0'
  }
};

// Helper functions
const utils = {
  /**
   * Check if running in development mode
   */
  isDev() {
    return config.env.NODE_ENV === 'development';
  },

  /**
   * Check if running in production mode
   */
  isProd() {
    return config.env.NODE_ENV === 'production';
  },

  /**
   * Get absolute path
   */
  resolve(relativePath) {
    return path.resolve(__dirname, relativePath);
  },

  /**
   * Check if file exists
   */
  fileExists(filePath) {
    return fs.existsSync(this.resolve(filePath));
  },

  /**
   * Create directory if it doesn't exist
   */
  ensureDir(dirPath) {
    const fullPath = this.resolve(dirPath);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    return fullPath;
  },

  /**
   * Get file size in bytes
   */
  getFileSize(filePath) {
    try {
      const stats = fs.statSync(this.resolve(filePath));
      return stats.size;
    } catch (err) {
      return 0;
    }
  },

  /**
   * Format file size for display
   */
  formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }
};

module.exports = {
  config,
  utils
};