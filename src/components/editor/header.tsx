import { useCurrentEditor } from '@tiptap/react';
import { Clipboard, File, Save, SaveOff } from 'lucide-react';
import { useState } from 'react';

import {
  copyAsHtml,
  copyAsMarkdown,
  copyAsText,
} from '@/components/editor/export/copy-to-clipboard';
import {
  exportAsHtml,
  exportAsMarkdown,
  exportAsText,
} from '@/components/editor/export/export-document';
import HeaderActionMenu from '@/components/editor/header-action-menu';
import { AUTO_SAVE_KEY } from '@/components/editor/persistence/storage-keys';
import { useAutoSave } from '@/components/editor/persistence/use-auto-save';
import { useContentRestore } from '@/components/editor/persistence/use-content-restore';
import ThemeSwitch from '@/components/theme/theme-switch';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Header() {
  const { editor } = useCurrentEditor();
  const [autoSave, setAutoSave] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem(AUTO_SAVE_KEY) ?? 'true'),
  );

  useContentRestore(editor ?? null);
  useAutoSave(editor ?? null, autoSave);

  const handleAutoSave = () => {
    setAutoSave(!autoSave);
    localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(!autoSave));
  };

  return (
    <header className="px-4 flex gap-2 justify-between items-center">
      <img
        src="https://www.datocms-assets.com/147472/1734442372-circle-quarter-alternates.svg"
        alt="Virgool Editor Logo"
        className="aspect-square object-cover max-w-6"
      />
      <div className="flex items-center">
        <ThemeSwitch />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost" onClick={handleAutoSave}>
                {autoSave ? <Save /> : <SaveOff />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle auto save</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
      </div>
    </header>
  );
}
