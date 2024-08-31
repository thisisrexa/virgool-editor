import saveAs from '@/utils/saveAs';
import { useCurrentEditor } from '@tiptap/react';
import TurndownService from 'turndown';

export default function Header() {
  const { editor } = useCurrentEditor();

  const handleExportMarkdown = () => {
    const turndownService = new TurndownService({
      headingStyle: 'atx',
    });

    saveAs(
      new Blob([turndownService.turndown(editor?.getHTML() || '')], {
        type: 'text/markdown',
      }),
      'export.md'
    );
  };

  const handleExportHTML = () => {
    saveAs(
      new Blob([editor?.getHTML() || ''], { type: 'text/html' }),
      'export.html'
    );
  };

  const handleExportText = () => {
    saveAs(
      new Blob([editor?.getText() || ''], { type: 'text/plain' }),
      'export.txt'
    );
  };

  return (
    <header className="px-4 flex gap-2 flex-col sm:flex-row-reverse">
      <button
        onClick={handleExportMarkdown}
        className="bg-gray-200 px-4 py-2 shadow-sm rounded-md font-medium hover:opacity-80 transition-opacity duration-200 disabled:opacity-40"
        disabled={editor?.isEmpty ? true : false}>
        Save as Markdown
      </button>
      <button
        onClick={handleExportHTML}
        className="bg-gray-200 px-4 py-2 shadow-sm rounded-md font-medium hover:opacity-80 transition-opacity duration-200 disabled:opacity-40"
        disabled={editor?.isEmpty ? true : false}>
        Save as HTML
      </button>
      <button
        onClick={handleExportText}
        className="bg-gray-200 px-4 py-2 shadow-sm rounded-md font-medium hover:opacity-80 transition-opacity duration-200 disabled:opacity-40"
        disabled={editor?.isEmpty ? true : false}>
        Save as Text
      </button>
    </header>
  );
}
