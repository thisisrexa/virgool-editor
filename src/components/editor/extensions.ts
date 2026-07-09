import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Placeholder } from '@tiptap/extensions';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockShiki from 'tiptap-extension-code-block-shiki';

export const editorExtensions = [
  StarterKit.configure({ link: false, codeBlock: false }),
  CodeBlockShiki.configure({
    defaultTheme: 'github-dark',
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
    HTMLAttributes: {
      spellcheck: 'false',
    },
  }),
  Link,
  Image,
  Youtube.configure({ width: 640, height: 360, nocookie: true }),
  Placeholder.configure({
    placeholder: 'Start typing...',
  }),
];
