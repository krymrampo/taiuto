/**
 * tAIuto - Phone Showcase Scroll Animation
 * Fullscreen phone reveal on scroll with screen transitions
 */

class PhoneShowcase {
    constructor() {
        this.section = document.querySelector('.phone-showcase-section');
        this.container = document.querySelector('.phone-showcase-container');
        this.phone = document.querySelector('#showcase-phone');
        this.screens = document.querySelectorAll('.screen-state');
        this.dots = document.querySelectorAll('.progress-dot');
        this.labels = document.querySelectorAll('.showcase-label');
        this.floatElements = document.querySelectorAll('.float-element');
        this.scrollHint = document.querySelector('#showcase-scroll-hint');
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.hasGSAP = typeof gsap !== 'undefined';
        
        this.currentScreen = 0;
        this.totalScreens = this.screens.length;
        this.isPinned = false;
        
        this.init();
    }
    
    init() {
        if (!this.section || !this.phone) return;

        if (this.prefersReducedMotion || !this.hasGSAP) {
            this.floatElements.forEach(el => el.classList.add('visible'));
            this.setupDotClickHandlers();
            return;
        }

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        this.setupScrollTrigger();
        this.setupPhoneTilt();
        this.setupDotClickHandlers();
    }
    
    setupScrollTrigger() {
        const self = this;
        
        // Main ScrollTrigger timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: this.section,
                start: 'top top',
                end: 'bottom bottom',
                pin: this.container,
                pinSpacing: true,
                scrub: 0.5,
                onUpdate: (self) => {
                    this.onScrollUpdate(self.progress);
                },
                onEnter: () => {
                    this.isPinned = true;
                    this.showScrollHint();
                },
                onLeave: () => {
                    this.isPinned = false;
                    this.hideScrollHint();
                },
                onEnterBack: () => {
                    this.isPinned = true;
                },
                onLeaveBack: () => {
                    this.isPinned = false;
                }
            }
        });
        
        // Phone entrance animation (first 10%)
        tl.fromTo(this.phone, 
            { 
                scale: 0.92, 
                y: 40,
                rotationX: 8,
                opacity: 1 
            },
            { 
                scale: 1, 
                y: 0,
                rotationX: 0,
                opacity: 1,
                ease: 'power2.out',
                duration: 0.1
            },
            0
        );
        
        // Float elements entrance
        this.floatElements.forEach((el, i) => {
            tl.to(el, {
                opacity: 1,
                y: 0,
                duration: 0.05,
                ease: 'power2.out'
            }, 0.02 + (i * 0.01));
        });
    }
    
    onScrollUpdate(progress) {
        // Calculate which screen should be active based on scroll progress
        // WhatsApp (Screen 0) gets 40% of scroll time, others get 20% each
        // 0-0.40: Screen 0, 0.40-0.60: Screen 1, 0.60-0.80: Screen 2, 0.80-1.0: Screen 3
        let screenIndex;
        if (progress < 0.40) {
            screenIndex = 0; // WhatsApp: 0% to 40% (40% duration)
        } else if (progress < 0.60) {
            screenIndex = 1; // Dashboard: 40% to 60% (20% duration)
        } else if (progress < 0.80) {
            screenIndex = 2; // Agenda: 60% to 80% (20% duration)
        } else {
            screenIndex = 3; // Analytics: 80% to 100% (20% duration)
        }
        
        if (screenIndex !== this.currentScreen) {
            this.switchScreen(screenIndex);
        }
        
        if (!this.prefersReducedMotion && this.hasGSAP) {
            // Phone subtle rotation based on scroll
            const rotationY = (progress - 0.5) * 10; // -5 to 5 degrees
            gsap.to(this.phone, {
                rotationY: rotationY,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            // Scale phone slightly during middle of scroll
            let scale = 1;
            if (progress > 0.1 && progress < 0.9) {
                scale = 1 + Math.sin((progress - 0.1) / 0.8 * Math.PI) * 0.1;
            }
            gsap.to(this.phone, {
                scale: scale,
                duration: 0.3
            });
        }
        
        // Update progress dots
        this.updateProgressDots(progress);
        
        // Animate floating elements parallax
        this.animateFloatElements(progress);
    }
    
    switchScreen(index) {
        const prevIndex = this.currentScreen;
        
        // Hide previous screen and label immediately
        this.screens[prevIndex].classList.remove('active');
        this.labels[prevIndex].classList.remove('active');

        // Show new screen
        this.screens[index].classList.add('active');
        this.labels[index].classList.add('active');

        if (!this.prefersReducedMotion && this.hasGSAP) {
            // Reset previous label position for next time
            gsap.set(this.labels[prevIndex], { 
                x: -40, 
                opacity: 0,
                overwrite: 'auto' 
            });
            
            // Animate screen transition
            gsap.fromTo(this.screens[index], 
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: true }
            );
            
            // Animate new label in
            gsap.fromTo(this.labels[index],
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', overwrite: true }
            );
        }
        
        this.currentScreen = index;
        
        // Update dots
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    updateProgressDots(progress) {
        // Match the same timing as onScrollUpdate
        let activeDot;
        if (progress < 0.40) {
            activeDot = 0;
        } else if (progress < 0.60) {
            activeDot = 1;
        } else if (progress < 0.80) {
            activeDot = 2;
        } else {
            activeDot = 3;
        }
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === activeDot);
        });
    }
    
    animateFloatElements(progress) {
        if (this.prefersReducedMotion || !this.hasGSAP) return;

        this.floatElements.forEach((el, i) => {
            const speed = 0.5 + (i * 0.2);
            const offset = Math.sin((progress * Math.PI * 2) + i) * 20;
            const opacity = progress > 0.1 && progress < 0.9 ? 1 : 0;
            
            gsap.to(el, {
                y: offset,
                opacity: opacity,
                duration: 0.3
            });
        });
    }
    
    setupPhoneTilt() {
        // 3D tilt effect on mouse move (only when pinned)
        if (this.prefersReducedMotion || !this.hasGSAP) return;
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices
        
        document.addEventListener('mousemove', (e) => {
            if (!this.isPinned) return;
            
            const rect = this.phone.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            const rotateY = (mouseX / window.innerWidth) * 20;
            const rotateX = -(mouseY / window.innerHeight) * 20;
            
            gsap.to(this.phone, {
                rotationY: rotateY,
                rotationX: rotateX,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', () => {
            gsap.to(this.phone, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5
            });
        });
    }
    
    setupDotClickHandlers() {
        // Define scroll positions for each dot (matching the new timing)
        const scrollPoints = [0, 0.40, 0.60, 0.80];
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (this.prefersReducedMotion || !this.hasGSAP) {
                    this.switchScreen(index);
                    return;
                }

                const targetProgress = scrollPoints[index];
                const sectionHeight = this.section.offsetHeight;
                const maxScroll = sectionHeight - window.innerHeight;
                const targetScroll = this.section.offsetTop + (maxScroll * targetProgress);
                
                window.scrollTo({
                    top: targetScroll,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    showScrollHint() {
        if (this.scrollHint) {
            if (this.prefersReducedMotion || !this.hasGSAP) return;
            gsap.to(this.scrollHint, {
                opacity: 1,
                duration: 0.5,
                delay: 0.5
            });
            
            // Hide after 3 seconds
            setTimeout(() => {
                this.hideScrollHint();
            }, 3000);
        }
    }
    
    hideScrollHint() {
        if (this.scrollHint) {
            if (this.prefersReducedMotion || !this.hasGSAP) return;
            gsap.to(this.scrollHint, {
                opacity: 0,
                duration: 0.3
            });
        }
    }
}

/**
 * Alternative: Simple scroll snap for mobile
 */
function initMobileScrollSnap() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    
    const section = document.querySelector('.phone-showcase-section');
    if (!section) return;
    
    const scrollPoints = [0, 0.40, 0.60, 0.80];
    let snapTimer;
    
    window.addEventListener('scroll', () => {
        clearTimeout(snapTimer);
        
        snapTimer = setTimeout(() => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const maxScroll = sectionHeight - window.innerHeight;
            if (maxScroll <= 0) {
                return;
            }
            const scrollY = window.scrollY;
            const viewportCenter = scrollY + (window.innerHeight / 2);
            const sectionBottom = sectionTop + sectionHeight;
            
            if (viewportCenter < sectionTop || viewportCenter > sectionBottom) {
                return;
            }
            
            const progress = Math.min(Math.max((scrollY - sectionTop) / maxScroll, 0), 1);
            let closest = scrollPoints[0];
            let minDelta = Math.abs(progress - closest);
            
            scrollPoints.forEach(point => {
                const delta = Math.abs(progress - point);
                if (delta < minDelta) {
                    minDelta = delta;
                    closest = point;
                }
            });
            
            const targetScroll = sectionTop + (maxScroll * closest);
            
            window.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });
        }, 120);
    });
}

/**
 * Keyboard navigation
 */
function initKeyboardNav() {
    const showcase = document.querySelector('.phone-showcase-section');
    if (!showcase) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    document.addEventListener('keydown', (e) => {
        const rect = showcase.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isVisible) return;
        
        const screenHeight = showcase.offsetHeight / 4;
        let targetScroll = window.scrollY;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                e.preventDefault();
                targetScroll += screenHeight;
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                e.preventDefault();
                targetScroll -= screenHeight;
                break;
            case '1':
            case '2':
            case '3':
            case '4':
                e.preventDefault();
                targetScroll = showcase.offsetTop + (screenHeight * (parseInt(e.key) - 1));
                break;
        }
        
        window.scrollTo({
            top: targetScroll,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const showcase = new PhoneShowcase();
    initMobileScrollSnap();
    initKeyboardNav();
});

// Export for external use
window.PhoneShowcase = PhoneShowcase;
