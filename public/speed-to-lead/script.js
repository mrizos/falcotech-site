document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu ---
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
      toggle.classList.toggle('active');
    });
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }

  // --- Smooth Scroll ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const id = this.getAttribute('href');
      if (id === '#') return;
      const el = document.querySelector(id);
      if (el) {
        const offset = document.querySelector('.nav').offsetHeight;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
      }
    });
  });

  // --- Nav shadow on scroll ---
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20 ? '0 1px 8px rgba(0,0,0,0.06)' : 'none';
  }, { passive: true });

  // --- Scroll Fade-in ---
  const targets = document.querySelectorAll(
    '.section, .flow-card, .step-card, .who-card, .why-card, .price-card, .pilot-block, .compare-table, .hero .container'
  );
  targets.forEach(el => el.classList.add('fade-up'));

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  targets.forEach(el => observer.observe(el));

  // --- Form ---
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      if (!name || !email) { alert('Παρακαλώ συμπληρώστε όνομα και email.'); return; }

      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerText;
      btn.innerText = 'Αποστολή...';
      btn.disabled = true;

      const formData = new FormData(form);

      fetch('https://formspree.io/f/xbdppbkn', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          btn.innerText = 'Στάλθηκε ✓';
          btn.style.background = '#16a34a';
          btn.style.borderColor = '#16a34a';
          setTimeout(() => {
            form.reset();
            btn.innerText = orig;
            btn.style.background = '';
            btn.style.borderColor = '';
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error('Form submission failed');
        }
      })
      .catch(() => {
        btn.innerText = orig;
        btn.disabled = false;
        alert('Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε email στο info@falcotech.gr');
      });
    });
  }
});
