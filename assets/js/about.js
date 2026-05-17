// Initialize AOS
        AOS.init({
            duration: 800,
            once: true
        });

        // Initialize particles.js
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('Particles loaded!');
        });

        // Simple parallax effect
        document.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(element => {
                element.style.backgroundPositionY = -scrollPosition * 0.5 + 'px';
            });
        });

      // Tooltip positioning adjustment
        document.addEventListener('DOMContentLoaded', function() {
            const techTags = document.querySelectorAll('.tech-tag');
            
            techTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    const tooltip = this;
                    const rect = this.getBoundingClientRect();
                    
                    if (rect.left < 150) {
                        tooltip.style.setProperty('--tt-pos', 'left: 0; transform: none;');
                    } else if (rect.right > window.innerWidth - 150) {
                        tooltip.style.setProperty('--tt-pos', 'right: 0; left: auto; transform: none;');
                    }
                });
            });
        });

       
document.addEventListener('DOMContentLoaded', function() {
    // Typewriter effect with sound
    const text = "Computer Technology Student | Hardware Enthusiast | Full-Stack Developer";
    const typewriterElement = document.getElementById('typewriter-text');
    const typewriterSound = document.getElementById('typewriter-sound');
    
    let i = 0;
    const speed = 50; // typing speed in ms
    let isPlaying = false;
    
    function typeWriter() {
        if (i < text.length) {
            // Play typing sound (loop with slight variation)
            if (!isPlaying) {
                typewriterSound.currentTime = 0;
                typewriterSound.volume = 0.3;
                typewriterSound.play().catch(e => console.log("Audio play prevented:", e));
                isPlaying = true;
                
                // Randomize sound playback for natural effect
                setTimeout(() => {
                    isPlaying = false;
                }, 100 + Math.random() * 100);
            }
            
            typewriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            // Stop sound when done
            typewriterSound.pause();
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
    
    // Replay animation when clicking the text
    typewriterElement.addEventListener('click', function() {
        i = 0;
        typewriterElement.innerHTML = '';
        typeWriter();
    });
    
    // Initialize AOS animations
    AOS.init({
        duration: 800,
        once: true
    });
});

// Initialize particle network for join section
document.addEventListener('DOMContentLoaded', function() {
    // Only run if container exists
    const container = document.getElementById('join-particles');
    if (!container) return;

    // Create particles
    const particleCount = window.innerWidth < 768 ? 30 : 80;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = 5 + Math.random() * 10;
        const delay = Math.random() * 5;
        const alpha = 0.2 + Math.random() * 0.5;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.backgroundColor = `rgba(57, 255, 20, ${alpha})`;
        particle.style.animation = `float ${duration}s infinite ${delay}s linear`;
        
        container.appendChild(particle);
    }

    // Floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-10px, 10px) rotate(5deg); }
            50% { transform: translate(5px, 20px) rotate(-5deg); }
            75% { transform: translate(10px, 10px) rotate(5deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
        }
    `;
    document.head.appendChild(style);

    // Parallax effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        const joinSection = document.querySelector('.join-section');
        const joinContent = document.querySelector('.join-content');
        
        // Background parallax
        joinSection.style.backgroundPositionY = `${scrollPosition * 0.4}px`;
        
        // Content movement
        joinContent.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        
        // Particle movement
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            const speed = parseFloat(particle.style.animationDuration) || 10;
            particle.style.transform = `translateY(${scrollPosition * 0.2 * (10/speed)}px)`;
        });
    });
});
