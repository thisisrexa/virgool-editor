import type { JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';

import { CONTENT_KEY } from '@/components/editor/persistence/storage-keys';

function isValidTiptapDoc(content: unknown): content is JSONContent {
  return (
    typeof content === 'object' &&
    content !== null &&
    'type' in content &&
    content.type === 'doc'
  );
}

export function importFromJson(editor: Editor, file: File, autoSave: boolean) {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const parsed: unknown = JSON.parse(reader.result as string);

        if (!isValidTiptapDoc(parsed)) {
          reject(new Error('Invalid Tiptap document'));
          return;
        }

        if (
          !editor.isEmpty &&
          // eslint-disable-next-line no-alert -- simple replace confirmation
          !window.confirm('Replace current content?')
        ) {
          resolve();
          return;
        }

        editor.commands.setContent(parsed);

        if (autoSave) {
          localStorage.setItem(CONTENT_KEY, JSON.stringify(parsed));
        }

        resolve();
      } catch {
        reject(new Error('Failed to parse JSON file'));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
