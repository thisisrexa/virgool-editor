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
import { AUTO_SAVE_KEY } from '@/components/editor/persistence/storage-keys';
import { useAutoSave } from '@/components/editor/persistence/use-auto-save';
import { useContentRestore } from '@/components/editor/persistence/use-content-restore';
import ThemeSwitch from '@/components/theme/theme-switch';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <Clipboard />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>
                <p>Clipboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Clipboard</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => editor && copyAsText(editor)}>
                Copy as Text
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor && copyAsMarkdown(editor)}
              >
                Copy as Markdown
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor && copyAsHtml(editor)}>
                Copy as HTML
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <TooltipProvider>
            <Tooltip>
              <DropdownMenuTrigger asChild>
                <TooltipTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <File />
                  </Button>
                </TooltipTrigger>
              </DropdownMenuTrigger>
              <TooltipContent>
                <p>Export to file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Export</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => editor && exportAsText(editor)}>
                Export to Text
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor && exportAsMarkdown(editor)}
              >
                Export to Markdown
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor && exportAsHtml(editor)}>
                Export to HTML
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
