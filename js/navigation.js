function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    link.classList.remove('active');

    if (
      href === currentPage ||
      (href === '#' && (currentPage === '' || currentPage === '/' || currentPage === 'index.html')) ||
      (currentPage.includes('About') && href.includes('About')) ||
      (currentPage.includes('works') && href.includes('works')) ||
      (currentPage.includes('Contact') && href.includes('Contact')) ||
      (currentPage.includes('thanks') && href.includes('Contact'))
    ) {
      link.classList.add('active');
    }
  });
}

function scrollToTop() {
  if (typeof gsap !== 'undefined' && gsap.to) {
    gsap.to(window, { duration: 1.5, scrollTo: 0, ease: 'power2.inOut' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();

  const navLinks = document.querySelectorAll('.nav-links a');
  const logo = document.querySelector('.logo');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      const currentPage = window.location.pathname.split('/').pop() || 'index.html';
      if (
        href === currentPage ||
        (href === '#' && (currentPage === '' || currentPage === '/' || currentPage === 'index.html'))
      ) {
        e.preventDefault();
        scrollToTop();
      }
    });
  });

  if (logo) {
    logo.addEventListener('click', e => {
      e.preventDefault();
      scrollToTop();
    });
  }
});
