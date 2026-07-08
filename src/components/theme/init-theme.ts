const THEME_KEY = 'theme';

export function initTheme() {
  if (localStorage.getItem(THEME_KEY) === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
