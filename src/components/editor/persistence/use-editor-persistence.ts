import type { Editor } from '@tiptap/react';

import { useEditorStore } from '@/components/editor/persistence/editor-store';
import { useAutoSave } from '@/components/editor/persistence/use-auto-save';
import { useContentRestore } from '@/components/editor/persistence/use-content-restore';

export function useEditorPersistence(editor: Editor | null) {
  const autoSave = useEditorStore((state) => state.autoSave);

  useContentRestore(editor);
  useAutoSave(editor, autoSave);
}
