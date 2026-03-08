/* =============================================
   VISIT QATAR — script.js
   Minimal JS for nav, dropdowns, accordion, tabs
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar scroll shadow ---- */
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    const btn = document.getElementById('back-to-top');
    if (btn) btn.classList.toggle('show', window.scrollY > 400);
  });

  /* ---- Mobile hamburger toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const menu   = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      menu.classList.toggle('open');
    });
  }

  /* ---- Mobile dropdown toggles ---- */
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const drop = item.querySelector('.dropdown');
    if (link && drop && window.innerWidth <= 768) {
      link.addEventListener('click', e => {
        e.preventDefault();
        item.classList.toggle('open');
      });
    }
  });

  /* ---- Re-bind on resize ---- */
  window.addEventListener('resize', () => {
    navItems.forEach(item => {
      const link = item.querySelector('.nav-link');
      const drop = item.querySelector('.dropdown');
      if (link && drop) {
        const clone = link.cloneNode(true);
        link.parentNode.replaceChild(clone, link);
        if (window.innerWidth <= 768) {
          clone.addEventListener('click', e => {
            e.preventDefault();
            item.classList.toggle('open');
          });
        }
      }
    });
  });

  /* ---- Back to top ---- */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---- FAQ Accordion ---- */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---- Tabs ---- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.tab-group');
      const target = btn.dataset.tab;
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = group.querySelector(`[data-panel="${target}"]`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .dropdown a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  /* ---- Simple form validation ---- */
  const authForms = document.querySelectorAll('.auth-form');
  authForms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const inputs = form.querySelectorAll('input[required]');
      let valid = true;
      inputs.forEach(inp => {
        if (!inp.value.trim()) {
          inp.style.borderColor = 'var(--secondary)';
          valid = false;
        } else {
          inp.style.borderColor = '';
        }
      });
      if (valid) {
        const btn = form.querySelector('.auth-submit');
        if (btn) {
          btn.textContent = 'Please wait...';
          setTimeout(() => {
            btn.textContent = btn.dataset.success || 'Success!';
            btn.style.background = '#2a8a5e';
          }, 1000);
        }
      }
    });
  });

});
