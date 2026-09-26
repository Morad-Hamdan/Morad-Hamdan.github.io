/* ══════════════════════════════════════════════════════════════
   Mor@D — Portfolio · script.js
   Loader · Typewriter · Nav · Reveal · Canvas · GitHub API
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const $  = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─────────── 1. Écran de chargement ─────────── */
  window.addEventListener('load', () => {
    const loader = $('#loader');
    if (loader) setTimeout(() => loader.classList.add('done'), 450);
  });
  // Sécurité : si 'load' tarde (polices distantes), on masque quand même.
  setTimeout(() => $('#loader')?.classList.add('done'), 2500);

  /* ─────────── 2. Année courante ─────────── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─────────── 3. Typewriter ─────────── */
  const roles = [
    'Développeur logiciel',
    'Architecte d’applications web',
    'Passionné de Python',
    'Automatisation & Data',
    'PHP · Laravel · FastAPI'
  ];
  const tw = $('#typewriter');

  if (tw) {
    if (reduced) {
      tw.textContent = roles[0];
    } else {
      let r = 0, i = 0, deleting = false;

      (function tick() {
        const word = roles[r];
        i += deleting ? -1 : 1;
        tw.textContent = word.slice(0, i);

        let delay = deleting ? 42 : 82;

        if (!deleting && i === word.length) {
          delay = 1900; deleting = true;
        } else if (deleting && i === 0) {
          deleting = false; r = (r + 1) % roles.length; delay = 340;
        }
        setTimeout(tick, delay);
      })();
    }
  }

  /* ─────────── 4. Navigation : scroll + menu mobile ─────────── */
  const nav   = $('#nav');
  const burger = $('#burger');
  const navLinks = $('#navLinks');

  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    });
    $$('.nav-link', navLinks).forEach(a =>
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      })
    );
  }

  /* Lien actif selon la section visible */
  const sections = $$('section[id]');
  const links    = $$('.nav-link[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        links.forEach(l =>
          l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id)
        );
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ─────────── 5. Apparition au scroll ─────────── */
  const revealables = $$('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const d = parseInt(e.target.dataset.delay || '0', 10);
        setTimeout(() => e.target.classList.add('in-view'), d);
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach(el => io.observe(el));
  } else {
    revealables.forEach(el => el.classList.add('in-view'));
  }

  /* Barres de compétences animées */
  const bars = $$('.bar');
  if ('IntersectionObserver' in window) {
    const bo = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    bars.forEach(b => bo.observe(b));
  } else {
    bars.forEach(b => b.classList.add('in-view'));
  }

  /* ─────────── 6. Halo lumineux sur les cartes ─────────── */
  $$('.mini-card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    });
  });

  /* ─────────── 8. Données GitHub en direct ─────────── */
  const USER = 'Morad-Hamdan';
  const fmt = n => (n >= 1000 ? (n / 1000).toFixed(1).replace('.0', '') + 'k' : String(n));

  async function loadGitHub() {
    try {
      const [uRes, rRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USER}`,            { headers: { Accept: 'application/vnd.github+json' } }),
        fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, { headers: { Accept: 'application/vnd.github+json' } })
      ]);
      if (!uRes.ok || !rRes.ok) return;

      const user = await uRes.json();
      const repos = await rRes.json();

      // ── Stats par projet ──
      const byName = Object.fromEntries(repos.map(r => [r.name, r]));

      $$('[data-star-for]').forEach(el => {
        const repo = byName[el.dataset.starFor];
        if (repo) el.innerHTML = `★ <b>${fmt(repo.stargazers_count)}</b>`;
      });
      $$('[data-lang-for]').forEach(el => {
        const repo = byName[el.dataset.langFor];
        if (!repo) return;
        const label = repo.fork ? 'fork' : (repo.language || '—');
        el.innerHTML = `⑂ <b>${label}</b>`;
      });
    } catch (err) {
      // API indisponible (rate-limit, hors-ligne) → on garde les tirets.
      console.warn('GitHub API indisponible :', err);
    }
  }

  function setText(sel, val) {
    const el = $(sel);
    if (el) el.textContent = val;
  }

  loadGitHub();

  /* ─────────── 9. Canvas : particules ─────────── */
  const canvas = $('#bg-canvas');
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    let w, h, pts = [], raf, dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      w = canvas.width  = innerWidth  * dpr;
      h = canvas.height = innerHeight * dpr;
      canvas.style.width  = innerWidth + 'px';
      canvas.style.height = innerHeight + 'px';
      const count = Math.min(70, Math.round(innerWidth / 22));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22 * dpr,
        vy: (Math.random() - 0.5) * 0.22 * dpr,
        r: (Math.random() * 1.5 + 0.5) * dpr
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const link = 120 * dpr;

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,229,255,.5)';
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.hypot(dx, dy);
          if (d < link) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(124,77,255,${(1 - d / link) * 0.24})`;
            ctx.lineWidth = dpr * 0.7;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    }

    let resizeTimer;
    addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 180);
    });

    // On n'anime que si l'onglet est visible (économie batterie).
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { cancelAnimationFrame(raf); }
      else { raf = requestAnimationFrame(draw); }
    });

    resize();
    raf = requestAnimationFrame(draw);
  }
})();
