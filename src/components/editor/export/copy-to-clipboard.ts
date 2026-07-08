import type { Editor } from '@tiptap/react';

import { turndownService } from '@/components/editor/export/turndown';

export async function copyAsText(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  try {
    await navigator.clipboard.writeText(editor.getText());
  } catch (error) {
    console.log(error);
  }
}

export async function copyAsMarkdown(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  try {
    await navigator.clipboard.writeText(
      turndownService.turndown(editor.getHTML()),
    );
  } catch (error) {
    console.log(error);
  }
}

export async function copyAsHtml(editor: Editor) {
  if (editor.isEmpty) {
    return;
  }

  try {
    await navigator.clipboard.writeText(editor.getHTML());
  } catch (error) {
    console.log(error);
  }
}
