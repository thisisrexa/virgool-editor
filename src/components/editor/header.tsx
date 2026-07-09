import { useCurrentEditor } from '@tiptap/react';
import { Clipboard, File } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';

import DocumentMenu from '@/components/editor/document-menu';
import {
  copyAsHtml,
  copyAsJson,
  copyAsMarkdown,
  copyAsText,
} from '@/components/editor/export/copy-to-clipboard';
import {
  exportAsHtml,
  exportAsJson,
  exportAsMarkdown,
  exportAsText,
} from '@/components/editor/export/export-document';
import { importFromJson } from '@/components/editor/export/import-document';
import FontPicker from '@/components/editor/fonts/font-picker';
import HeaderActionMenu from '@/components/editor/header-action-menu';
import { useEditorStore } from '@/components/editor/persistence/editor-store';
import { useEditorPersistence } from '@/components/editor/persistence/use-editor-persistence';
import ThemeSwitch from '@/components/theme/theme-switch';

export default function Header() {
  const { editor } = useCurrentEditor();
  const autoSave = useEditorStore((state) => state.autoSave);
  const importInputRef = useRef<HTMLInputElement>(null);

  useEditorPersistence(editor ?? null);

  const handleImportJson = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const input = event.target;

    if (!file || !editor) {
      return;
    }

    void importFromJson(editor, file, autoSave)
      .catch((error: unknown) => {
        console.error(error);
      })
      .finally(() => {
        input.value = '';
      });
  };

  return (
    <header className="px-4 flex gap-2 justify-between items-center">
      <img
        src="https://www.datocms-assets.com/147472/1734442372-circle-quarter-alternates.svg"
        alt="Virgool Editor Logo"
        className="aspect-square object-cover max-w-6"
      />
      <div className="flex items-center gap-1">
        <FontPicker />
        <ThemeSwitch />
        <DocumentMenu
          onImportJson={() => importInputRef.current?.click()}
          onSaveJson={() => editor && exportAsJson(editor)}
        />
        <HeaderActionMenu
          icon={<Clipboard />}
          tooltip="Clipboard"
          label="Clipboard"
          items={[
            {
              label: 'Copy as Text',
              onClick: () => editor && copyAsText(editor),
            },
            {
              label: 'Copy as Markdown',
              onClick: () => editor && copyAsMarkdown(editor),
            },
            {
              label: 'Copy as HTML',
              onClick: () => editor && copyAsHtml(editor),
            },
            {
              label: 'Copy as JSON',
              onClick: () => editor && copyAsJson(editor),
            },
          ]}
        />
        <HeaderActionMenu
          icon={<File />}
          tooltip="Export to file"
          label="Export"
          items={[
            {
              label: 'Export to Text',
              onClick: () => editor && exportAsText(editor),
            },
            {
              label: 'Export to Markdown',
              onClick: () => editor && exportAsMarkdown(editor),
            },
            {
              label: 'Export to HTML',
              onClick: () => editor && exportAsHtml(editor),
            },
          ]}
        />
        <input
          ref={importInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          onChange={handleImportJson}
        />
      </div>
    </header>
  );
}
