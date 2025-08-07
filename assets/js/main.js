// assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('project-search');
  const divider = document.getElementById('section-divider');

  // Grab sections and their containers
  const sections = [
    { wrapper: document.getElementById('sw-section'), container: document.getElementById('sw-projects') },
    { wrapper: document.getElementById('rw-section'), container: document.getElementById('rw-projects') }
  ];

  // Store original cards for each section
  sections.forEach(sec => {
    sec.original = Array.from(sec.container.children);
  });

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let anyVisible = false;
    let allVisible = true;

    sections.forEach(sec => {
      // Filter & sort
      let results;
      if (!q) {
        results = sec.original.slice();
      } else {
        results = sec.original
          .filter(card => card.textContent.toLowerCase().includes(q))
          .sort((a, b) => {
            const ai = a.textContent.toLowerCase().indexOf(q);
            const bi = b.textContent.toLowerCase().indexOf(q);
            return ai - bi;
          });
      }

      // Re-render section
      sec.container.innerHTML = '';
      results.forEach(card => sec.container.appendChild(card));

      // Show/hide wrapper
      const visible = results.length > 0;
      sec.wrapper.style.display = visible ? '' : 'none';
      anyVisible = anyVisible || visible;
      allVisible = allVisible && visible;
    });

    // Divider is only shown when both sections are visible (or both empty on empty query)
    if (!q) {
      divider.style.display = '';
    } else {
      divider.style.display = allVisible && anyVisible ? '' : 'none';
    }
  });
});
