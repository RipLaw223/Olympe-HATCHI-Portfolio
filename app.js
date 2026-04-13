(function () {

  /* ── THEME ── */
  function applyTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    document.body.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    var btn = document.getElementById('toggle-theme');
    if (btn) btn.textContent = t === 'dark' ? '☀' : '☾';
    if (window.__regenStars) window.__regenStars();
  }

  var saved = localStorage.getItem('theme') || 'dark';
  applyTheme(saved);

  var themeBtn = document.getElementById('toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      applyTheme(cur === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── BURGER ── */
  var burger = document.getElementById('burger');
  var nav    = document.getElementById('nav');

  function syncNav() {
    if (!burger || !nav) return;
    if (window.innerWidth <= 900) {
      nav.hidden = burger.getAttribute('aria-expanded') !== 'true';
    } else {
      nav.hidden = false;
    }
  }

  if (burger && nav) {
    syncNav();
    window.addEventListener('resize', syncNav);
    burger.addEventListener('click', function () {
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      burger.classList.toggle('is-open', !open);
      if (window.innerWidth <= 900) nav.hidden = open;
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        burger.setAttribute('aria-expanded', 'false');
        burger.classList.remove('is-open');
        if (window.innerWidth <= 900) nav.hidden = true;
      }
    });
  }

  /* ── HEADER TRANSPARENT ON SCROLL ── */
  var hdr = document.getElementById('hdr');
  function updateHeader() {
    if (!hdr) return;
    hdr.classList.toggle('scrolled', window.scrollY > 50);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* ── YEAR ── */
  var yr = document.getElementById('annee');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── CURSOR ── */
  var cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', function (e) {
      cursor.style.transform = 'translate(' + (e.clientX - 6) + 'px,' + (e.clientY - 6) + 'px)';
    });
    document.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('big'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('big'); });
    });
  }

  /* ── SCROLL REVEAL ── */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('vis'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal2, .stat, .skill-card, .proj-card').forEach(function (el) {
    io.observe(el);
  });

})();