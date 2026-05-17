
window.addEventListener("load", () => {
  const loader = document.getElementById("pageLoader");
  const bootingText = document.getElementById("bootingText");
  const cursor = document.querySelector(".cursor");

  const message = "NestiumSystems...";
  let index = 0;

  // Config values
  const minDisplayTime = 1200;   // minimum loader time in ms (2s)
  const fadeDuration = 600;     // fade-out duration in ms (1s)

  // Track when loader started
  const startTime = Date.now();

  // Reset text
  bootingText.textContent = "";
  cursor.style.display = "none";

  // Typewriter effect
  const typer = setInterval(() => {
    if (index < message.length) {
      bootingText.textContent += message.charAt(index);
      index++;
    } else {
      clearInterval(typer);

      // Blink cursor after typing
      cursor.style.display = "inline-block";
      setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
      }, 500);
    }
  }, 100);

  // When page finishes loading, wait until minDisplayTime is met
  const onPageReady = () => {
    const elapsed = Date.now() - startTime;
    const waitTime = Math.max(0, minDisplayTime - elapsed);

    setTimeout(() => {
      loader.style.transition = `opacity ${fadeDuration}ms ease`;
      loader.style.opacity = "0";
      setTimeout(() => loader.style.display = "none", fadeDuration);
    }, waitTime);
  };

  onPageReady();
});

