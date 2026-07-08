import type { Editor } from '@tiptap/react';

export function togglePrimaryHeading(editor: Editor) {
  const isH1Exists = editor
    .getJSON()
    .content.some((node) => node.type === 'heading' && node.attrs?.level === 1);

  if (isH1Exists) {
    if (editor.isActive('heading', { level: 1 })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: 2 }).run();
    }
  } else {
    editor.chain().focus().toggleHeading({ level: 1 }).run();
  }
}
