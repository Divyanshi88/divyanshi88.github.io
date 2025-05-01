// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set the theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Check for saved theme preference or use the system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme('dark');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 0';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = 'none';
    }
});

// Initialize EmailJS
(function() {
    // Replace with your EmailJS public key
    emailjs.init("Ab9WoJbrQRiadNMgH");
})();

// Form submission handling
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');
const formSuccess = document.getElementById('form-success');
const formError = document.getElementById('form-error');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Hide any previous messages
        formSuccess.style.display = 'none';
        formError.style.display = 'none';
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Prepare template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        };
        
        // Replace with your EmailJS service ID and template ID
        emailjs.send('service_46av19x', 'template_juftc9l', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                
                // Show success message
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
            })
            .catch(function(error) {
                console.log('FAILED...', error);
                
                // Show error message
                formError.style.display = 'block';
            })
            .finally(function() {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            });
    });
}

// Add animation to skill bars
function animateSkills() {
    const skillElements = document.querySelectorAll('.skill-progress');
    
    // Set the actual percentages for each skill
    const skillPercentages = [
        // Programming Languages
        '95%', '90%', '90%',
        // Data Science & ML
        '90%', '92%', '88%', '80%',
        // Tools & Frameworks
        '95%', '90%', '85%', '88%'
    ];
    
    // Apply the percentages to each skill bar with animation
    skillElements.forEach((skill, index) => {
        // Start with width 0
        skill.style.width = '0';
        
        // Set a staggered delay for each skill
        setTimeout(() => {
            // Add transition for smooth animation
            skill.style.transition = 'width 1.5s cubic-bezier(0.1, 0.45, 0.1, 1)';
            
            // Set the target width
            if (index < skillPercentages.length) {
                skill.style.width = skillPercentages[index];
            } else {
                skill.style.width = '85%'; // Default fallback
            }
        }, 200 + (index * 100)); // Staggered delay
    });
}

// Initialize typing effect
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const options = {
            strings: ['Data Science Enthusiast', 'Machine Learning Developer', 'Problem Solver', 'AI Researcher'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        };
        
        new Typed('#typing-text', options);
    }
}

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
            
            // If this is the skills section, animate the skill bars
            if (entry.target.id === 'skills') {
                animateSkills();
            }
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add CSS class for animation
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        section.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item {
            opacity: 0;
            transform: translateX(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: calc(var(--i, 0) * 0.1s);
        }
        
        section.animate .timeline-item {
            opacity: 1;
            transform: translateX(0);
        }
        
        .project-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            transition-delay: calc(var(--i, 0) * 0.1s);
        }
        
        section.animate .project-card {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Add delay variables for staggered animations
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.setProperty('--i', index);
    });
    
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.setProperty('--i', index);
    });
    
    // Initialize typing effect
    initTypingEffect();
});