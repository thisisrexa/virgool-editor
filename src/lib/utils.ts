import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function download(blob: Blob, filename?: string) {
  const blobURL = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobURL;
  link.download = filename ?? 'download';
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(blobURL);
}

export function getHeadingByHtml(html: string) {
  const fragment = document.createElement('div');
  fragment.innerHTML = html;
  const heading =
    fragment.querySelector('h1') ||
    fragment.querySelector('h2') ||
    fragment.querySelector('h3');
  return heading?.textContent?.toLocaleLowerCase().trim() ?? 'new document';
}
