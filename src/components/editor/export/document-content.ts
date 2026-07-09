import type { Editor } from '@tiptap/react';

import { filenameFromHtml } from '@/components/editor/export/filename-from-html';
import { turndownService } from '@/components/editor/export/turndown';

export type DocumentFormat = 'html' | 'json' | 'markdown' | 'text';

export function getDocumentContent(
  editor: Editor,
  format: DocumentFormat,
): string {
  switch (format) {
    case 'text':
      return editor.getText();

    case 'markdown':
      return turndownService.turndown(editor.getHTML());

    case 'html':
      return editor.getHTML();

    case 'json':
      return JSON.stringify(editor.getJSON(), null, 2);
  }
}

export function getDocumentFilename(editor: Editor) {
  return filenameFromHtml(editor.getHTML());
}
