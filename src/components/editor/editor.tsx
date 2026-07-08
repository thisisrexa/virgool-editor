import { EditorProvider } from '@tiptap/react';

import BubbleMenu from '@/components/editor/bubble-menu';
import { editorExtensions } from '@/components/editor/extensions';
import FloatingMenu from '@/components/editor/floating-menu';
import Header from '@/components/editor/header';

export default function Editor() {
  return (
    <EditorProvider
      extensions={editorExtensions}
      shouldRerenderOnTransaction
      slotBefore={<Header />}
    >
      <BubbleMenu />
      <FloatingMenu />
    </EditorProvider>
  );
}
