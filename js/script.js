document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header & Active Nav Link Updates
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        // Sticky Header Toggle
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add a small offset to account for sticky header
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinksContainer.classList.remove('active');
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point in pixels from bottom

        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    };

    // Trigger once on load
    revealOnScroll();
    
    // Trigger on scroll
    window.addEventListener('scroll', revealOnScroll);

    // 4. Typewriter Effect for Hero Tagline
    const typewriters = document.querySelectorAll('.typewriter-text');
    typewriters.forEach(tw => {
        const text = tw.getAttribute('data-text');
        if (text) {
            let i = 0;
            tw.textContent = '';
            // Add a small delay before starting to type
            setTimeout(() => {
                const typing = setInterval(() => {
                    if (i < text.length) {
                        tw.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(typing);
                    }
                }, 50); // Speed of typing
            }, 800);
        }
    });

    // 5. Dynamic Card Spotlight Hover Effect
    const cards = document.querySelectorAll('.project-card, .cert-card, .contact-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Two-stage Card Scroll Animation (IntersectionObserver)
    const cardsToAnimate = document.querySelectorAll('.project-card, .timeline-content, .skill-category, .contact-card');
    
    // Add base class for animation
    cardsToAnimate.forEach(card => card.classList.add('animate-card'));

    let staggerTimeout = null;
    let cardsInCurrentBatch = [];

    const cardObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% visible
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                cardsInCurrentBatch.push(entry.target);
                // Only animate once
                observer.unobserve(entry.target);
            }
        });

        if (cardsInCurrentBatch.length > 0 && !staggerTimeout) {
            staggerTimeout = setTimeout(() => {
                // Apply 'card-visible' with a slight stagger for simultaneous cards
                cardsInCurrentBatch.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, index * 90); // ~90ms stagger
                });
                
                cardsInCurrentBatch = [];
                staggerTimeout = null;
            }, 50);
        }
    }, cardObserverOptions);

    cardsToAnimate.forEach(card => cardObserver.observe(card));
});
