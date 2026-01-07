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
        .nav-links a:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        @media (max-width: 768px) {
          nav { padding: 1.5rem 2rem; }
          .nav-links { display: none; }
        }
      </style>
      <nav>
        <a href="/" class="logo">IKHSAN.</a>
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Works</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);