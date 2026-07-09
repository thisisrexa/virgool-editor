import type { Editor } from '@tiptap/react';

import {
  type DocumentFormat,
  getDocumentContent,
  getDocumentFilename,
} from '@/components/editor/export/document-content';
import { downloadBlob } from '@/components/editor/export/download-blob';

const MIME_TYPES: Record<DocumentFormat, string> = {
  text: 'text/plain',
  markdown: 'text/markdown',
  html: 'text/html',
  json: 'application/json',
};

const EXTENSIONS: Record<DocumentFormat, string> = {
  text: 'txt',
  markdown: 'md',
  html: 'html',
  json: 'json',
};

function exportDocument(editor: Editor, format: DocumentFormat) {
  if (editor.isEmpty) {
    return;
  }

  const filename = getDocumentFilename(editor);
  const content = getDocumentContent(editor, format);

  downloadBlob(
    new Blob([content], { type: MIME_TYPES[format] }),
    `${filename}.${EXTENSIONS[format]}`,
  );
}

export function exportAsText(editor: Editor) {
  exportDocument(editor, 'text');
}

export function exportAsMarkdown(editor: Editor) {
  exportDocument(editor, 'markdown');
}

export function exportAsHtml(editor: Editor) {
  exportDocument(editor, 'html');
}

export function exportAsJson(editor: Editor) {
  exportDocument(editor, 'json');
}
