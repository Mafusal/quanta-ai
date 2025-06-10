// Enhanced AI Background Animation
document.addEventListener('DOMContentLoaded', () => {
    const aiBackground = document.querySelector('.ai-background');
    const particlesContainer = document.querySelector('.ai-particles');
    
    // Configuration
    const config = {
        particleCount: 50,
        connectionCount: 30,
        particleMinSize: 2,
        particleMaxSize: 8,
        connectionMinLength: 100,
        connectionMaxLength: 300,
        particleSpeed: 15,
        connectionSpeed: 3
    };

    // Create particles
    function createParticles() {
        for (let i = 0; i < config.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Random size
            const size = Math.random() * (config.particleMaxSize - config.particleMinSize) + config.particleMinSize;
            
            // Random animation path
            const randomPath = Math.floor(Math.random() * 4); // 4 different animation paths
            
            particle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                animation: particleFloat${randomPath} ${config.particleSpeed + Math.random() * 5}s infinite;
                animation-delay: ${Math.random() * -15}s;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Create neural connections
    function createConnections() {
        for (let i = 0; i < config.connectionCount; i++) {
            const connection = document.createElement('div');
            connection.className = 'neural-connection';
            
            // Random position and dimensions
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const length = Math.random() * (config.connectionMaxLength - config.connectionMinLength) + config.connectionMinLength;
            const angle = Math.random() * 360;
            
            connection.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                width: ${length}px;
                transform: rotate(${angle}deg);
                animation: connectionPulse ${config.connectionSpeed + Math.random() * 2}s infinite;
                animation-delay: ${Math.random() * -3}s;
            `;
            
            aiBackground.appendChild(connection);
        }
    }

    // Initialize background
    function initBackground() {
        // Clear existing elements
        particlesContainer.innerHTML = '';
        const existingConnections = aiBackground.querySelectorAll('.neural-connection');
        existingConnections.forEach(conn => conn.remove());

        // Create new elements
        createParticles();
        createConnections();
    }

    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initBackground, 250);
    });

    // Initialize
    initBackground();

    // Smooth scroll for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.glass-header');
    const headerHeight = header ? header.offsetHeight : 0;

    // Smooth scroll to section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveLink() {
        const scrollPosition = window.scrollY + headerHeight + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (correspondingLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to current section's link
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Update header background on scroll
    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Add scroll event listeners
    window.addEventListener('scroll', () => {
        updateActiveLink();
        updateHeader();
    });

    // Initial check for active section
    updateActiveLink();
    updateHeader();

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.solution-card, .industry-card, .team-card');
    animatedElements.forEach(el => observer.observe(el));

    // Form animation
    const form = document.querySelector('.contact-form');
    if (form) {
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            if (input) {
                input.addEventListener('focus', () => {
                    group.classList.add('focused');
                });
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        group.classList.remove('focused');
                    }
                });
            }
        });
    }
});

// Parallax effect for hero shapes
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.hero-shapes .shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Countdown Timer
function startCountdown() {
    const countdownElement = document.querySelector('.countdown');
    if (!countdownElement) return;

    let minutes = 59;
    let seconds = 59;

    function updateDisplay() {
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const timer = setInterval(() => {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else {
            clearInterval(timer);
            return;
        }
        updateDisplay();
    }, 1000);

    updateDisplay();
}

// Start the countdown when the page loads
document.addEventListener('DOMContentLoaded', startCountdown); 