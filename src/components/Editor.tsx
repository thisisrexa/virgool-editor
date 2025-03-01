import { EditorProvider } from '@tiptap/react';

import BubbleMenu from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import Youtube from '@tiptap/extension-youtube';

import EditorBubbleMenu from '@/components/EditorBubbleMenu';
import EditorFloatingMenu from '@/components/EditorFloatingMenu';
import Header from '@/components/Header';

const extensions = [
  StarterKit,
  BubbleMenu,
  Link,
  Image,
  Youtube,
  Placeholder.configure({
    placeholder: 'Start typing...',
  }),
];

export default function Editor() {
  return (
    <EditorProvider extensions={extensions} slotBefore={<Header />}>
      <EditorBubbleMenu />
      <EditorFloatingMenu />
    </EditorProvider>
  );
}
