document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Copyright Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    // Calculate Years of Experience (Started in 2012)
    const experienceStat = document.querySelector('[data-target="12"]');
    if (experienceStat) {
        const startYear = 2012;
        const currentYear = new Date().getFullYear();
        experienceStat.setAttribute('data-target', currentYear - startYear);
    }

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero
    const hero = document.querySelector('.hero');
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (hero && parallaxBg) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) - 0.5;
            const y = (e.clientY / window.innerHeight) - 0.5;
            
            parallaxBg.style.transform = `translate(${x * 30}px, ${y * 30}px) scale(1.1)`;
        });
    }

    // Animated Counters
    const stats = document.querySelectorAll('.stat-number');
    const statsObserverOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateValue(entry.target, 0, target, 2000);
                entry.target.classList.add('animated');
            }
        });
    }, statsObserverOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end + (end === 12 || end === 500 ? '+' : '');
            }
        };
        window.requestAnimationFrame(step);
    }

    // Contact Form Handling
    const contactForm = document.getElementById('portfolio-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Envoi en cours...';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                
                formFeedback.style.display = 'block';
                formFeedback.style.color = '#15803d'; // Green-700
                formFeedback.textContent = 'Merci ! Votre message a été envoyé avec succès.';
                
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 1500);
        });
    }

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
            backToTop.style.alignItems = 'center';
            backToTop.style.justifyContent = 'center';
        } else {
            backToTop.style.display = 'none';
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Simple scroll animation for cards and timeline items
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.award-card, .timeline-item, .service-card, .publication-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
