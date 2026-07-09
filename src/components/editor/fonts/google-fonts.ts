interface GoogleFont {
  family: string;
  label: string;
  category: 'mono' | 'rtl' | 'sans' | 'serif';
}

export const DEFAULT_FONT_FAMILY = 'Literata';

export const GOOGLE_FONTS: GoogleFont[] = [
  { family: 'Literata', label: 'Literata', category: 'serif' },
  { family: 'Lora', label: 'Lora', category: 'serif' },
  { family: 'Merriweather', label: 'Merriweather', category: 'serif' },
  { family: 'Inter', label: 'Inter', category: 'sans' },
  { family: 'Source Sans 3', label: 'Source Sans 3', category: 'sans' },
  { family: 'Nunito', label: 'Nunito', category: 'sans' },
  { family: 'Vazirmatn', label: 'Vazirmatn', category: 'rtl' },
  {
    family: 'IBM Plex Sans Arabic',
    label: 'IBM Plex Sans Arabic',
    category: 'rtl',
  },
  { family: 'Noto Naskh Arabic', label: 'Noto Naskh Arabic', category: 'rtl' },
  { family: 'JetBrains Mono', label: 'JetBrains Mono', category: 'mono' },
];

const loadedFonts = new Set<string>();

function buildGoogleFontsUrl(family: string) {
  const encoded = family.replace(/ /g, '+');
  return `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
}

export function loadGoogleFont(family: string) {
  if (loadedFonts.has(family)) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = buildGoogleFontsUrl(family);
  document.head.appendChild(link);
  loadedFonts.add(family);
}

export function getFontFamilyCss(family: string) {
  const font = GOOGLE_FONTS.find((entry) => entry.family === family);
  const fallback =
    font?.category === 'mono'
      ? 'monospace'
      : font?.category === 'sans'
        ? 'sans-serif'
        : 'serif';

  return `"${family}", ${fallback}`;
}
