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
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        // Close menu when clicking on the menu background (not on the links themselves)
        navLinks.addEventListener('click', (e) => {
            // Only close if clicking directly on the nav-links container, not on child elements
            if (e.target === navLinks) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
            if (mobileMenuBtn) {
                mobileMenuBtn.innerHTML = '☰';
            }
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
        const prefixes = ["Software", "Data"];
        let prefixIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPrefix = prefixes[prefixIndex];

            if (isDeleting) {
                dynamicText.textContent = currentPrefix.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Delete faster
            } else {
                dynamicText.textContent = currentPrefix.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentPrefix.length) {
                // Pause at end of word
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                prefixIndex = (prefixIndex + 1) % prefixes.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        // Start animation
        setTimeout(type, 1000);
    }
});
