// assets/js/main.js

// Smooth-scroll (optional)
document.querySelectorAll('nav a').forEach(link =>
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    }
  })
);

// Project search filter
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('project-search');
  const cards = Array.from(document.querySelectorAll('.project-card'));

  input.addEventListener('input', () => {
    const q = input.value.toLowerCase();
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      card.style.display = text.includes(q) ? '' : 'none';
    });
  });
});
