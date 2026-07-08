import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';

export const editorExtensions = [
  StarterKit.configure({ link: false }),
  Link,
  Image,
  Youtube,
  Placeholder.configure({
    placeholder: 'Start typing...',
  }),
];
