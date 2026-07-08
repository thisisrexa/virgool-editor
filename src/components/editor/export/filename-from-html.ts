export function filenameFromHtml(html: string) {
  const fragment = document.createElement('div');
  fragment.innerHTML = html;
  const heading =
    fragment.querySelector('h1') ??
    fragment.querySelector('h2') ??
    fragment.querySelector('h3');
  return heading?.textContent.toLocaleLowerCase().trim() ?? 'new document';
}
