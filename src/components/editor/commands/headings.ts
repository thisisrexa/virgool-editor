import type { Editor } from '@tiptap/react';

type HeadingLevel = 1 | 2 | 3;

export function toggleHeading(editor: Editor, level: HeadingLevel) {
  editor.chain().focus().toggleHeading({ level }).run();
}
