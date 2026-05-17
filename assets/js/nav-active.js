/* =====================================================
   NAV-ACTIVE.JS — Nestium Systems
   Navigation state & mobile menu interactions
   ===================================================== */

window.addEventListener('DOMContentLoaded', () => {

  // ================= Active Link Highlight =================
  // Select all anchor nav-links (not the "More" button which is a <button>)
  const links = document.querySelectorAll('.nav-container a.nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'home.html';

  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkPage = href.split('/').pop();
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'home.html')) {
      link.classList.add('active');
    }
  });

  // ================= Animated Underline =================
  const underline = document.querySelector('.nav-container .underline');

  function moveUnderline(link) {
    if (!underline) return;
    const rect = link.getBoundingClientRect();
    const containerRect = link.closest('.nav-container')?.getBoundingClientRect();
    if (!containerRect) return;

    underline.style.width   = rect.width + 'px';
    underline.style.left    = (rect.left - containerRect.left) + 'px';
    // Place underline 2px below the bottom edge of the link text
    underline.style.top     = (rect.bottom - containerRect.top + 2) + 'px';
    underline.style.opacity = '1';
  }

  // Position on active link once layout is ready
  const activeLink = document.querySelector('.nav-container a.nav-link.active');
  if (activeLink && underline) {
    requestAnimationFrame(() => moveUnderline(activeLink));
  }

  // Follow mouse hover; reset to active link on leave
  links.forEach(link => {
    link.addEventListener('mouseenter', () => moveUnderline(link));
  });

  const navContainer = document.querySelector('.nav-container');
  if (navContainer && underline) {
    navContainer.addEventListener('mouseleave', () => {
      const active = document.querySelector('.nav-container a.nav-link.active');
      if (active) {
        moveUnderline(active);
      } else {
        underline.style.opacity = '0';
      }
    });
  }

  // ================= Mobile Menu Logic =================
  const leftBtn = document.querySelector('.left-menu-btn');
  const rightBtn = document.querySelector('.right-menu-btn');
  const leftMenu = document.querySelector('.left-menu');
  const rightMenu = document.querySelector('.right-menu');

  function openMenu(btn, menu, otherBtn, otherMenu) {
    const isOpen = menu?.classList.contains('active');
    // Close other menu first
    otherMenu?.classList.remove('active');
    otherBtn?.classList.remove('active');
    // Toggle this one
    if (isOpen) {
      menu?.classList.remove('active');
      btn?.classList.remove('active');
    } else {
      menu?.classList.add('active');
      btn?.classList.add('active');
    }
  }

  leftBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu(leftBtn, leftMenu, rightBtn, rightMenu);
  });

  rightBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu(rightBtn, rightMenu, leftBtn, leftMenu);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    const clickedInside =
      e.target.closest('.mobile-menu') ||
      e.target.closest('.left-menu-btn') ||
      e.target.closest('.right-menu-btn');

    if (!clickedInside) {
      leftBtn?.classList.remove('active');
      rightBtn?.classList.remove('active');
      leftMenu?.classList.remove('active');
      rightMenu?.classList.remove('active');
    }
  });

  // Close on nav link click
  document.querySelectorAll('.mobile-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      leftBtn?.classList.remove('active');
      rightBtn?.classList.remove('active');
      leftMenu?.classList.remove('active');
      rightMenu?.classList.remove('active');
    });
  });

  // ================= Swipe to Close Mobile Menus =================
  let touchStartX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    // Swipe left → close left menu
    if (deltaX < -60 && leftMenu?.classList.contains('active')) {
      leftBtn?.classList.remove('active');
      leftMenu?.classList.remove('active');
    }
    // Swipe right → close right menu
    if (deltaX > 60 && rightMenu?.classList.contains('active')) {
      rightBtn?.classList.remove('active');
      rightMenu?.classList.remove('active');
    }
  }, { passive: true });

});
