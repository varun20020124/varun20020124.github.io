// assets/js/main.js

(function() {
  // Grab elements
  const input = document.getElementById('project-search');
  const divider = document.getElementById('section-divider');
  const swSection = document.getElementById('sw-section');
  const swProjects = document.getElementById('sw-projects');
  const rwSection = document.getElementById('rw-section');
  const rwProjects = document.getElementById('rw-projects');

  // Sanity check
  if (!input || !divider || !swSection || !swProjects || !rwSection || !rwProjects) {
    console.error('Project search initialization failed:', {
      input, divider, swSection, swProjects, rwSection, rwProjects
    });
    return;
  }

  // Store original lists
  const sections = [
    { wrapper: swSection, container: swProjects, original: Array.from(swProjects.children) },
    { wrapper: rwSection, container: rwProjects, original: Array.from(rwProjects.children) },
  ];

  // Filter & sort function
  function filterAndSortCards(q, sec) {
    if (!q) return sec.original.slice();
    return sec.original
      .filter(card => card.textContent.toLowerCase().includes(q))
      .sort((a, b) => {
        const ai = a.textContent.toLowerCase().indexOf(q);
        const bi = b.textContent.toLowerCase().indexOf(q);
        return ai - bi;
      });
  }

  // On every keystroke
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    let anyVisible = false, allVisible = true;

    sections.forEach(sec => {
      const results = filterAndSortCards(q, sec);

      // Re-render
      sec.container.innerHTML = '';
      results.forEach(card => sec.container.appendChild(card));

      // Show/hide section
      const visible = results.length > 0;
      sec.wrapper.style.display = visible ? '' : 'none';
      anyVisible = anyVisible || visible;
      allVisible = allVisible && visible;
    });

    // Divider logic
    if (!q) divider.style.display = '';
    else divider.style.display = (anyVisible && allVisible) ? '' : 'none';
  });
})();
