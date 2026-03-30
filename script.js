// ===== JOFFENFONDET - SCRIPT.JS =====

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
    } else {
          navbar.classList.remove('scrolled');
    }
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
          navLinks.classList.toggle('open');
          navToggle.classList.toggle('active');
    });
    // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.classList.remove('active');
        });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
                  e.preventDefault();
                  const offset = 80;
                  const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                  window.scrollTo({ top, behavior: 'smooth' });
          }
    });
});

// Contact form handler
function handleForm(e) {
    e.preventDefault();
    const successEl = document.getElementById('formSuccess');
    if (successEl) {
          successEl.style.display = 'block';
          e.target.reset();
          setTimeout(() => { successEl.style.display = 'none'; }, 4000);
    }
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
          if (entry.isIntersecting) {
                  entry.target.style.opacity = '1';
                  entry.target.style.transform = 'translateY(0)';
          }
    });
}, observerOptions);

// Apply animation to cards and sections
document.querySelectorAll('.grant-card, .value-item, .step, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          if (window.pageYOffset >= sectionTop) {
                  current = section.getAttribute('id');
          }
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + current) {
                  link.classList.add('active');
          }
    });
});

// Counter animation for stats
function animateCounter(el, target, duration) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
          start += step;
          if (start >= target) {
                  el.textContent = target.toLocaleString() + (el.dataset.suffix || '');
                  clearInterval(timer);
          } else {
                  el.textContent = Math.floor(start).toLocaleString() + (el.dataset.suffix || '');
          }
    }, 16);
}

// Console message
console.log('%c Joffenfondet - Fotballglede i Joffens and ', 'background: #1a6b3c; color: white; padding: 10px; font-size: 16px; border-radius: 4px;');
