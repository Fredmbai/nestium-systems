document.addEventListener('DOMContentLoaded', function() {
  // Track flip states
  const cardStates = new WeakMap();

  // Main initialization function
  const init = () => {
    // First ensure cards are visible and set up hover effects
    initCardFlipSystem();
    forceCardsVisible();
    
    // Then initialize other components
    initLottieAnimation();
    initComparisonSlider();
    initPillarsScroll();
    initHeroParallax();
    initServiceParallax();
    initBackgroundParallax();
    
    // Finally animate cards after everything else is ready
    setTimeout(animateServiceCards, 300);
  };

  // 1. Card Flip System
  // Desktop: pure CSS :hover handles it — no JS needed.
  // Mobile: tap toggles .is-flipped class (CSS has the rotateY transition).
  const initCardFlipSystem = () => {
    if (window.innerWidth > 768) return; // desktop = CSS-only
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('is-flipped');
      });
    });
  };

  // 2. (kept for API compat — cards are always visible now)
  const forceCardsVisible = () => {};

  // 4. Lottie Animation Initialization
  const initLottieAnimation = () => {
    try {
      const animationContainer = document.querySelector('.lottie-animation');
      if (animationContainer) {
        lottie.loadAnimation({
          container: animationContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'assets/animations/handshake.json',
          rendererSettings: {
            progressiveLoad: true,
            hideOnTransparent: true
          }
        });
      }
    } catch (error) {
      console.error('Lottie animation error:', error);
    }
  };

  // 5. Comparison Slider
  // Enhanced Comparison Slider with Keyboard Support
const initComparisonSlider = () => {
  const slider = document.querySelector('.comparison-slider .slider-handle');
  const before = document.querySelector('.comparison-before');
  const sliderButton = document.querySelector('.slider-button');

  if (slider && before && sliderButton) {
    // Update slider position
    const updateSlider = (value) => {
      before.style.width = `${value}%`;
      sliderButton.style.left = `${value}%`;
    };

    // Mouse/Touch Events
    slider.addEventListener('input', (e) => updateSlider(e.target.value));
    slider.addEventListener('touchmove', (e) => updateSlider(e.target.value));

    // Button Drag (for better UX)
    let isDragging = false;
    sliderButton.addEventListener('mousedown', () => (isDragging = true));
    sliderButton.addEventListener('touchstart', () => (isDragging = true));
    document.addEventListener('mouseup', () => (isDragging = false));
    document.addEventListener('touchend', () => (isDragging = false));

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const container = document.querySelector('.comparison-slider');
      const rect = container.getBoundingClientRect();
      const pos = ((e.clientX - rect.left) / rect.width) * 100;
      const clampedPos = Math.min(100, Math.max(0, pos));
      updateSlider(clampedPos);
      slider.value = clampedPos;
    });

    // Keyboard Support (Arrow Keys)
    sliderButton.addEventListener('keydown', (e) => {
      const step = 5;
      let newValue = parseFloat(slider.value);
      if (e.key === 'ArrowLeft') newValue -= step;
      if (e.key === 'ArrowRight') newValue += step;
      newValue = Math.min(100, Math.max(0, newValue));
      updateSlider(newValue);
      slider.value = newValue;
    });
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', initComparisonSlider);

  // 6. Service Cards Animation — AOS handles entrance; no GSAP needed
  const animateServiceCards = () => {};

  // 7. Pillars Horizontal Scroll
  const initPillarsScroll = () => {
    if (window.innerWidth > 768) {
      const pillarsSection = document.querySelector('.pillars-container');
      if (!pillarsSection) return;

      let isDown = false;
      let startX;
      let scrollLeft;

      // Mouse event handlers
      const handleMouseDown = (e) => {
        isDown = true;
        startX = e.pageX - pillarsSection.offsetLeft;
        scrollLeft = pillarsSection.scrollLeft;
        pillarsSection.style.cursor = 'grabbing';
      };

      const handleMouseUp = () => {
        isDown = false;
        pillarsSection.style.cursor = 'grab';
      };

      const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - pillarsSection.offsetLeft;
        const walk = (x - startX) * 2;
        pillarsSection.scrollLeft = scrollLeft - walk;
      };

      // Touch event handlers
      const handleTouchStart = (e) => {
        isDown = true;
        startX = e.touches[0].pageX - pillarsSection.offsetLeft;
        scrollLeft = pillarsSection.scrollLeft;
      };

      const handleTouchMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - pillarsSection.offsetLeft;
        const walk = (x - startX) * 2;
        pillarsSection.scrollLeft = scrollLeft - walk;
      };

      // Add event listeners
      pillarsSection.addEventListener('mousedown', handleMouseDown);
      pillarsSection.addEventListener('mouseup', handleMouseUp);
      pillarsSection.addEventListener('mouseleave', handleMouseUp);
      pillarsSection.addEventListener('mousemove', handleMouseMove);
      pillarsSection.addEventListener('touchstart', handleTouchStart);
      pillarsSection.addEventListener('touchend', handleMouseUp);
      pillarsSection.addEventListener('touchmove', handleTouchMove);

      return () => {
        pillarsSection.removeEventListener('mousedown', handleMouseDown);
        pillarsSection.removeEventListener('mouseup', handleMouseUp);
        pillarsSection.removeEventListener('mouseleave', handleMouseUp);
        pillarsSection.removeEventListener('mousemove', handleMouseMove);
        pillarsSection.removeEventListener('touchstart', handleTouchStart);
        pillarsSection.removeEventListener('touchend', handleMouseUp);
        pillarsSection.removeEventListener('touchmove', handleTouchMove);
      };
    }
  };

  // 8. Hero Section Parallax
  const initHeroParallax = () => {
    const bird = document.querySelector('.flying-bird img');
    if (!bird) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const parallaxValue = scrollPosition * parseFloat(bird.dataset.speed || 0.2);
      bird.style.transform = `translateY(${parallaxValue}px) rotate(${parallaxValue * 0.1}deg)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  // 9. Service Icons Parallax
  const initServiceParallax = () => {
    const serviceIcons = document.querySelectorAll('.icon-parallax');
    if (!serviceIcons.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      serviceIcons.forEach(icon => {
        const speed = parseFloat(icon.dataset.speed) || 0.1;
        const offset = scrollPosition * speed;
        icon.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  // 10. Background Pattern Parallax
  const initBackgroundParallax = () => {
    const bgElements = document.querySelectorAll('[data-parallax="scroll"]');
    if (!bgElements.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      bgElements.forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.2;
        const offset = scrollPosition * speed;
        el.style.backgroundPositionY = `${offset}px`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  // Initialize everything with safety checks
  const safeInit = () => {
    try {
      init();
    } catch (error) {
      console.error('Initialization error:', error);
      forceCardsVisible(); // Fallback to make cards visible
    }
  };

  // Start initialization after DOM is fully ready
  if (document.readyState === 'complete') {
    setTimeout(safeInit, 300);
  } else {
    window.addEventListener('load', () => setTimeout(safeInit, 300));
  }

  // Handle resize events
  window.addEventListener('resize', initPillarsScroll);

  // Cleanup all event listeners when needed
  const cleanupFunctions = [
    initPillarsScroll(),
    initHeroParallax(),
    initServiceParallax(),
    initBackgroundParallax()
  ].filter(Boolean);

  // Cleanup when navigating away (for SPAs)
  window.addEventListener('beforeunload', () => {
    cleanupFunctions.forEach(cleanup => cleanup && cleanup());
  });
});

