class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1e293b;
          color: #94a3b8;
          padding: 3rem 1.5rem;
          text-align: center;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .social-links a {
          color: #e2e8f0;
          text-decoration: none;
          transition: color 0.2s;
        }
        .social-links a:hover {
          color: #6366f1;
        }
        .copyright {
          font-size: 0.875rem;
        }
      </style>
      <footer>
        <div class="social-links">
          <a href="https://www.linkedin.com/in/ihsbramn/" target="_blank">LinkedIn</a>
          <a href="mailto:ihsbramn.work@gmail.com">Email</a>
          <a href="https://github.com/ihsbramn" target="_blank">GitHub</a>
        </div>
        <p class="copyright">© 2025 Ikhsan Abdurachman. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);