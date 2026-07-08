import type { Editor } from '@tiptap/react';

import { useEffect } from 'react';

import { CONTENT_KEY } from '@/components/editor/persistence/storage-keys';

export function useContentRestore(editor: Editor | null) {
  useEffect(() => {
    if (!editor) {
      return;
    }

    const storedContent = localStorage.getItem(CONTENT_KEY);
    if (!storedContent) {
      return;
    }

    try {
      editor.commands.setContent(JSON.parse(storedContent));
    } catch {
      localStorage.removeItem(CONTENT_KEY);
    }
  }, [editor]);
}
