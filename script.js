document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-js');

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const scrollButton = document.querySelector('[data-scroll-target]');
  if (scrollButton) {
    scrollButton.addEventListener('click', (event) => {
      const targetSelector = event.currentTarget.getAttribute('data-scroll-target');
      const target = document.querySelector(targetSelector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  const form = document.querySelector('.contact-form');
  const popup = document.querySelector('.form-popup');
  const popupClose = popup?.querySelector('.btn-secondary');

  if (form && popup && popupClose) {
    const submitButton = form.querySelector('[type="submit"]');

    const showPopup = () => {
      popup.classList.add('active');
      form.reset();
      setTimeout(() => {
        popup.querySelector('button')?.focus();
      }, 120);
    };

    const setSubmitting = (isSubmitting) => {
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.setAttribute('aria-busy', String(isSubmitting));
    };

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      setSubmitting(true);

      const formData = new FormData(form);
      const encoded = new URLSearchParams(formData).toString();

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          showPopup();
        })
        .catch(() => {
          alert('Something went wrong. Please try again.');
        })
        .finally(() => {
          setSubmitting(false);
        });
    });

    popupClose.addEventListener('click', () => {
      popup.classList.remove('active');
      scrollButton?.focus();
    });

    popup.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.classList.remove('active');
      }
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (window.gsap && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.site-header', {
      y: -60,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
    });

    gsap.from('.hero-mark', {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.1,
    });

    gsap.from('.hero-logo', {
      opacity: 0,
      y: 40,
      duration: 1.1,
      ease: 'power3.out',
      delay: 0.2,
    });

    gsap.from('.hero-tagline', {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out',
      delay: 0.35,
    });

    gsap.from('.hero-lede', {
      opacity: 0,
      y: 35,
      duration: 1,
      ease: 'power3.out',
      delay: 0.45,
    });

    gsap.from('.hero .btn-primary', {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      delay: 0.45,
    });

    gsap.from('.hero-stats .stat-card', {
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.55,
      stagger: 0.08,
    });

    gsap.utils.toArray('.media-card').forEach((card, index) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4 + index * 0.12,
      });
    });

    gsap.from('.orb', {
      scale: 0.6,
      opacity: 0,
      duration: 1.4,
      ease: 'power3.out',
      stagger: 0.15,
      delay: 0.4,
    });

    gsap.utils.toArray('.fade-section').forEach((section) => {
      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    gsap.utils.toArray('.product-card').forEach((card, index) => {
      gsap.from(card, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        delay: index * 0.05,
      });
    });

    gsap.utils.toArray('.why-card').forEach((card) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    gsap.utils.toArray('.client-card').forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  } else {
    document.querySelectorAll('.fade-section').forEach((section) => {
      section.style.opacity = 1;
      section.style.transform = 'none';
    });
  }
});
