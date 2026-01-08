class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
        }
        nav {
          padding: 2rem 4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          mix-blend-mode: difference;
          transition: padding 0.3s ease;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.05em;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          display: inline-block;
          z-index: 1001;
        }
        .logo:hover {
          transform: scale(1.1) rotate(-2deg);
        }
        .nav-links {
          display: flex;
          gap: 3rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .nav-links a {
          font-family: 'Inter', sans-serif;
          color: white;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: lowercase;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: white;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nav-links a:hover::after {
          width: 100%;
        }
        
        /* Mobile Menu Button */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }
        .menu-btn span {
          display: block;
          width: 25px;
          height: 2px;
          background: white;
          margin: 5px 0;
          transition: 0.3s;
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #000;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 2rem;
          transform: translateY(-100%);
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 1000;
        }
        .mobile-menu.active {
          transform: translateY(0);
        }
        .mobile-menu a {
          color: white;
          font-size: 2.5rem;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          font-weight: 700;
          text-transform: lowercase;
          opacity: 0;
          transform: translateY(20px);
          transition: 0.4s;
        }
        .mobile-menu.active a {
          opacity: 1;
          transform: translateY(0);
        }
        .mobile-menu a:nth-child(1) { transition-delay: 0.2s; }
        .mobile-menu a:nth-child(2) { transition-delay: 0.3s; }
        .mobile-menu a:nth-child(3) { transition-delay: 0.4s; }
        .mobile-menu a:nth-child(4) { transition-delay: 0.5s; }
        .mobile-menu a:nth-child(5) { transition-delay: 0.6s; }
        .mobile-menu a:nth-child(6) { transition-delay: 0.7s; }

        @media (max-width: 768px) {
          nav { padding: 1.5rem 2rem; }
          .nav-links { display: none; }
          .menu-btn { display: block; }
          
          /* Hamburger Animation */
          .menu-btn.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 5px); }
          .menu-btn.active span:nth-child(2) { opacity: 0; }
          .menu-btn.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -5px); }
        }
      </style>
      <nav>
        <a href="/" class="logo">IKHSAN.</a>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Works</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#certifications">Certified</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button class="menu-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div class="mobile-menu">
        <a href="#about">about</a>
        <a href="#experience">works</a>
        <a href="#education">education</a>
        <a href="#skills">skills</a>
        <a href="#certifications">certified</a>
        <a href="#contact">contact</a>
      </div>
    `;

    const menuBtn = this.shadowRoot.querySelector('.menu-btn');
    const mobileMenu = this.shadowRoot.querySelector('.mobile-menu');
    const links = this.shadowRoot.querySelectorAll('.mobile-menu a');

    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}
customElements.define('custom-navbar', CustomNavbar);