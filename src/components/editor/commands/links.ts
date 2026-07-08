import type { Editor } from '@tiptap/react';

export function setLink(editor: Editor, href: string) {
  if (href === '') {
    unsetLink(editor);
    return;
  }

  editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
}

export function unsetLink(editor: Editor) {
  editor.chain().focus().extendMarkRange('link').unsetLink().run();
}
