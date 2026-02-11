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

// ===================================
// Form Handling
// ===================================
const contactForm = document.querySelector('.contact-form');

// Create toast notification element
function createToast(type, title, message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;

    const icon = type === 'success'
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
        toast.classList.add('toast-show');
    });

    // Auto remove after 6 seconds
    setTimeout(() => {
        toast.classList.remove('toast-show');
        setTimeout(() => toast.remove(), 400);
    }, 6000);
}

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        // Basic validation
        if (!name || !email || !message) {
            createToast('error', 'Missing Fields', 'Please fill in all fields before submitting.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            createToast('error', 'Invalid Email', 'Please enter a valid email address.');
            return;
        }

        // Disable button and show loading state
        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="btn-spinner"></span>
            Sending...
        `;

        // Actually send the form data to FormSubmit
        fetch('https://formsubmit.co/ajax/mohamedalbihery93@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                _subject: `🔔 New Client Inquiry from ${name} — Portfolio`,
                _template: 'table'
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    createToast('success', 'Message Sent! ✨', `Thank you, ${name}! Your message has been delivered successfully. I'll get back to you soon.`);
                    contactForm.reset();
                } else {
                    createToast('error', 'Send Failed', 'Something went wrong. Please try again or contact me directly via email.');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                createToast('error', 'Connection Error', 'Could not send your message. Please check your internet connection and try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            });
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

// ===================================
// Premium Name Decoding Effect (Sequential Cracking)
// ===================================
function initTypewriter() {
    const prefixElement = document.getElementById('type-prefix');
    const nameElement = document.getElementById('type-name');
    const cursorElement = document.querySelector('.type-cursor');

    if (!prefixElement || !nameElement) return;

    const prefixText = "Hi, I'm ";
    const nameText = "Mohamed Elbihery";
    const chars = "!<>-_\\/[]{}—=+*^?#________";

    let prefixIndex = 0;
    const prefixSpeed = 40;

    function typePrefix() {
        if (prefixIndex < prefixText.length) {
            prefixElement.textContent += prefixText.charAt(prefixIndex);
            prefixIndex++;
            setTimeout(typePrefix, prefixSpeed);
        } else {
            decodeSequentially();
        }
    }

    async function decodeSequentially() {
        nameElement.classList.add('decoding');

        let solvedName = "";

        for (let i = 0; i < nameText.length; i++) {
            const targetChar = nameText[i];

            if (targetChar === " ") {
                solvedName += " ";
                nameElement.textContent = solvedName;
                continue;
            }

            for (let j = 0; j < 8; j++) {
                const randomChar = chars[Math.floor(Math.random() * chars.length)];
                nameElement.textContent = solvedName + randomChar;
                await new Promise(resolve => setTimeout(resolve, 30));
            }

            solvedName += targetChar;
            nameElement.textContent = solvedName;

            await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 40));
        }

        nameElement.classList.remove('decoding');

        setTimeout(() => {
            if (cursorElement) cursorElement.style.transition = 'opacity 1s';
            if (cursorElement) cursorElement.style.opacity = '0';
        }, 1500);
    }

    setTimeout(typePrefix, 1000);
}

// ===================================
// Auto-Scroll for Skills Carousel
// ===================================
const techGrid = document.querySelector('.tech-grid');

if (techGrid) {
    let scrollPosition = 0;
    let scrollDirection = 1;
    let isHovering = false;
    let autoScrollInterval;

    techGrid.addEventListener('mouseenter', () => {
        isHovering = true;
    });

    techGrid.addEventListener('mouseleave', () => {
        isHovering = false;
    });

    function autoScroll() {
        if (!isHovering) {
            scrollPosition += scrollDirection * 1;

            if (scrollPosition >= techGrid.scrollWidth - techGrid.clientWidth) {
                scrollDirection = -1;
            } else if (scrollPosition <= 0) {
                scrollDirection = 1;
            }

            techGrid.scrollLeft = scrollPosition;
        }
    }

    autoScrollInterval = setInterval(autoScroll, 30);
}

// ===================================
// Dom Content Loaded Initialization
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.tech-card, .credential-card, .project-card, .credential-category'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        skillObserver.observe(el);
    });

    // Initialize Typewriter Effect
    initTypewriter();
});

// ===================================
// Interactive Mouse Glow (Optimized)
// ===================================
const mouseGlow = document.querySelector('.mouse-glow');
if (mouseGlow) {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateGlow() {
        const distX = mouseX - currentX;
        const distY = mouseY - currentY;

        // Smooth follow logic (0.1 = lag factor)
        currentX += distX * 0.15;
        currentY += distY * 0.15;

        // Dynamically center based on actual width/height
        const offset = mouseGlow.offsetWidth / 2;
        mouseGlow.style.transform = `translate(${currentX - offset}px, ${currentY - offset}px)`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}


console.log('Portfolio loaded successfully! 🚀');
