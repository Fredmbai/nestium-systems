/* =====================================================
   GLOBAL.JS — Nestium Systems
   Shared interactions across all pages
   ===================================================== */

(function () {
  'use strict';

  // ============================================
  // SCROLL PROGRESS BAR
  // ============================================
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================
  // HEADER SCROLL BEHAVIOR
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============================================
  // CUSTOM CURSOR (desktop only)
  // ============================================
  function initCustomCursor() {
    // Only activate on true pointer devices
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const ring = document.querySelector('.cursor-ring');
    const dot = document.querySelector('.cursor-dot');
    if (!ring || !dot) return;

    let mouseX = -200, mouseY = -200; // start off-screen
    let ringX = -200, ringY = -200;
    let initialized = false;

    // Position both elements off-screen until mouse actually moves
    ring.style.left = '-200px';
    ring.style.top  = '-200px';
    dot.style.left  = '-200px';
    dot.style.top   = '-200px';

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Use transform instead of left/top for dot — avoids reflow
      dot.style.left = mouseX + 'px';
      dot.style.top  = mouseY + 'px';

      // Show cursor on first real movement
      if (!initialized) {
        ring.classList.add('cursor-active');
        dot.classList.add('cursor-active');
        initialized = true;
      }
    });

    // Smooth ring follow with lerp (rAF loop)
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = ringX + 'px';
      ring.style.top  = ringY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverTargets = 'a, button, [role="button"], input, textarea, select, label, .nav-link, .social-icon, .orbit-item, .project-card-2-0, .wwd-menu li, .cta-button';

    document.addEventListener('mouseover', (e) => {
      if (e.target.matches(hoverTargets) || e.target.closest(hoverTargets)) {
        ring.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.matches(hoverTargets) || e.target.closest(hoverTargets)) {
        ring.classList.remove('hovering');
      }
    });

    document.addEventListener('mousedown', () => ring.classList.add('clicking'));
    document.addEventListener('mouseup',   () => ring.classList.remove('clicking'));

    // Fade out when pointer leaves the window
    document.addEventListener('mouseleave', () => {
      ring.classList.remove('cursor-active');
      dot.classList.remove('cursor-active');
      initialized = false;
    });

    document.addEventListener('mouseenter', () => {
      // Will re-show on next mousemove
    });
  }

  // ============================================
  // PAGE TRANSITION (fade out on navigation)
  // ============================================
  function initPageTransitions() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Skip external links, anchors, mailto, tel, javascript
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        link.target === '_blank'
      ) return;

      e.preventDefault();

      document.body.classList.add('page-exit');
      setTimeout(() => {
        window.location.href = href;
      }, 280);
    });
  }

  // ============================================
  // STATS COUNTER ANIMATION
  // ============================================
  function initStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number[data-target]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          const prefix = el.dataset.prefix || '';
          const duration = 1800;
          const startTime = performance.now();
          const isFloat = target % 1 !== 0;

          function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;
            el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.floor(current)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = prefix + target + suffix;
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
  }

  // ============================================
  // SMOOTH REVEAL FOR ELEMENTS
  // ============================================
  function initSmoothReveal() {
    const els = document.querySelectorAll('.reveal-on-scroll');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(el => observer.observe(el));
  }

  // ============================================
  // FOOTER YEAR AUTO-UPDATE
  // ============================================
  function initFooterYear() {
    document.querySelectorAll('.footer-year').forEach(el => {
      el.textContent = new Date().getFullYear();
    });
  }

  // ============================================
  // KEYBOARD NAVIGATION SUPPORT
  // ============================================
  function initKeyboardSupport() {
    // Close mobile menus on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.mobile-menu.active').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.left-menu-btn.active, .right-menu-btn.active').forEach(b => b.classList.remove('active'));
      }
    });
  }

  // ============================================
  // TILT EFFECT ON CARDS (subtle 3D)
  // ============================================
  function initCardTilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) scale(1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // INIT ALL
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initHeaderScroll();
    initCustomCursor();
    initPageTransitions();
    initStatsCounters();
    initSmoothReveal();
    initFooterYear();
    initKeyboardSupport();
    initCardTilt();
  });

})();
