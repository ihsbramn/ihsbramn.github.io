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
          transition: padding 0.3s ease;
        }
        .logo {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
          text-decoration: none;
          letter-spacing: -0.05em;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.4s ease;
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
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.9rem;
          text-transform: lowercase;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.4s ease;
        }
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: #ffffff;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.4s ease;
        }
        .nav-links a:hover::after {
          width: 100%;
        }

        /* Light Background Context - Black Text */
        :host(.light-background) .logo,
        :host(.light-background) .nav-links a {
          color: var(--nav-color-on-light, #000000);
        }
        :host(.light-background) .nav-links a::after {
          background-color: var(--nav-color-on-light, #000000);
        }
        :host(.light-background) .menu-btn span {
          background: var(--nav-color-on-light, #000000);
        }
        :host(.light-background) .theme-toggle {
            color: var(--nav-color-on-light, #000000);
        }
        
        /* Mobile Menu Button */
        .menu-btn {
          display: none;
          background: none;
          border: none;
          color: inherit;
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1001;
        }
        .menu-btn span {
          display: block;
          width: 25px;
          height: 2px;
          background: #ffffff;
          margin: 5px 0;
          transition: 0.3s, background 0.4s ease;
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

        /* Theme Toggle */
        .theme-toggle {
            background: none;
            border: none;
            cursor: pointer;
            color: #ffffff;
            padding: 0.5rem;
            margin-left: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.3s ease;
        }



        .theme-toggle svg {
            width: 20px;
            height: 20px;
            fill: none;
            stroke: currentColor;
            stroke-width: 2;
            stroke-linecap: round;
            stroke-linejoin: round;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.3s ease;
        }

        .theme-toggle:hover svg {
            transform: rotate(180deg);
        }

        @media (max-width: 768px) {
            .theme-toggle {
                position: absolute;
                right: 4.5rem; /* Space between toggle and hamburger */
                top: 50%;
                transform: translateY(-50%); /* Center vertically */
                margin: 0;
            }
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

        <button class="theme-toggle" aria-label="Toggle Dark Mode">
            <!-- Sun Icon (shown by default logic later) -->
            <svg class="sun-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <!-- Moon Icon (hidden initially, managed by JS) -->
            <svg class="moon-icon" viewBox="0 0 24 24" style="display:none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        </button>

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

    // Theme Toggle Logic
    const themeToggle = this.shadowRoot.querySelector('.theme-toggle');
    const sunIcon = this.shadowRoot.querySelector('.sun-icon');
    const moonIcon = this.shadowRoot.querySelector('.moon-icon');

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');

    // Function to set theme with smooth animations
    const setTheme = (isDark) => {
      // Add transition class to document for smooth theme change
      document.documentElement.style.setProperty('color-scheme', isDark ? 'dark' : 'light');

      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');

        // Animate icon transition
        moonIcon.style.opacity = '0';
        moonIcon.style.transform = 'scale(0.5) rotate(-90deg)';

        setTimeout(() => {
          sunIcon.style.display = 'block';
          moonIcon.style.display = 'none';
          requestAnimationFrame(() => {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'scale(1) rotate(0deg)';
          });
        }, 150);
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');

        // Animate icon transition
        sunIcon.style.opacity = '0';
        sunIcon.style.transform = 'scale(0.5) rotate(90deg)';

        setTimeout(() => {
          moonIcon.style.display = 'block';
          sunIcon.style.display = 'none';
          requestAnimationFrame(() => {
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'scale(1) rotate(0deg)';
          });
        }, 150);
      }
    };

    // Initial Load - Default to light mode
    setTheme(savedTheme === 'dark');

    // Listen to click
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      setTheme(currentTheme !== 'dark');
    });
  }
}
customElements.define('custom-navbar', CustomNavbar);