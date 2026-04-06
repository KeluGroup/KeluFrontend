/* =====================
   THEME TOGGLE
   ===================== */
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;
  let theme    = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  function syncIcon() {
    toggle.innerHTML = theme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
  }

  syncIcon();
  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    syncIcon();
  });
})();

/* =====================
   HAMBURGER / MOBILE DRAWER
   ===================== */
(function () {
  const btn    = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');

  btn.addEventListener('click', () => {
    const open = drawer.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* =====================
   ACTIVE SECTION TRACKING
   ===================== */
(function () {
  const sectionIds = ['home', 'about', 'services', 'contact'];
  const navLinks   = document.querySelectorAll('.navbar-nav a');
  const mobLinks   = document.querySelectorAll('.mobile-drawer a');
  const dots       = document.querySelectorAll('.side-dot');

  function activate(id) {
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    mobLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
    dots.forEach(d => d.classList.toggle('active', d.dataset.section === id));
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) activate(e.target.id); });
  }, { threshold: 0.45 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const el = document.getElementById(dot.dataset.section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();

/* =====================
   NAVBAR SCROLL SHADOW
   ===================== */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();