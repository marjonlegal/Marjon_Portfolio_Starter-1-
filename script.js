const smoothLinks = document.querySelectorAll('a[href^="#"]');

smoothLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (targetId.startsWith('#') && document.querySelector(targetId)) {
      event.preventDefault();
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main section[id]'));

const updateHeader = () => {
  if (header) {
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }
};

const updateActiveLink = () => {
  let currentId = 'hero';
  const offset = window.innerHeight * 0.3;

  sections.forEach((section) => {
    const top = section.offsetTop - offset;
    const bottom = top + section.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${currentId}`;
    link.classList.toggle('active', isActive);
  });
};

window.addEventListener('scroll', () => {
  updateHeader();
  updateActiveLink();
}, { passive: true });

updateHeader();
updateActiveLink();

const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-target]');

const animateCounter = (counter) => {
  const target = Number(counter.getAttribute('data-target') || 0);
  const prefix = counter.getAttribute('data-prefix') || '';
  const suffix = counter.getAttribute('data-suffix') || '';
  const duration = 900;
  const startTime = performance.now();

  const updateValue = (timestamp) => {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.round(target * eased);

    counter.textContent = `${prefix}${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(updateValue);
    } else {
      counter.textContent = `${prefix}${target}${suffix}`;
    }
  };

  requestAnimationFrame(updateValue);
};

const statsSection = document.querySelector('#stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        counters.forEach((counter) => animateCounter(counter));
        observer.disconnect();
      }
    });
  }, { threshold: 0.55 });

  statsObserver.observe(statsSection);
}
