/**
 * tAIuto - Motion Animations
 * Uses Motion (motion.dev) for hero and scroll-triggered reveals
 */

(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.addEventListener('DOMContentLoaded', () => {
        if (typeof Motion === 'undefined') {
            return;
        }

        const { animate, inView, stagger } = Motion;

        if (prefersReducedMotion) {
            showAll();
            return;
        }

        initHeroAnimations(animate, stagger);
        initRevealAnimations(animate, inView, stagger);
    });

    function showAll() {
        document
            .querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children')
            .forEach((el) => el.classList.add('active'));

        document
            .querySelectorAll('.stagger-children > *')
            .forEach((child) => {
                child.style.opacity = '1';
                child.style.transform = 'none';
            });

        document
            .querySelectorAll('.step-card, .benefit-item, .benefit-img, .roi-card, .pricing-card, .impl-step, .comparison-table tr, .target-card, .cta-content > *')
            .forEach((el) => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
    }

    function initHeroAnimations(animate, stagger) {
        animate('nav', { opacity: [0, 1], y: [-12, 0] }, { duration: 0.6, ease: 'easeOut' });
        animate('.hero-watermark', { opacity: [0, 0.6], scale: [0.96, 1] }, { duration: 1.1, ease: 'easeOut' });
        animate('.hero-section p', { opacity: [0, 1], y: [16, 0] }, { duration: 0.7, ease: 'easeOut', delay: 0.15 });
        animate('.hero-badge', { opacity: [0, 1], y: [10, 0] }, { duration: 0.5, ease: 'easeOut', delay: stagger(0.08, { startDelay: 0.35 }) });
    }

    function initRevealAnimations(animate, inView, stagger) {
        // Generic reveal classes
        inView('.reveal', (el) => {
            animate(el, { opacity: [0, 1], y: [20, 0] }, { duration: 0.6, ease: 'easeOut' });
        }, { amount: 0.2 });

        inView('.reveal-left', (el) => {
            animate(el, { opacity: [0, 1], x: [-24, 0] }, { duration: 0.6, ease: 'easeOut' });
        }, { amount: 0.2 });

        inView('.reveal-right', (el) => {
            animate(el, { opacity: [0, 1], x: [24, 0] }, { duration: 0.6, ease: 'easeOut' });
        }, { amount: 0.2 });

        inView('.reveal-scale', (el) => {
            animate(el, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.5, ease: 'easeOut' });
        }, { amount: 0.2 });

        inView('.stagger-children', (el) => {
            const children = Array.from(el.children);
            animate(children, { opacity: [0, 1], y: [16, 0] }, { duration: 0.5, ease: 'easeOut', delay: stagger(0.08) });
        }, { amount: 0.2 });

        // Section-specific reveals
        prepareElements('.step-card', { opacity: 0, y: 40 });
        inView('.steps-section', () => {
            animate('.step-card', { opacity: [0, 1], y: [40, 0] }, { duration: 0.6, ease: 'easeOut', delay: stagger(0.08) });
        }, { amount: 0.25 });

        prepareElements('.benefit-item', { opacity: 0, x: -30 });
        inView('.benefits-section', () => {
            animate('.benefit-item', { opacity: [0, 1], x: [-30, 0] }, { duration: 0.6, ease: 'easeOut', delay: stagger(0.1) });
        }, { amount: 0.25 });

        prepareElements('.benefit-img', { opacity: 0, y: 24, scale: 0.98 });
        inView('.benefits-images', () => {
            animate('.benefit-img', { opacity: [0, 1], y: [24, 0], scale: [0.98, 1] }, { duration: 0.5, ease: 'easeOut', delay: stagger(0.08) });
        }, { amount: 0.25 });

        prepareElements('.roi-card', { opacity: 0, y: 36 });
        inView('.roi-section', () => {
            animate('.roi-card', { opacity: [0, 1], y: [36, 0] }, { duration: 0.7, ease: 'easeOut' });
        }, { amount: 0.25 });

        prepareElements('.pricing-card', { opacity: 0, y: 44, scale: 0.98 });
        inView('.pricing-section', () => {
            animate('.pricing-card', { opacity: [0, 1], y: [44, 0], scale: [0.98, 1] }, { duration: 0.7, ease: 'easeOut' });
        }, { amount: 0.25 });

        prepareElements('.impl-step', { opacity: 0, y: 28 });
        inView('.implementation-section', () => {
            const steps = Array.from(document.querySelectorAll('.impl-step'));
            steps.forEach((step, index) => {
                animate(step, { opacity: [0, 1], y: [28, 0] }, { duration: 0.6, ease: 'easeOut', delay: index * 0.12 });
            });
        }, { amount: 0.25 });

        prepareElements('.comparison-table tr', { opacity: 0, y: 18 });
        inView('.comparison-section', () => {
            animate('.comparison-table tr', { opacity: [0, 1], y: [18, 0] }, { duration: 0.4, ease: 'easeOut', delay: stagger(0.06) });
        }, { amount: 0.2 });

        prepareElements('.target-card', { opacity: 0, y: 24, scale: 0.98 });
        inView('.target-section', () => {
            animate('.target-card', { opacity: [0, 1], y: [24, 0], scale: [0.98, 1] }, { duration: 0.6, ease: 'easeOut', delay: stagger(0.08) });
        }, { amount: 0.25 });

        prepareElements('.cta-content > *', { opacity: 0, y: 20 });
        inView('.cta-section', () => {
            animate('.cta-content > *', { opacity: [0, 1], y: [20, 0] }, { duration: 0.5, ease: 'easeOut', delay: stagger(0.08) });
        }, { amount: 0.25 });
    }

    function prepareElements(selector, from) {
        document.querySelectorAll(selector).forEach((el) => {
            setInitial(el, from);
        });
    }

    function setInitial(el, from) {
        const transforms = [];
        if (typeof from.x === 'number' && from.x !== 0) {
            transforms.push(`translateX(${from.x}px)`);
        }
        if (typeof from.y === 'number' && from.y !== 0) {
            transforms.push(`translateY(${from.y}px)`);
        }
        if (typeof from.scale === 'number' && from.scale !== 1) {
            transforms.push(`scale(${from.scale})`);
        }
        el.style.opacity = typeof from.opacity === 'number' ? String(from.opacity) : '0';
        el.style.transform = transforms.length ? transforms.join(' ') : 'none';
    }
})();
