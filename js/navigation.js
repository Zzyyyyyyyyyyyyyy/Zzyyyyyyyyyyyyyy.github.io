function scrollToTop(event) {
  if (event) event.preventDefault();
  if (window.gsap && window.gsap.to) {
    window.gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power2.inOut" });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function setActiveNavLink() {
  const currentPage = decodeURIComponent(window.location.pathname.split('/').pop().toLowerCase() || 'index.html');
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = decodeURIComponent(link.getAttribute('href')).toLowerCase();
    link.classList.remove('active');

    if ((currentPage === '' || currentPage === 'index.html') && (href === '#' || href === 'index.html')) {
      link.classList.add('active');
      link.addEventListener('click', scrollToTop);
    } else if (href === currentPage) {
      link.classList.add('active');
      link.addEventListener('click', scrollToTop);
    }
  });

  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', scrollToTop);
  }
}

document.addEventListener('DOMContentLoaded', setActiveNavLink);
