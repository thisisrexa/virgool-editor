import { useCallback } from 'react';
import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import cn from '@/utils/cn';

export default function EditorBubbleMenu() {
  const { editor } = useCurrentEditor();

  const handleSetLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: url })
      .run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor}>
      <div className="bg-black px-4 py-3 rounded-md flex gap-x-4 flex-row-reverse text-white">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-5 h-5',
              editor.isActive('bold') && 'text-blue-500'
            )}>
            <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
            <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
          </svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-5 h-5',
              editor.isActive('italic') && 'text-blue-500'
            )}>
            <line x1="19" y1="4" x2="10" y2="4"></line>
            <line x1="14" y1="20" x2="5" y2="20"></line>
            <line x1="15" y1="4" x2="9" y2="20"></line>
          </svg>
        </button>
        <button
          onClick={() => {
            if (!document.querySelector('h1')) {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            } else {
              editor.chain().focus().toggleHeading({ level: 2 }).run();
            }
          }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-5 h-5',
              editor.isActive('heading', { level: 1 }) && 'text-blue-500',
              editor.isActive('heading', { level: 2 }) && 'text-blue-500'
            )}>
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-4 h-4',
              editor.isActive('heading', { level: 3 }) && 'text-blue-500'
            )}>
            <polyline points="4 7 4 4 20 4 20 7"></polyline>
            <line x1="9" y1="20" x2="15" y2="20"></line>
            <line x1="12" y1="4" x2="12" y2="20"></line>
          </svg>
        </button>
        <button onClick={handleSetLink}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-5 h-5',
              editor.isActive('link') && 'text-blue-500'
            )}>
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </button>
      </div>
    </BubbleMenu>
  );
}
