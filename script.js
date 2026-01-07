// Initialize Feather Icons
document.addEventListener('DOMContentLoaded', function() {
    feather.replace();
    initScrollReveal();
    initStaggeredAnimations();
    initParallaxEffects();
    initInteractiveCards();
    initTypingEffect();
});

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    // Add reveal classes to sections and cards
    document.querySelectorAll('section > div').forEach((el, index) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
        }
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: unobserve after revealing
                // revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        revealObserver.observe(el);
    });
}

// ========================================
// STAGGERED CARD ANIMATIONS
// ========================================

function initStaggeredAnimations() {
    const cardContainers = document.querySelectorAll('.grid');
    
    cardContainers.forEach(container => {
        const cards = container.querySelectorAll('.card-hover');
        
        const staggerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cards = entry.target.querySelectorAll('.card-hover');
                    cards.forEach((card, index) => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                        
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100); // 100ms delay between each card
                    });
                    staggerObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        staggerObserver.observe(container);
    });
}

// ========================================
// PARALLAX EFFECTS
// ========================================

function initParallaxEffects() {
    const blobs = document.querySelectorAll('.blur-3xl, .blur-2xl');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                
                blobs.forEach((blob, index) => {
                    const speed = (index + 1) * 0.05;
                    const yPos = scrollY * speed;
                    const rotation = scrollY * 0.02 * (index % 2 === 0 ? 1 : -1);
                    blob.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

// ========================================
// INTERACTIVE CARD EFFECTS
// ========================================

function initInteractiveCards() {
    const cards = document.querySelectorAll('.card-hover');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
}

// ========================================
// TYPING EFFECT FOR HERO
// ========================================

function initTypingEffect() {
    const subtitle = document.querySelector('#about h2');
    if (!subtitle) return;
    
    const roles = [
        'IT Solution Analyst & Cloud-Native Architecture Expert',
        'Kubernetes & DevSecOps Specialist',
        'Microservices Architecture Designer',
        'Enterprise Architecture Professional'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 50;
    
    // Store original text
    const originalText = subtitle.textContent;
    
    // Uncomment below to enable typing effect (disabled by default to preserve original content)
    // typeRole();
    
    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            subtitle.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30;
        } else {
            subtitle.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 50;
        }
        
        // Add cursor effect
        subtitle.style.borderRight = '2px solid #667eea';
        
        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeRole, typingSpeed);
    }
}

// ========================================
// SMOOTH SCROLL & NAVBAR EFFECTS
// ========================================

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Enhanced navbar background on scroll with smooth transition
let lastScrollY = 0;
let navbarHidden = false;

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    const currentScrollY = window.scrollY;
    
    // Background effect
    if (currentScrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px -1px rgba(0, 0, 0, 0.1)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
        navbar.style.backdropFilter = 'blur(10px)';
    }
    
    lastScrollY = currentScrollY;
});

// ========================================
// INTERSECTION OBSERVER FOR SECTIONS
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.classList.add('animate-fade-in-up');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach((section, index) => {
    if (index > 0) { // Skip hero section
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        sectionObserver.observe(section);
    }
});

// Make first section visible immediately with animation
const heroSection = document.querySelector('#about');
if (heroSection) {
    heroSection.style.opacity = '1';
    heroSection.classList.add('animate-fade-in-up');
}

// ========================================
// SKILL CARD NUMBER COUNTER
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ========================================
// MAGNETIC BUTTON EFFECT
// ========================================

document.querySelectorAll('.btn-dynamic, a[href="#contact"]').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ========================================
// ADD DYNAMIC CLASSES ON LOAD
// ========================================

window.addEventListener('load', () => {
    // Add animation classes to elements
    document.querySelectorAll('.card-hover').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});