import { EditorProvider } from '@tiptap/react';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';

import EditorBubbleMenu from '@/components/EditorBubbleMenu';
import EditorFloatingMenu from '@/components/EditorFloatingMenu';
import Header from '@/components/Header';

const extensions = [
  StarterKit.configure({ link: false }),
  Link,
  Image,
  Youtube,
  Placeholder.configure({
    placeholder: 'Start typing...',
  }),
];

export default function Editor() {
  return (
    <EditorProvider
      extensions={extensions}
      shouldRerenderOnTransaction
      slotBefore={<Header />}
    >
      <EditorBubbleMenu />
      <EditorFloatingMenu />
    </EditorProvider>
  );
}
