// ===== JOFFENFONDET - SCRIPT.JS =====

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navAnchorLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id], header[id]');
  const animatedElements = document.querySelectorAll('.grant-card, .value-item, .step, .stat-item');

  // Navbar scroll effect
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // Mobile nav toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navAnchorLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    });
  });

  // Contact form handler
  window.handleForm = function (e) {
    e.preventDefault();

    const form = e.target;
    const successEl = document.getElementById('formSuccess');

    if (successEl) {
      successEl.style.display = 'block';
      form.reset();

      setTimeout(() => {
        successEl.style.display = 'none';
      }, 4000);
    }
  };

  // Scroll animations
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    animatedElements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }

  // Active nav link on scroll
  function updateActiveNavLink() {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;

      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navAnchorLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // Counter animation
  function animateCounter(el, target, duration = 1200) {
    let startTimestamp = null;

    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * target);

      el.textContent = value.toLocaleString('no-NO') + (el.dataset.suffix || '');

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('no-NO') + (el.dataset.suffix || '');
      }
    }

    window.requestAnimationFrame(step);
  }

  // Example:
  // If you later add data-count attributes in HTML, these will animate automatically
  const statNumbers = document.querySelectorAll('.stat-num[data-count]');
  if (statNumbers.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);

          if (!Number.isNaN(target)) {
            animateCounter(el, target, 1400);
          }

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach((el) => counterObserver.observe(el));
  }

  // Console message
  console.log(
    '%c Joffenfondet – Fotballglede i Joffens ånd ',
    'background: #1a6b3c; color: white; padding: 10px; font-size: 16px; border-radius: 4px;'
  );
});
