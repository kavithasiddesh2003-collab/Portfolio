// Theme toggle: remembers the visitor's choice in localStorage,
// otherwise falls back to their OS light/dark preference (handled in CSS).
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function applyStoredTheme() {
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-theme', stored);
    }
  } catch (e) {
    // localStorage unavailable (private browsing, etc.) — silently fall back to system theme
  }
}

function toggleTheme() {
  const current = root.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch (e) {
    // ignore if storage isn't available
  }
}

applyStoredTheme();
if (toggleBtn) {
  toggleBtn.addEventListener('click', toggleTheme);
}
