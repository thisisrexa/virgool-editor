import { EditorProvider } from '@tiptap/react';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

import EditorBubbleMenu from '@/components/EditorBubbleMenu';
import EditorFloatingMenu from '@/components/EditorFloatingMenu';
import Header from '@/components/Header';

const extensions = [
  StarterKit,
  BubbleMenu,
  Link,
  Image,
  Placeholder.configure({
    placeholder: 'هرچیزی که دوست داری بنویس...',
  }),
];

export default function Editor() {
  return (
    <EditorProvider extensions={extensions}>
      <Header />
      <EditorBubbleMenu />
      <EditorFloatingMenu />
    </EditorProvider>
  );
}
