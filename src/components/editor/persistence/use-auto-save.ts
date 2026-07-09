import type { Editor } from '@tiptap/react';

import { useEffect } from 'react';

import { CONTENT_KEY } from '@/components/editor/persistence/storage-keys';

const DEBOUNCE_MS = 500;

export function useAutoSave(editor: Editor | null, enabled: boolean = true) {
  useEffect(() => {
    if (!editor || !enabled) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;

    const save = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        localStorage.setItem(CONTENT_KEY, JSON.stringify(editor.getJSON()));
      }, DEBOUNCE_MS);
    };

    editor.on('update', save);

    return () => {
      clearTimeout(timeout);
      editor.off('update', save);
    };
  }, [editor, enabled]);
}
