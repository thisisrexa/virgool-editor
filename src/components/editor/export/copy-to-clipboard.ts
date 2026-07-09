import type { Editor } from '@tiptap/react';

import {
  type DocumentFormat,
  getDocumentContent,
} from '@/components/editor/export/document-content';

async function copyToClipboard(editor: Editor, format: DocumentFormat) {
  if (editor.isEmpty) {
    return;
  }

  const content = getDocumentContent(editor, format);

  try {
    if (format === 'html') {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([content], { type: 'text/html' }),
          'text/plain': new Blob([content], { type: 'text/plain' }),
        }),
      ]);
      return;
    }

    await navigator.clipboard.writeText(content);
  } catch (error) {
    console.error(error);
  }
}

export function copyAsText(editor: Editor) {
  return copyToClipboard(editor, 'text');
}

export function copyAsMarkdown(editor: Editor) {
  return copyToClipboard(editor, 'markdown');
}

export function copyAsHtml(editor: Editor) {
  return copyToClipboard(editor, 'html');
}

export function copyAsJson(editor: Editor) {
  return copyToClipboard(editor, 'json');
}
