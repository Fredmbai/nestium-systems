// =============================
// HERO CANVAS BACKGROUND
// =============================
(function heroCanvas() {
  const canvas = document.getElementById('circuitCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  let lines = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    length: Math.random() * 100,
    speed: 0.5 + Math.random()
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(15, 240, 240, 0.36)';
    ctx.lineWidth = 1;

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.x, line.y + line.length);
      ctx.stroke();

      line.y += line.speed;
      if (line.y > canvas.height) line.y = -line.length;
    });

    requestAnimationFrame(draw);
  }
  draw();
})();

// =============================
// DOM READY INITIALIZATIONS
// =============================
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded");

  // -------------------------
  // CTA STARS
  // -------------------------
  (function starsEffect() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.animationDelay = `${Math.random() * 5}s`;

      starsContainer.appendChild(star);
    }
  })();

  (function spaceStars() {
    const spaceStarsContainer = document.getElementById('space-stars');
    if (!spaceStarsContainer) return;

    const starCount = 100;
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.classList.add('star');

      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
      star.style.animationDelay = `${Math.random() * 5}s`;

      spaceStarsContainer.appendChild(star);
    }
  })();

  // -------------------------
  // NAV MENUS
  // -------------------------
  (function navMenus() {
    const leftBtn = document.querySelector(".left-menu-btn");
    const rightBtn = document.querySelector(".right-menu-btn");
    const leftMenu = document.querySelector(".left-menu");
    const rightMenu = document.querySelector(".right-menu");

    leftBtn?.addEventListener("click", () => {
      leftMenu?.classList.toggle("active");
      rightMenu?.classList.remove("active");
    });

    rightBtn?.addEventListener("click", () => {
      rightMenu?.classList.toggle("active");
      leftMenu?.classList.remove("active");
    });

    document.querySelectorAll(".mobile-menu a").forEach(link => {
      link.addEventListener("click", () => {
        leftMenu?.classList.remove("active");
        rightMenu?.classList.remove("active");
      });
    });
  })();

  // -------------------------
  // AOS INIT
  // -------------------------
  AOS.init({
    duration: 1000,
    once: true,
    easing: 'ease-out-cubic',
    offset: 100,
    delay: 100
  });

  // -------------------------
  // GSAP PARALLAX
  // -------------------------
  (function gsapParallax() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-content", {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to("#circuitCanvas", {
      y: 50,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".floating-rocket", {
      y: -50,
      rotation: 5,
      ease: "none",
      scrollTrigger: {
        trigger: ".cta-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".orbit-item", {
      y: (i) => (i % 2 === 0 ? -20 : 20),
      rotation: (i) => (i % 2 === 0 ? 5 : -5),
      ease: "none",
      scrollTrigger: {
        trigger: ".orbit-ring",
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });

    gsap.to(".project-card", {
      rotationY: 5,
      rotationX: -5,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-section",
        start: "top 70%",
        end: "bottom 30%",
        scrub: true
      }
    });
  })();

  // -------------------------
  // 3D CAROUSEL CONTROLS
  // -------------------------
  (function carouselControls() {
    const container  = document.querySelector('.slider-container-2-0');
    const dots       = document.querySelectorAll('.carousel-dot');
    const prevBtn    = document.querySelector('.carousel-prev');
    const nextBtn    = document.querySelector('.carousel-next');
    if (!container) return;

    const SLIDE_COUNT   = 4;
    const ANGLE_STEP    = 360 / SLIDE_COUNT;   // 90°
    const AUTO_INTERVAL = 3800;                 // ms between auto-advances

    let currentSlide = 0;
    let autoTimer    = null;
    let isUserPaused = false;

    // Stop the CSS keyframe animation — JS controls rotation from here
    container.style.animation = 'none';
    container.style.transition = 'transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)';
    container.style.transform  = 'translate(-50%, -50%) rotateY(0deg)';

    function goToSlide(idx) {
      currentSlide = ((idx % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
      container.style.transform = `translate(-50%, -50%) rotateY(${-currentSlide * ANGLE_STEP}deg)`;
      dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    function startAuto() {
      stopAuto();
      if (!isUserPaused) {
        autoTimer = setInterval(() => goToSlide(currentSlide + 1), AUTO_INTERVAL);
      }
    }
    function stopAuto() {
      clearInterval(autoTimer);
      autoTimer = null;
    }

    // Button controls
    prevBtn?.addEventListener('click', () => {
      stopAuto(); goToSlide(currentSlide - 1); startAuto();
    });
    nextBtn?.addEventListener('click', () => {
      stopAuto(); goToSlide(currentSlide + 1); startAuto();
    });

    // Dot controls
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        stopAuto(); goToSlide(i); startAuto();
      });
    });

    // Pause on hover over the carousel
    container.addEventListener('mouseenter', () => {
      isUserPaused = true;
      stopAuto();
    });
    container.addEventListener('mouseleave', () => {
      isUserPaused = false;
      startAuto();
    });

    // Touch swipe support
    let touchStartX = 0;
    container.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', e => {
      const delta = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 50) {
        stopAuto();
        goToSlide(delta < 0 ? currentSlide + 1 : currentSlide - 1);
        startAuto();
      }
    }, { passive: true });

    // Kick off auto-rotation
    startAuto();
  })();
});