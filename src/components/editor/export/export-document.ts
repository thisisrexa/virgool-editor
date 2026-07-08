import type { Editor } from '@tiptap/react';

import { downloadBlob } from '@/components/editor/export/download-blob';
import { filenameFromHtml } from '@/components/editor/export/filename-from-html';
import { turndownService } from '@/components/editor/export/turndown';

function getFilename(editor: Editor) {
  return filenameFromHtml(editor.getHTML());
}

export function exportAsText(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  const filename = getFilename(editor);
  downloadBlob(
    new Blob([editor.getText()], { type: 'text/plain' }),
    `${filename}.txt`,
  );
}

export function exportAsMarkdown(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  const filename = getFilename(editor);
  downloadBlob(
    new Blob([turndownService.turndown(editor.getHTML())], {
      type: 'text/markdown',
    }),
    `${filename}.md`,
  );
}

export function exportAsHtml(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  const filename = getFilename(editor);
  downloadBlob(
    new Blob([editor.getHTML()], { type: 'text/html' }),
    `${filename}.html`,
  );
}
