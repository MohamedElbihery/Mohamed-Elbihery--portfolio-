// ===================================
// Smooth Scrolling Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Active Navigation Link
// ===================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNav);

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.tech-card, .credential-card, .project-card, .credential-category'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// ===================================
// Form Handling
// ===================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Success message (in production, this would send to a backend)
        alert(`Thank you, ${name}! Your message has been received. I'll get back to you soon.`);
        this.reset();
    });
}

// ===================================
// Parallax Effect for Hero Image
// ===================================
const profileImage = document.querySelector('.profile-image');

if (profileImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;

        if (scrolled < window.innerHeight) {
            profileImage.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
const footerText = document.querySelector('.footer-text');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = footerText.textContent.replace('2026', currentYear);
}

// ===================================
// Enhanced Tech Card 3D Tilt & Magnetic Effect
// ===================================
const techCards = document.querySelectorAll('.tech-card');

techCards.forEach(card => {
    // 3D Tilt on mouse move
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 8;
        const rotateY = (centerX - x) / 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });

    // Magnetic cursor effect
    card.addEventListener('mouseenter', (e) => {
        const icon = card.querySelector('.tech-icon');
        if (icon) {
            icon.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }
    });
});

// ===================================
// Particle Effect on Hover
// ===================================
function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = color;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = `0 0 10px ${color}`;

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let opacity = 1;
    let posX = x;
    let posY = y;

    function animate() {
        opacity -= 0.02;
        posX += vx;
        posY += vy;

        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    animate();
}

techCards.forEach(card => {
    let particleInterval;

    card.addEventListener('mouseenter', (e) => {
        const colors = ['#2dd4bf', '#34d399', '#14b8a6'];

        particleInterval = setInterval(() => {
            const rect = card.getBoundingClientRect();
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            const color = colors[Math.floor(Math.random() * colors.length)];

            createParticle(x, y, color);
        }, 100);
    });

    card.addEventListener('mouseleave', () => {
        clearInterval(particleInterval);
    });
});

// ===================================
// Skill Progress Animation on Scroll
// ===================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.addEventListener('DOMContentLoaded', () => {
    techCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.9)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        skillObserver.observe(card);
    });
});

// ===================================
// Auto-Scroll for Skills Carousel
// ===================================
const techGrid = document.querySelector('.tech-grid');

if (techGrid) {
    let scrollPosition = 0;
    let scrollDirection = 1; // 1 for right, -1 for left
    let isHovering = false;
    let autoScrollInterval;

    // Pause on hover
    techGrid.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    techGrid.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    // Auto-scroll function
    function autoScroll() {
        if (!isHovering) {
            scrollPosition += scrollDirection * 1; // Speed: 1px per frame

            // Check boundaries and reverse direction
            if (scrollPosition >= techGrid.scrollWidth - techGrid.clientWidth) {
                scrollDirection = -1;
            } else if (scrollPosition <= 0) {
                scrollDirection = 1;
            }

            techGrid.scrollLeft = scrollPosition;
        }
    }

    // Start auto-scroll
    autoScrollInterval = setInterval(autoScroll, 30); // Update every 30ms for smooth animation
}

console.log('Portfolio loaded successfully! 🚀');

