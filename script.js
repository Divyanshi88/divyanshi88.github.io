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
            strings: ['Data Analyst', 'AI Engineer', 'Machine Learning Developer', 'Problem Solver'],
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
        
        /* Dashboard Container Animations */
        .dashboard-container {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .dashboard-container.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .dashboard-container.hide {
            opacity: 0;
            transform: translateY(20px);
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
    
    // Dashboard Modal functionality
    const modal = document.getElementById('dashboardModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDashboard = document.getElementById('modalDashboard');
    const modalClose = document.querySelector('.modal-close');
    
    // Dashboard data mapping for Tableau dashboards
    const dashboardData = {
        'viz1752380387164': {
            title: 'E-Commerce Customer Churn Dashboard',
            url: 'E-CommerceCustomerChurnDashboard/Dashboard1',
            type: 'tableau'
        },
        'viz1752381400227': {
            title: 'Titanic Survival Analysis',
            url: 'TitanicSurvivalAnalysis_17509115262450/Dashboard1',
            type: 'tableau'
        },
        'viz1752381551596': {
            title: 'Most In-Demand Job Skills – LinkedIn 2024',
            url: 'Jobskillanalysis/Dashboard1',
            type: 'tableau'
        },
        'viz1752381622840': {
            title: 'Startup Funding Trends in India 🇮🇳',
            url: 'Startupfundingtrends/Dashboard1',
            type: 'tableau'
        },
        'viz1752381744101': {
            title: 'E-commerce Revenue Optimization',
            url: 'E-commerceRevnueOptimizationDasboard/Dashboard1',
            type: 'tableau'
        }
    };
    
    // Handle all dashboard toggle buttons - UPDATED VERSION
    document.querySelectorAll('.toggle-dashboard').forEach((toggle, index) => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const card = this.closest('.project-card');
            const dashboardContainer = card.querySelector('.dashboard-container');
            
            // Check if this card has an iframe (Looker Studio dashboard)
            const iframe = dashboardContainer.querySelector('iframe');
            
            if (iframe) {
                // Handle Looker Studio dashboard - open in modal instead of inline
                const iframeSrc = iframe.src;
                const cardTitle = card.querySelector('h3').textContent;
                openLookerStudioModal(cardTitle, iframeSrc);
            } else {
                // Handle Tableau dashboard - open in modal
                const tableauDiv = dashboardContainer.querySelector('[id^="viz"]');
                if (tableauDiv) {
                    const dashboardId = tableauDiv.id;
                    const dashboardInfo = dashboardData[dashboardId];
                    
                    if (dashboardInfo) {
                        openTableauModal(dashboardInfo.title, dashboardInfo.url, dashboardId);
                    }
                }
            }
        });
    });
    
    // Open Looker Studio Dashboard Modal
    function openLookerStudioModal(title, iframeSrc) {
        if (!modal) return;
        
        modalTitle.textContent = title;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Create iframe embed for Looker Studio
        modalDashboard.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%; overflow: hidden;">
                <iframe 
                    src="${iframeSrc}" 
                    frameborder="0" 
                    style="width: 100%; height: 100%; border: none;" 
                    allowfullscreen>
                </iframe>
            </div>
        `;
    }
    
    // Open Tableau Dashboard Modal
    function openTableauModal(title, dashboardUrl, originalId) {
        if (!modal) return;
        
        modalTitle.textContent = title;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Create unique ID for modal dashboard
        const modalId = 'modal_' + originalId;
        
        // Create Tableau embed for modal
        modalDashboard.innerHTML = `
            <div class='tableauPlaceholder' id='${modalId}' style='position: relative; width: 100%; height: 100%;'>
                <object class='tableauViz' style='display:none;'>
                    <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' />
                    <param name='embed_code_version' value='3' />
                    <param name='site_root' value='' />
                    <param name='name' value='${dashboardUrl}' />
                    <param name='tabs' value='no' />
                    <param name='toolbar' value='yes' />
                    <param name='animate_transition' value='yes' />
                    <param name='display_static_image' value='yes' />
                    <param name='display_spinner' value='yes' />
                    <param name='display_overlay' value='yes' />
                    <param name='display_count' value='yes' />
                    <param name='language' value='en-US' />
                </object>
            </div>
        `;
        
        // Load Tableau visualization in modal
        setTimeout(() => {
            const divElement = document.getElementById(modalId);
            const vizElement = divElement.getElementsByTagName('object')[0];
            
            // Full size for modal
            vizElement.style.width = '100%';
            vizElement.style.height = '100%';
            
            // Load Tableau script if not already loaded
            if (!window.tableau) {
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                scriptElement.onload = () => {
                    vizElement.parentNode.insertBefore(scriptElement, vizElement);
                };
                document.head.appendChild(scriptElement);
            } else {
                const scriptElement = document.createElement('script');
                scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';
                vizElement.parentNode.insertBefore(scriptElement, vizElement);
            }
        }, 100);
    }
    
    // Close Dashboard Modal
    function closeDashboardModal() {
        if (!modal) return;
        
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clear modal content to prevent conflicts
        setTimeout(() => {
            if (modalDashboard) {
                modalDashboard.innerHTML = '';
            }
        }, 300);
    }
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeDashboardModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeDashboardModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('show')) {
            closeDashboardModal();
        }
    });
});