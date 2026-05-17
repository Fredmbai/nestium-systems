// Initialize AOS
        AOS.init({
            duration: 800,
            once: false
        });

        // Create circuit lines (circuit-bg is commented out in HTML — guard added)
        document.addEventListener('DOMContentLoaded', function() {
            const circuitBg = document.getElementById('circuit-bg');
            if (!circuitBg) return;
            
            // Create circuit lines
            for (let i = 0; i < 20; i++) {
                const line = document.createElement('div');
                line.classList.add('circuit-line');
                
                // Random properties
                const width = 50 + Math.random() * 200;
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                const rotation = Math.random() * 360;
                const delay = Math.random() * 5;
                
                line.style.width = `${width}px`;
                line.style.left = `${x}%`;
                line.style.top = `${y}%`;
                line.style.transform = `rotate(${rotation}deg)`;
                line.style.animationDelay = `${delay}s`;
                
                circuitBg.appendChild(line);
            }
            
            // Filter projects
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => {
                tag.addEventListener('click', function() {
                    filterTags.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    const category = this.textContent.toLowerCase();
                    const projects = document.querySelectorAll('.project-card');
                    
                    projects.forEach(project => {
                        if (category === 'all' || project.dataset.category === category) {
                            project.style.display = 'block';
                        } else {
                            project.style.display = 'none';
                        }
                    });
                });
            });
            
            // Process steps animation
            const processSteps = document.querySelectorAll('.process-step');
            let activeStep = 0;
            
            function updateProcessSteps() {
                processSteps.forEach((step, index) => {
                    if (index === activeStep) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
                
                activeStep = (activeStep + 1) % processSteps.length;
            }
            
            setInterval(updateProcessSteps, 3000);
            
            // Parallax effects
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                
                // Circuit background movement
                circuitBg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                
                // Project card parallax removed — conflicts with flip transform
                
                // Featured project parallax removed — layout uses grid, scroll offset looks off
            });
        });

// Enhanced JavaScript for dynamic elements
document.addEventListener('DOMContentLoaded', function() {
    // Generate circuit grid connections
    const connections = document.querySelector('.circuit-connections');
    for (let i = 0; i < 15; i++) {
        const connection = document.createElement('div');
        connection.className = 'connection';
        connection.style.width = `${Math.random() * 200 + 100}px`;
        connection.style.top = `${Math.random() * 100}%`;
        connection.style.left = `${Math.random() * 100}%`;
        connection.style.transform = `rotate(${Math.random() * 360}deg)`;
        connection.style.animationDelay = `${Math.random() * 6}s`;
        connections.appendChild(connection);
    }

    // Generate floating cubes
    const cubeContainer = document.querySelector('.floating-cubes');
    for (let i = 0; i < 8; i++) {
        const cube = document.createElement('div');
        cube.className = 'cube';
        cube.style.top = `${Math.random() * 100 + 100}%`;
        cube.style.left = `${Math.random() * 100}%`;
        cube.style.animationDuration = `${Math.random() * 20 + 20}s`;
        
        // Create cube faces
        ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(face => {
            const faceEl = document.createElement('div');
            faceEl.className = `cube-face cube-face-${face}`;
            faceEl.style.border = `1px solid rgba(0, 255, 255, ${Math.random() * 0.3 + 0.2})`;
            cube.appendChild(faceEl);
        });
        
        cubeContainer.appendChild(cube);
    }

    // Generate particles
    const particles = document.querySelector('.particles');
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particles.appendChild(particle);
    }

    // Generate circuit dots
    const circuitDots = document.querySelector('.circuit-dots');
    for (let i = 0; i < 25; i++) {
        const dot = document.createElement('div');
        dot.className = 'circuit-dot';
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 3}s`;
        circuitDots.appendChild(dot);
    }

    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        document.querySelector('.layer-1').style.transform = `translateY(${scrollY * 0.2}px)`;
        document.querySelector('.layer-2').style.transform = `translateY(${scrollY * 0.4}px)`;
        document.querySelector('.layer-3').style.transform = `translateY(${scrollY * 0.6}px)`;
    });
});

document.querySelector('.resume-download-btn').addEventListener('click', function(e) {
    e.preventDefault();
    window.open(this.href + '#toolbar=0&navpanes=0', '_blank');
});