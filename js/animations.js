/**
 * tAIuto - GSAP Animations
 * Advanced scroll-triggered animations
 */

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    initHeroAnimations();
    initScrollAnimations();
    initParallaxEffects();
    initCounterAnimations();
});

/**
 * Hero section entrance animations
 */
function initHeroAnimations() {
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Hero content stagger
    heroTl.from('.hero-badge', {
        y: 20,
        opacity: 0,
        duration: 0.6
    })
    .from('.hero-title', {
        y: 30,
        opacity: 0,
        duration: 0.8
    }, '-=0.3')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.5')
    .from('.hero-description', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.4')
    .from('.hero-buttons', {
        y: 20,
        opacity: 0,
        duration: 0.6
    }, '-=0.3')
    .from('.hero-trust', {
        y: 15,
        opacity: 0,
        duration: 0.5
    }, '-=0.2');
    
    // iPhone entrance
    gsap.from('.hero-phone', {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4
    });
    
    // Background blobs
    gsap.from('.bg-blob', {
        scale: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2
    });
}

/**
 * Scroll-triggered section animations
 */
function initScrollAnimations() {
    // Stats section
    gsap.from('.stat-card', {
        scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // Steps section
    gsap.from('.step-card', {
        scrollTrigger: {
            trigger: '.steps-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'back.out(1.2)'
    });
    
    // Feature cards
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Dashboard preview
    gsap.from('.dashboard-preview', {
        scrollTrigger: {
            trigger: '.dashboard-preview',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Benefit items
    gsap.from('.benefit-item', {
        scrollTrigger: {
            trigger: '.benefits-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    gsap.from('.benefit-img', {
        scrollTrigger: {
            trigger: '.benefits-images',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // ROI section
    gsap.from('.roi-card', {
        scrollTrigger: {
            trigger: '.roi-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Pricing card
    gsap.from('.pricing-card', {
        scrollTrigger: {
            trigger: '.pricing-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.2)'
    });
    
    // Implementation steps
    gsap.from('.impl-step', {
        scrollTrigger: {
            trigger: '.implementation-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        x: (i) => i === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Comparison table
    gsap.from('.comparison-table tr', {
        scrollTrigger: {
            trigger: '.comparison-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: 'power2.out'
    });
    
    // Target cards
    gsap.from('.target-card', {
        scrollTrigger: {
            trigger: '.target-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
    });
    
    // CTA section
    gsap.from('.cta-content > *', {
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
    });
}

/**
 * Parallax and continuous effects
 */
function initParallaxEffects() {
    // iPhone parallax on scroll
    gsap.to('.hero-phone', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -100,
        ease: 'none'
    });
    
    // Background blobs parallax
    gsap.to('.bg-blob-1', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -150,
        rotation: 45,
        ease: 'none'
    });
    
    gsap.to('.bg-blob-2', {
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -80,
        ease: 'none'
    });
    
    // Dashboard parallax
    gsap.to('.dashboard-preview', {
        scrollTrigger: {
            trigger: '.features-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        },
        y: -50,
        ease: 'none'
    });
}

/**
 * Counter animations for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const suffix = counter.getAttribute('data-suffix') || '';
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => animateCounter(counter, target, suffix),
            once: true
        });
    });
}

/**
 * Animate a single counter
 */
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

/**
 * Text reveal animation
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

/**
 * Magnetic button effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.magnetic-btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(btn, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });
}

/**
 * Refresh ScrollTrigger on resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
