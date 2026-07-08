import type { Editor } from '@tiptap/react';

import { useEffect } from 'react';

import { CONTENT_KEY } from '@/components/editor/persistence/storage-keys';

export function useContentRestore(editor: Editor | null) {
  useEffect(() => {
    const storedContent = localStorage.getItem(CONTENT_KEY);

    if (storedContent && editor) {
      editor.commands.setContent(JSON.parse(storedContent));
    }
  }, [editor]);
}
