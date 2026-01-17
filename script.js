document.addEventListener('DOMContentLoaded', () => {

    // Theme Switcher Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');

    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const header = document.querySelector('header');
            const scrolled = window.scrollY > 50;

            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';

                // Update navbar for dark mode
                if (scrolled) {
                    header.style.background = 'rgba(10, 10, 10, 0.95)';
                    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
                } else {
                    header.style.background = 'rgba(10, 10, 10, 0.8)';
                    header.style.boxShadow = 'none';
                }
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';

                // Update navbar for light mode
                if (scrolled) {
                    header.style.background = 'rgba(248, 250, 252, 0.98)';
                    header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                } else {
                    header.style.background = 'rgba(248, 250, 252, 0.95)';
                    header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                }
            }
        });
    }

    // Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navRight = document.querySelector('.nav-right');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navRight.classList.toggle('active');
            mobileMenuBtn.innerHTML = navRight.classList.contains('active') ? '✕' : '☰';
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navRight.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });

    // Intersection Observer for fade-up animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to sections
    document.querySelectorAll('section h2, .glass, .project-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';

        if (window.scrollY > 50) {
            if (isLightMode) {
                header.style.background = 'rgba(248, 250, 252, 0.98)';
                header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
        } else {
            if (isLightMode) {
                header.style.background = 'rgba(248, 250, 252, 0.95)';
                header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.8)';
                header.style.boxShadow = 'none';
            }
        }
    });

    // Dynamic Text Animation
    const dynamicText = document.getElementById('dynamic-role');
    if (dynamicText) {
        const roles = ["Software Engineer", "Data Engineer",];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                dynamicText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Newer texts delete faster
            } else {
                dynamicText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Determine pause at end of word
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start animation
        setTimeout(type, 1000);
    }
});
