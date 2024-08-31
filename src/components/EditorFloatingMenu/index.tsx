import { useState, useCallback } from 'react';
import { FloatingMenu, useCurrentEditor } from '@tiptap/react';
import cn from '@/utils/cn';

export default function EditorFloatingMenu() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState(false);

  const handleToggleMenu = () => {
    setOpen(!open);
    open
      ? document.documentElement.style.setProperty('--placeholder-opacity', '1')
      : document.documentElement.style.setProperty(
          '--placeholder-opacity',
          '0'
        );
  };

  const handleSetImageURL = useCallback(() => {
    const url = window.prompt('URL');
    const alt = window.prompt('Alt');

    if (url && alt) {
      editor?.chain().focus().setImage({ src: url, alt: alt }).run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor}>
      <div className="flex">
        <button
          className="p-1 ring-1 ring-black rounded-full flex justify-center items-center"
          onClick={handleToggleMenu}>
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            className={cn(
              'w-6 h-6 transition-transform duration-200',
              open && 'rotate-45'
            )}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <div
          className={cn(
            'hidden items-center absolute w-96 right-8 top-1/2 -translate-y-1/2 gap-x-3 pr-6',
            open && 'flex'
          )}>
          <button onClick={handleSetImageURL}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-8 h-8 p-1.5 ring-1 ring-black rounded-full flex justify-center items-center">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </FloatingMenu>
  );
}
