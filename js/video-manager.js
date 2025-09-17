(() => {
  const CONFIG_URL = 'js/video-config.json';

  function joinUrl(base, path) {
    if (!path) return base;
    if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;
    if (base.endsWith('/') && path.startsWith('/')) return base + path.slice(1);
    if (!base.endsWith('/') && !path.startsWith('/')) return base + '/' + path;
    return base + path;
  }

  function createVideoEl(options) {
    const { sources = [], poster, preload = 'auto', fit = 'cover', crossorigin = 'anonymous' } = options || {};
    const video = document.createElement('video');
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.preload = preload;
    video.crossOrigin = crossorigin;
    video.className = 'video-el';
    if (poster) video.setAttribute('poster', poster);

    // No controls; ensure PiP disabled where supported
    try { video.disablePictureInPicture = true; } catch (_) {}

    // Add sources
    sources.forEach(s => {
      if (!s || !s.src) return;
      const sourceEl = document.createElement('source');
      sourceEl.src = s.src;
      if (s.type) sourceEl.type = s.type;
      video.appendChild(sourceEl);
    });

    // Object-fit via style for broad support
    video.style.width = '100%';
    video.style.height = '100%';
    video.style.objectFit = fit === 'contain' ? 'contain' : 'cover';
    video.style.pointerEvents = 'none';

    // Kick off playback (some browsers need an explicit play())
    setTimeout(() => {
      const p = video.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {});
      }
    }, 0);

    return video;
  }

  function applyToContainer(container, entry, base) {
    if (!entry) return;

    const cfg = {
      sources: (entry.sources || []).map(s => ({
        src: joinUrl(base, s.src),
        type: s.type
      })),
      poster: entry.poster ? joinUrl(base, entry.poster) : undefined,
      preload: entry.preload || (container.classList.contains('video-bg') ? 'auto' : 'metadata'),
      fit: entry.fit || (container.dataset.videoFit || 'cover')
    };

    const isBg = container.classList.contains('video-bg');
    if (isBg) {
      container.style.position = 'fixed';
      container.style.inset = '0';
      container.style.zIndex = '-1';
      container.style.overflow = 'hidden';
      container.style.pointerEvents = 'none';
    } else {
      const style = container.style;
      if (!getComputedStyle(container).position || getComputedStyle(container).position === 'static') {
        style.position = 'relative';
      }
      style.overflow = style.overflow || 'hidden';
    }

    const wrapper = document.createElement('div');
    wrapper.className = 'video-wrapper';
    wrapper.style.position = 'absolute';
    wrapper.style.inset = '0';
    wrapper.style.zIndex = isBg ? '-1' : (container.dataset.videoZ || '0');
    container.prepend(wrapper);

    const video = createVideoEl(cfg);
    wrapper.appendChild(video);

    // Basic error handling: remove video if all sources fail
    video.addEventListener('error', () => {
      // Fallback to poster if present
      if (cfg.poster) {
        wrapper.innerHTML = '';
        wrapper.style.background = `center/cover no-repeat url("${cfg.poster}")`;
      }
    }, { once: true });
  }

  async function init() {
    let conf;
    try {
      const res = await fetch(CONFIG_URL, { cache: 'no-cache' });
      conf = await res.json();
    } catch (e) {
      console.warn('[video-manager] failed to load config', e);
      return; // graceful no-op
    }

    const base = (conf && conf.base) || '';
    const videos = (conf && conf.videos) || {};
    const nodes = document.querySelectorAll('[data-video-key]');
    nodes.forEach(node => {
      const key = node.getAttribute('data-video-key');
      const entry = videos[key];
      if (!entry) return;
      applyToContainer(node, entry, base);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

