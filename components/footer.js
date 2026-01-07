class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #000000;
          color: #ffffff;
          padding: 10rem 4rem 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .footer-name {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(5rem, 25vw, 25rem);
          font-weight: 800;
          line-height: 0.8;
          text-transform: uppercase;
          letter-spacing: -0.05em;
          margin-bottom: 4rem;
          opacity: 0.1;
          user-select: none;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease, color 0.8s ease;
        }
        footer:hover .footer-name {
          opacity: 0.15;
          transform: translateY(-20px);
          color: var(--accent, #4f46e5);
        }
        .footer-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          z-index: 1;
        }
        .social-links {
          display: flex;
          gap: 2rem;
        }
        .social-links a {
          color: #ffffff;
          text-decoration: none;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          text-transform: lowercase;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        .social-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background-color: white;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .social-links a:hover::after {
          width: 100%;
        }
        .social-links a:hover {
          color: rgba(255, 255, 255, 0.8);
        }
        .copyright {
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          opacity: 0.5;
        }
        @media (max-width: 768px) {
          footer { padding: 6rem 2rem 2rem; }
          .footer-content { flex-direction: column; align-items: center; gap: 2rem; text-align: center; }
        }
      </style>
      <footer>
        <div class="footer-name">IKHSAN</div>
        <div class="footer-content">
          <div class="social-links">
            <a href="https://www.linkedin.com/in/ihsbramn/" target="_blank">linkedin</a>
            <a href="mailto:ihsbramn.work@gmail.com">email</a>
            <a href="https://github.com/ihsbramn" target="_blank">github</a>
          </div>
          <p class="copyright">© 2025 Ikhsan Abdurachman</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);