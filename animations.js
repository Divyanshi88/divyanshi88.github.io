// Animation utilities for Divyanshi's Portfolio
// This file contains all animation-related code

// AOS (Animate On Scroll) initialization
function initializeAOS() {
    // Add data-aos attributes to elements
    const elements = {
        // Hero section animations
        '.hero-content h1': 'fade-right',
        '.hero-content h2': 'fade-right',
        '.hero-content p': 'fade-right',
        '.hero-buttons': 'fade-up',
        '.profile-img': 'fade-left',
        
        // About section animations
        '.about-text p': 'fade-up',
        '.highlight-item': 'zoom-in',
        
        // Skills section animations
        '.skill-category h3': 'fade-right',
        '.skill-item': 'fade-up',
        
        // Projects section animations
        '.project-card': 'flip-up',
        
        // Education section animations
        '.timeline-item': 'fade-right',
        
        // Contact section animations
        '.contact-item': 'fade-up',
        '.contact-form': 'fade-left'
    };
    
    // Apply data-aos attributes
    for (const [selector, animation] of Object.entries(elements)) {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.setAttribute('data-aos', animation);
            el.setAttribute('data-aos-delay', (index * 100).toString());
            el.setAttribute('data-aos-duration', '800');
        });
    }
    
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const options = {
        strings: ['Data Science Enthusiast', 'Machine Learning Developer', 'Problem Solver'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    };
    
    // Create a span for the typing effect
    const typingElement = document.createElement('span');
    typingElement.id = 'typing-text';
    
    // Find the h2 element in the hero section
    const h2Element = document.querySelector('.hero-content h2');
    if (h2Element) {
        // Replace the h2 content with "B.Tech CSE Student | " + typing effect
        h2Element.innerHTML = 'B.Tech CSE Student | ';
        h2Element.appendChild(typingElement);
        
        // Initialize Typed.js
        new Typed('#typing-text', options);
    }
}

// Hover animations for various elements
function initializeHoverAnimations() {
    // Add hover animations to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px) scale(1.03)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
            
            // Animate the icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.color = 'var(--accent-color)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'var(--shadow)';
            
            // Reset the icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.color = 'var(--primary-color)';
            }
        });
    });
    
    // Add hover animations to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Animate the icon
            const icon = this.querySelector('.project-image i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset the icon
            const icon = this.querySelector('.project-image i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add hover animations to nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Loading animations when the page loads
function initializeLoadingAnimations() {
    // Add loading animation to the body
    document.body.classList.add('loading');
    
    // Create and add the loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Remove the loading overlay after the page has loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            document.body.classList.remove('loading');
            
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// Parallax effect for background elements
function initializeParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        
        // Parallax for hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.4}px`;
        }
        
        // Parallax for about section
        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            const aboutBefore = aboutSection.querySelector('.about::before');
            const aboutAfter = aboutSection.querySelector('.about::after');
            
            if (aboutBefore) {
                aboutBefore.style.transform = `translateY(${scrollPosition * 0.1}px)`;
            }
            
            if (aboutAfter) {
                aboutAfter.style.transform = `translateY(${scrollPosition * -0.1}px)`;
            }
        }
    });
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for animations
    addAnimationStyles();
    
    // Initialize loading animations first
    initializeLoadingAnimations();
    
    // Initialize other animations after a short delay
    setTimeout(() => {
        initializeAOS();
        initializeTypingEffect();
        initializeHoverAnimations();
        initializeParallaxEffect();
    }, 500);
});

// Add animation styles to the document
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Loading animation styles */
        body.loading {
            overflow: hidden;
        }
        
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-color);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        }
        
        .loading-spinner {
            text-align: center;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid rgba(52, 152, 219, 0.2);
            border-radius: 50%;
            border-top-color: var(--secondary-color);
            animation: spin 1s ease-in-out infinite;
            margin: 0 auto 20px;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Fade-in animation for sections */
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        /* Typing cursor animation */
        .typed-cursor {
            opacity: 1;
            animation: blink 0.7s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
        
        /* Hover transition for all elements */
        .skill-item, .project-card, .nav-links a, .highlight-item, .timeline-content {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .skill-item i, .project-image i {
            transition: transform 0.3s ease, color 0.3s ease;
        }
        
        /* Skill progress animation */
        .skill-progress {
            position: relative;
            overflow: hidden;
        }
        
        .skill-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, 
                transparent 0%, 
                rgba(255, 255, 255, 0.4) 50%, 
                transparent 100%);
            animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
}