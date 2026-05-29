// Custom Cursor
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  follower.style.left = e.clientX + 'px';
  follower.style.top = e.clientY + 'px';
});
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%,-50%) scale(2.5)');
  el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  const open = mobileMenu.classList.contains('open');
  spans[0].style.transform = open ? 'translateY(7.5px) rotate(45deg)' : '';
  spans[1].style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.querySelectorAll('span').forEach(s => s.style.transform = '');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.section-header, .about-grid, .skills-grid, .projects-grid, .contact-grid, .hero-left, .hero-right, .hero-card, .hero-counter');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => { el.classList.add('reveal'); observer.observe(el); });

// Smooth scroll with offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#238636';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message →';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

// Active nav highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const secObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${entry.target.id}` ? 'var(--white)' : '';
      });
    }
  });
}, { threshold: 0.5 });
sections.forEach(s => secObserver.observe(s));
// More Projects Toggle
const moreProjectsBtn = document.getElementById('moreProjectsBtn');
const moreProjects = document.getElementById('moreProjects');

if (moreProjectsBtn && moreProjects) {
  moreProjectsBtn.addEventListener('click', () => {
    moreProjects.classList.toggle('show');

    moreProjectsBtn.textContent =
      moreProjects.classList.contains('show')
        ? 'Hide Projects ↑'
        : 'More Projects ↓';
  });
}