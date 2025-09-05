export function initHoverEffects() {
    // Custom cursor and ripple effects
    const cursorContainer = document.querySelector('.cursor-container');
    const cursorDot = document.getElementById('cursor-dot');

    if (cursorContainer && cursorDot && typeof gsap !== 'undefined') {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            gsap.to(cursorDot, {
                left: mouseX,
                top: mouseY,
                duration: 0.15,
                overwrite: true
            });
            createRipple(mouseX, mouseY);
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
                duration: duration,
                scale: 2.5,
                opacity: 0,
                ease: 'power2.out',
                onComplete: () => trail.remove()
            });
        }
    }

    // Interactive element glow
    const interactiveElements = document.querySelectorAll('a, button, .nav-btn, .slider-btn, .slider-dot');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.cursor = 'pointer';
            const afterEl = document.createElement('div');
            afterEl.className = 'element-glow';
            afterEl.style.position = 'absolute';
            afterEl.style.top = '50%';
            afterEl.style.left = '50%';
            afterEl.style.transform = 'translate(-50%, -50%)';

            if (el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) {
                afterEl.style.width = `calc(100% + 20px)`;
                afterEl.style.height = `calc(100% + 16px)`;
                afterEl.style.borderRadius = '8px';
            } else if (el.classList.contains('logo')) {
                return;
            } else if (el.classList.contains('slider-dot')) {
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
                afterEl.style.borderRadius = '4px';
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

            if ((el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) || el.classList.contains('nav-btn')) {
                el.style.setProperty('--link-bg-opacity', '1');
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
            if ((el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) || el.classList.contains('nav-btn')) {
                el.style.setProperty('--link-bg-opacity', '0');
            }
        });
    });
}
