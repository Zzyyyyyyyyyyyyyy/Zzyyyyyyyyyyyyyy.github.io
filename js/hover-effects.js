/**
 * Initializes custom hover effects including interactive element glow,
 * custom cursor follow and ripple trail. Requires GSAP.
 */
export function initHoverEffects() {
  const interactiveElements = document.querySelectorAll(
    'a, button, .nav-btn, .slider-btn, .slider-dot'
  );

  // Glow effect for interactive elements
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.cursor = 'pointer';

      const afterEl = document.createElement('div');
      afterEl.className = 'element-glow';
      afterEl.style.position = 'absolute';
      afterEl.style.top = '50%';
      afterEl.style.left = '50%';
      afterEl.style.transform = 'translate(-50%, -50%)';

      if (el.classList.contains('slider-dot')) {
        afterEl.style.width = '30px';
        afterEl.style.height = '30px';
        afterEl.style.borderRadius = '50%';
      } else if (el.classList.contains('nav-btn') || el.classList.contains('slider-btn')) {
        afterEl.style.width = `calc(100% + 10px)`;
        afterEl.style.height = `calc(100% + 10px)`;
        afterEl.style.borderRadius = el.classList.contains('slider-btn') ? '50%' : '50px';
      } else {
        afterEl.style.width = '100%';
        afterEl.style.height = '100%';
        afterEl.style.borderRadius = '8px';
      }

      afterEl.style.boxShadow = '0 0 15px 5px rgba(255, 62, 127, 0.3)';
      afterEl.style.zIndex = '-1';
      afterEl.style.pointerEvents = 'none';

      if (!el.querySelector('.element-glow')) {
        el.style.position = 'relative';
        el.style.overflow = 'visible';
        el.appendChild(afterEl);
        gsap.to(afterEl, {
          boxShadow: '0 0 20px 8px rgba(255, 62, 127, 0.5)',
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }
    });

    el.addEventListener('mouseleave', () => {
      el.style.cursor = 'pointer';
      const glow = el.querySelector('.element-glow');
      if (glow) {
        gsap.to(glow, {
          boxShadow: '0 0 0 0 rgba(255, 62, 127, 0)',
          duration: 0.3,
          onComplete: () => glow.remove()
        });
      }
    });
  });

  const cursorContainer = document.querySelector('.cursor-container');
  const cursorDot = document.getElementById('cursor-dot');
  const useCustomCursor =
    cursorContainer &&
    cursorDot &&
    getComputedStyle(cursorContainer).display !== 'none' &&
    !('ontouchstart' in window);

  if (!useCustomCursor) return;

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let isOverInteractive = false;

  gsap.to(cursorDot, {
    scale: 1.2,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

  gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: () => {
      const deltaX = mouseX - cursorX;
      const deltaY = mouseY - cursorY;
      cursorX += deltaX * 0.15;
      cursorY += deltaY * 0.15;
      gsap.set(cursorDot, { left: cursorX, top: cursorY, force3D: true });
    }
  });

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isOverInteractive) {
      const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);
      if (speed > 2) createRipple(mouseX, mouseY);
    }
  });

  document.addEventListener('mousedown', () => {
    if (!isOverInteractive) {
      gsap.to(cursorDot, { duration: 0.15, scale: 0.8, ease: 'power2.out' });
    }
  });

  document.addEventListener('mouseup', () => {
    if (!isOverInteractive) {
      gsap.to(cursorDot, { duration: 0.15, scale: 1, ease: 'power2.out' });
    }
  });

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      isOverInteractive = true;
      const rect = el.getBoundingClientRect();
      const elementCenterX = rect.left + rect.width / 2;
      const elementCenterY = rect.top + rect.height / 2;

      gsap.to(cursorDot, {
        duration: 0.4,
        left: elementCenterX,
        top: elementCenterY,
        width: 0,
        height: 0,
        opacity: 0,
        scale: 0.2,
        ease: 'power3.in',
        onComplete: () => gsap.set(cursorDot, { opacity: 0, scale: 0 })
      });

      const existingRipples = document.querySelectorAll('.cursor-trail');
      existingRipples.forEach(ripple => {
        const rippleRect = ripple.getBoundingClientRect();
        const rippleX = rippleRect.left + rippleRect.width / 2;
        const rippleY = rippleRect.top + rippleRect.height / 2;
        gsap.to(ripple, {
          duration: 0.3,
          left: elementCenterX,
          top: elementCenterY,
          scale: 0,
          opacity: 0,
          ease: 'power2.in',
          onComplete: () => ripple.remove()
        });
      });
    });

    el.addEventListener('mouseleave', () => {
      isOverInteractive = false;
      gsap.fromTo(
        cursorDot,
        { opacity: 0, scale: 0.2, width: 0, height: 0 },
        {
          duration: 0.4,
          opacity: 1,
          scale: 1,
          width: 60,
          height: 60,
          backgroundColor: 'rgba(255, 62, 127, 0.25)',
          filter: 'blur(10px)',
          ease: 'back.out(1.7)'
        }
      );
    });
  });

  function createRipple(x, y) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    cursorContainer.appendChild(trail);

    const size = gsap.utils.random(60, 80);
    const duration = gsap.utils.random(0.8, 1.2);
    const hue = gsap.utils.random(330, 350);
    const opacity = gsap.utils.random(0.4, 0.6);

    gsap.set(trail, {
      left: x,
      top: y,
      width: size,
      height: size,
      background: `radial-gradient(circle, hsla(${hue}, 90%, 60%, ${opacity}) 0%, hsla(${hue}, 90%, 60%, 0) 70%)`
    });

    gsap.to(trail, {
      duration,
      scale: 2.5,
      opacity: 0,
      ease: 'power2.out',
      onComplete: () => trail.remove()
    });
  }
}

