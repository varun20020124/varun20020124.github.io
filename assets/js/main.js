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

// Character counter for Contact page
const msgInput = document.getElementById('contact-message');
const msgCount = document.getElementById('message-count');
if (msgInput && msgCount) {
  // initialize
  msgCount.textContent = msgInput.value.length;
  msgInput.addEventListener('input', () => {
    msgCount.textContent = msgInput.value.length;
  });
}

// Scroll-progress bar
const scrollIndicator = document.getElementById('scroll-indicator');
if (scrollIndicator) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollIndicator.style.height = pct + '%';
  });
}

// Simple math CAPTCHA for contact form
(function() {
  const qEl = document.getElementById('captcha-question');
  const ansEl = document.getElementById('captcha-answer');
  const verifyBtn = document.getElementById('captcha-verify');
  const feedback = document.getElementById('captcha-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (!qEl || !ansEl || !verifyBtn || !submitBtn) return;

  let a, b, correct;

  function newChallenge() {
    a = Math.floor(Math.random() * 10) + 1;
    b = Math.floor(Math.random() * 10) + 1;
    correct = a + b;
    qEl.textContent = `What is ${a} + ${b}?`;
    ansEl.value = '';
    feedback.classList.add('hidden');
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
  }

  verifyBtn.addEventListener('click', () => {
    if (parseInt(ansEl.value, 10) === correct) {
      feedback.classList.add('hidden');
      submitBtn.disabled = false;
      submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
      verifyBtn.textContent = 'Verified';
      verifyBtn.disabled = true;
    } else {
      feedback.classList.remove('hidden');
      newChallenge();
    }
  });

  // initialize on page load
  newChallenge();
})();

