import type { Editor } from '@tiptap/react';

import { filenameFromHtml } from '@/components/editor/export/filename-from-html';
import { turndownService } from '@/components/editor/export/turndown';

export type DocumentFormat = 'text' | 'markdown' | 'html';

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
  }
}

export function getDocumentFilename(editor: Editor) {
  return filenameFromHtml(editor.getHTML());
}
