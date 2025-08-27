// Portfolio JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Default to light theme (no localStorage usage)
    let currentTheme = 'light';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-color-scheme', currentTheme);
        updateThemeIcon(currentTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.95)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(var(--color-slate-900-rgb), 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    }

    // Scroll Events
    window.addEventListener('scroll', function() {
        setActiveNavLink();
        updateNavbar();
    });

    // Initialize on load
    setActiveNavLink();
    updateNavbar();

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(`
        .hero-content,
        .section-header,
        .about-content,
        .skills-category,
        .education-item,
        .project-card,
        .experience-card,
        .contact-item,
        .contact-form-container
    `);

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Staggered animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Staggered animation for soft skills
    const softSkills = document.querySelectorAll('.soft-skill');
    softSkills.forEach((skill, index) => {
        skill.style.opacity = '0';
        skill.style.transform = 'translateX(-30px)';
        skill.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
        observer.observe(skill);
    });

    // Contact Form Handling (UI only)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = 'var(--color-success)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 2000);
            }, 1500);
        });
    }

    // Typing Animation for Hero Title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Start typing animation after a delay
    setTimeout(() => {
        const heroName = document.querySelector('.hero-name');
        if (heroName) {
            typeWriter(heroName, 'ARAVIND S', 150);
        }
    }, 1000);

    // Parallax Effect for Hero Section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-particles');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Dynamic Brain Animation
    function animateBrainNodes() {
        const brainNodes = document.querySelectorAll('.brain-node');
        brainNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.animation = 'none';
                node.offsetHeight; // Trigger reflow
                node.style.animation = `node-glow 2s infinite ease-in-out ${index * 0.5}s`;
            }, index * 200);
        });
    }

    // Start brain animation when hero is visible
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateBrainNodes();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('#home');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Smooth reveal for navigation items
    const navItems = document.querySelectorAll('.nav-menu li');
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100 + 500);
    });

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll(`
        .btn,
        .skill-card,
        .project-card,
        .experience-card,
        .contact-item,
        .nav-link
    `);

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });

    // Scroll to top functionality
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Console welcome message
    console.log(`
    🚀 Welcome to Aravind S's Portfolio!
    💡 AI & Data Science Enthusiast
    🔧 Built with HTML, CSS, and JavaScript
    `);
});