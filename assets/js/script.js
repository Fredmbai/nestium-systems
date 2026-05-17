// Intro loader → redirect to home.html AFTER it actually finishes
(() => {
  const TARGET = "home.html";

  // If we've shown the intro before, skip immediately
//  if (localStorage.getItem("introShown")) {
  //  window.location.replace(TARGET);
    //return;
  //}

  const loader = document.getElementById("loader");
  const bootingText = document.getElementById("bootingText");
  const eyesWrapper = document.getElementById("eyesWrapper");

  // If key elements are missing, fail safe → go home
  if (!loader || !bootingText || !eyesWrapper) {
    localStorage.setItem("introShown", "true");
    window.location.replace(TARGET);
    return;
  }

  const message = "Booting Nestium Systems...";
  const preDelay = 5000;     // matches your original 5s wait before typing/eyes fade
  const charDelay = 100;     // per-character typing speed
  const fadeOutDelay = 800;  // time to fade the loader before redirect (ms)
  let redirected = false;

  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  async function typeText(el, text, delay) {
    for (let i = 0; i < text.length; i++) {
      el.textContent += text[i];
      await wait(delay);
    }
  }

  (async () => {
    // Start sequence
    await wait(preDelay);
    eyesWrapper.classList.add("eyes-fade-out"); // your CSS handles the fade

    // Type out the boot message fully
    await typeText(bootingText, message, charDelay);

    // Fade the whole loader, then redirect
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
    await wait(fadeOutDelay);

    localStorage.setItem("introShown", "true");
    redirected = true;
    window.location.replace(TARGET);
  })();

  // Failsafe: if anything stalls, don't trap the user on the splash
  setTimeout(() => {
    if (!redirected) {
      localStorage.setItem("introShown", "true");
      window.location.replace(TARGET);
    }
  }, 15000); // hard cap 15s
})();
