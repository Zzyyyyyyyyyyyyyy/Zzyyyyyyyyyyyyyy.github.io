function createNavbar() {
  const navbarContainer = document.createElement('div');
  navbarContainer.className = 'navbar-container';

  const currentPage = window.location.pathname.split('/').pop();
  const isHome = !currentPage || currentPage === '' || currentPage === 'index.html';
  const homeHref = isHome ? '#' : 'index.html';

  navbarContainer.innerHTML = `
    <nav class="navbar">
      <a href="${homeHref}" class="logo">
        <img src="Z_s_icon.png" alt="Logo">
      </a>
      <div class="nav-links">
        <a href="${homeHref}">Home</a>
        <a href="About ME.html">About Me</a>
        <a href="works.html">Works</a>
        <a href="Contact.html">Contact</a>
      </div>
    </nav>
  `;

  const cursorContainer = document.querySelector('.cursor-container');
  if (cursorContainer) {
    cursorContainer.insertAdjacentElement('afterend', navbarContainer);
  } else {
    document.body.prepend(navbarContainer);
  }
}

