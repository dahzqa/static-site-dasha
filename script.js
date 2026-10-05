const navItems = [...document.querySelectorAll('.project-nav__item')];
const sections = [...document.querySelectorAll('[data-project-section]')];
const telegramLink = document.querySelector('.telegram-link');
const footer = document.querySelector('.site-footer');

setActive(null);

function setActive(id) {
  navItems.forEach(item => {
    item.classList.toggle('is-active', item.dataset.project === id);
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (visible) setActive(visible.target.dataset.projectSection || null);
}, {
  root: null,
  rootMargin: '-38% 0px -38% 0px',
  threshold: [0, .05, .2, .5, .8, 1]
});

sections.forEach(section => sectionObserver.observe(section));

navItems.forEach(item => {
  item.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById(item.dataset.project)?.scrollIntoView({ behavior: 'smooth' });
  });
});

if (footer && telegramLink) {
  const footerObserver = new IntersectionObserver(([entry]) => {
    telegramLink.classList.toggle('is-hidden', entry.isIntersecting);
  }, { threshold: 0.02 });
  footerObserver.observe(footer);
}

