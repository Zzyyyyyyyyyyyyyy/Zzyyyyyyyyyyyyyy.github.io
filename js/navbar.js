function createNavbar() {
    const navbarContainer = document.querySelector('.navbar-container');
    if (!navbarContainer) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const isHomePage = currentPage === '' || currentPage === '/' || currentPage === 'index.html';

    const nav = document.createElement('nav');
    nav.className = 'navbar';
    nav.innerHTML = `
        <a href="${isHomePage ? '#' : 'index.html'}" class="logo">
            <img src="Z_s_icon.png" alt="Logo">
        </a>
        <div class="nav-links">
            <a href="${isHomePage ? '#' : 'index.html'}">Home</a>
            <a href="About ME.html">About Me</a>
            <a href="works.html">Works</a>
            <a href="Contact.html">Contact</a>
        </div>
    `;
    navbarContainer.appendChild(nav);

    const logoElement = nav.querySelector('.logo');
    if (logoElement) {
        logoElement.style.cursor = 'pointer';
        logoElement.addEventListener('mouseenter', () => {
            logoElement.style.cursor = 'pointer';
        });
        logoElement.addEventListener('mousemove', () => {
            logoElement.style.cursor = 'pointer';
        });
    }

    function setActiveNavLink() {
        const navLinks = nav.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('active');
            if (currentPage.includes('About') && currentPage.includes('ME') && href.includes('About') && href.includes('ME')) {
                link.classList.add('active');
            } else if (currentPage.includes('Contact') && href.includes('Contact')) {
                link.classList.add('active');
            } else if (currentPage.includes('works') && href.includes('works')) {
                link.classList.add('active');
            } else if (isHomePage && (href === '#' || href === 'index.html')) {
                link.classList.add('active');
            } else if (href === currentPage) {
                link.classList.add('active');
            }
        });
        if (isHomePage) {
            const homeLink = nav.querySelector('.nav-links a[href="#"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }
    setActiveNavLink();

    function scrollToTop() {
        if (typeof gsap !== 'undefined' && gsap.to) {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: 0,
                ease: 'power2.inOut'
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    const navLinks = nav.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' || href === currentPage) {
            link.addEventListener('click', e => {
                e.preventDefault();
                scrollToTop();
            });
        }
    });

    if (logoElement && (isHomePage || currentPage.includes('Contact'))) {
        logoElement.addEventListener('click', e => {
            e.preventDefault();
            scrollToTop();
        });
    }
}

window.createNavbar = createNavbar;
