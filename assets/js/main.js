// Smooth-scroll for nav (optional)
document.querySelectorAll('nav a').forEach(link =>
  link.addEventListener('click', e => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      document.querySelector(link.getAttribute('href'))
              .scrollIntoView({ behavior: 'smooth' });
    }
  })
);

// Project search filter + sort
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('project-search');

  // Cache containers & initial cards/order
  const sections = [
    { sect: document.getElementById('sw-section'), cont: document.getElementById('sw-projects') },
    { sect: document.getElementById('rw-section'), cont: document.getElementById('rw-projects') }
  ];

  sections.forEach(({ cont }) => {
    Array.from(cont.children).forEach((card, idx) => {
      card.dataset.initIndex = idx;
    });
  });

  const divider = document.getElementById('section-divider');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();

    let anySectionVisible = false;

    sections.forEach(({ sect, cont }) => {
      const cards = Array.from(cont.children);
      let results;

      if (q === '') {
        // restore original order
        results = cards.sort((a, b) => a.dataset.initIndex - b.dataset.initIndex);
      } else {
        // filter & sort by index of match
        results = cards
          .map(card => {
            const text = card.textContent.toLowerCase();
            const idx = text.indexOf(q);
            return { card, idx };
          })
          .filter(x => x.idx !== -1)
          .sort((a, b) => a.idx - b.idx)
          .map(x => x.card);
      }

      // apply results
      cont.innerHTML = '';
      results.forEach(card => cont.appendChild(card));

      // show/hide section
      const visible = results.length > 0;
      sect.style.display = visible ? '' : 'none';
      if (visible) anySectionVisible = true;
    });

    // hide divider if either section is hidden
    if (input.value.trim() === '') {
      divider.style.display = '';
    } else {
      divider.style.display = anySectionVisible && sections.every(({ sect }) => sect.style.display === '') ? '' : 'none';
    }
  });
});
