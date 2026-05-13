// ===== PORTFOLIO WEBSITE JAVASCRIPT =====
// This file contains all interactive functionality for the portfolio website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== MOBILE NAVIGATION TOGGLE =====
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    // Toggle mobile menu when hamburger icon is clicked
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // ===== ACTIVE NAV LINK HIGHLIGHT ON SCROLL =====
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    // Function to highlight active nav link based on scroll position
    function highlightNavLink() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Call function on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // ===== ANIMATE STATS COUNTER =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Function to animate counting up
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    }
    
    // Function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Function to handle counter animation when scrolled into view
    function handleScrollAnimation() {
        statNumbers.forEach(stat => {
            if (isElementInViewport(stat) && !stat.hasAttribute('data-animated')) {
                const target = parseInt(stat.getAttribute('data-count'));
                animateCounter(stat, target);
                stat.setAttribute('data-animated', 'true');
            }
        });
        
        // Animate skill bars
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            if (isElementInViewport(bar) && !bar.hasAttribute('data-animated')) {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
                bar.setAttribute('data-animated', 'true');
            }
        });
    }
    
    // Initial check on page load
    handleScrollAnimation();
    
    // Check on scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // ===== FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name field
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            nameError.textContent = 'Name is required';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            nameError.textContent = '';
            nameInput.style.borderColor = '#ddd';
            return true;
        }
    }
    
    // Validate email field
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailError.textContent = 'Email is required';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            emailError.textContent = '';
            emailInput.style.borderColor = '#ddd';
            return true;
        }
    }
    
    // Validate message field
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (message === '') {
            messageError.textContent = 'Message is required';
            messageInput.style.borderColor = '#e74c3c';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageInput.style.borderColor = '#e74c3c';
            return false;
        } else {
            messageError.textContent = '';
            messageInput.style.borderColor = '#ddd';
            return true;
        }
    }
    
    // Real-time validation as user types
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        // If all fields are valid, simulate form submission
        if (isNameValid && isEmailValid && isMessageValid) {
            // In a real application, you would send the form data to a server here
            // For this demo, we'll just show a success message
            
            // Show success message
            formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
            formSuccess.style.color = '#2ecc71';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formSuccess.textContent = '';
                
                // Reset border colors
                nameInput.style.borderColor = '#ddd';
                emailInput.style.borderColor = '#ddd';
                messageInput.style.borderColor = '#ddd';
            }, 3000);
        } else {
            // If validation fails, show error message
            formSuccess.textContent = 'Please fix the errors above before submitting.';
            formSuccess.style.color = '#e74c3c';
        }
    });
    
    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== UPDATE FOOTER YEAR =====
    const currentYearSpan = document.getElementById('current-year');
    currentYearSpan.textContent = new Date().getFullYear();
    
    // ===== ADD HOVER EFFECTS TO PROJECT CARDS =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== ADD LOADING ANIMATION TO PAGE =====
    // Simple fade-in effect for page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });
    
    // Fallback in case load event doesn't fire
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 500);
});

