/**
 * tAIuto - GSAP Animations
 * Advanced scroll-triggered animations
 */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    if (prefersReducedMotion || typeof gsap === 'undefined') {
        return;
    }

    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    initHeroAnimations();
    initScrollAnimations();
});

/**
 * Hero section entrance animations
 */
function initHeroAnimations() {
    // Animate hero watermark
    gsap.from('.hero-watermark', {
        opacity: 0,
        scale: 0.9,
        duration: 1.2,
        ease: 'power3.out'
    });
    
    // Animate hero content
    gsap.from('.hero-section p', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
    });
    
    // Animate trust badges
    gsap.from('.hero-section .flex.items-center', {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.5
    });
}

/**
 * Scroll-triggered section animations
 */
function initScrollAnimations() {
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
 * Refresh ScrollTrigger on resize
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});
