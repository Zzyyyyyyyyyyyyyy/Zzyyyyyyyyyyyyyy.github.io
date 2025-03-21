// Navigation hover effects - 可以被导入使用
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced hover effects with GSAP
    const interactiveElements = document.querySelectorAll('a, button, .nav-btn, .slider-btn, .slider-dot');
    
    // Variable to track if mouse is over an interactive element
    let isOverInteractive = false;
    let activeInteractiveElement = null;
    
    // Add hover effect for interactive elements
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            // Ensure cursor is pointer when hovering over interactive elements
            el.style.cursor = 'pointer';
            
            // Add pulsing glow effect to the element
            const afterEl = document.createElement('div');
            afterEl.className = 'element-glow';
            afterEl.style.position = 'absolute';
            afterEl.style.top = '50%';
            afterEl.style.left = '50%';
            afterEl.style.transform = 'translate(-50%, -50%)';
            
            // Adjust size based on element type
            if (el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) {
                // For text links, make the glow area larger than the text
                afterEl.style.width = `calc(100% + 20px)`;
                afterEl.style.height = `calc(100% + 16px)`;
                afterEl.style.borderRadius = '8px';
            } else if (el.classList.contains('logo')) {
                // For logo - remove the glow background
                return;
            } else if (el.classList.contains('slider-dot')) {
                // For slider dots
                afterEl.style.width = '30px';
                afterEl.style.height = '30px';
                afterEl.style.borderRadius = '50%';
            } else if (el.classList.contains('nav-btn') || el.classList.contains('slider-btn')) {
                // For buttons
                afterEl.style.width = `calc(100% + 10px)`;
                afterEl.style.height = `calc(100% + 10px)`;
                afterEl.style.borderRadius = el.classList.contains('slider-btn') ? '50%' : '50px';
            } else {
                // Default
                afterEl.style.width = '100%';
                afterEl.style.height = '100%';
                afterEl.style.borderRadius = '4px';
            }
            
            afterEl.style.boxShadow = '0 0 15px 5px rgba(255, 62, 127, 0.3)';
            afterEl.style.zIndex = '-1';
            afterEl.style.pointerEvents = 'none';
            
            // Only add if it doesn't already have one
            if (!el.querySelector('.element-glow')) {
                el.style.position = 'relative';
                el.style.overflow = 'visible';
                el.appendChild(afterEl);
                
                // Animate the glow
                gsap.to(afterEl, {
                    boxShadow: '0 0 20px 8px rgba(255, 62, 127, 0.5)',
                    duration: 0.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
            
            // For text links, show the background
            if ((el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) || 
                el.classList.contains('nav-btn')) {
                el.style.setProperty('--link-bg-opacity', '1');
            }
        });
        
        el.addEventListener('mouseleave', () => {
            // Maintain pointer cursor even when leaving
            el.style.cursor = 'pointer';
            
            // Remove the glow effect
            const glow = el.querySelector('.element-glow');
            if (glow) {
                gsap.to(glow, {
                    boxShadow: '0 0 0 0 rgba(255, 62, 127, 0)',
                    duration: 0.3,
                    onComplete: () => {
                        glow.remove();
                    }
                });
            }
            
            // For text links, hide the background
            if ((el.tagName.toLowerCase() === 'a' && !el.classList.contains('logo')) || 
                el.classList.contains('nav-btn')) {
                el.style.setProperty('--link-bg-opacity', '0');
            }
        });
    });
}); 