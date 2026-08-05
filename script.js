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

const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
const observerOptions = { threshold: 0.18 };

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

const counters = document.querySelectorAll('[data-target]');

const animateCounter = (counter) => {
  const updateValue = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = Math.max(1, Math.floor(target / 60));

    if (current < target) {
      counter.innerText = current + increment;
      requestAnimationFrame(updateValue);
    } else {
      counter.innerText = target;
    }
  };

  updateValue();
};

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      counters.forEach((counter) => animateCounter(counter));
      observer.disconnect();
    }
  });
}, { threshold: 0.6 });

const statsSection = document.querySelector('#stats');
if (statsSection) {
  statsObserver.observe(statsSection);
}
