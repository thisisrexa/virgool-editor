import { useEffect, useState } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { Clipboard, File, Save, SaveOff } from 'lucide-react';
import TurndownService from 'turndown';

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
import { Button } from '@/components/ui/button';
import ThemeSwitch from '@/components/ThemeSwitch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { download, getHeadingByHtml } from '@/lib/utils';

export default function Header() {
  const { editor } = useCurrentEditor();
  const [autoSave, setAutoSave] = useState<boolean>(
    JSON.parse(localStorage.getItem('autoSave') || 'true')
  );

  useEffect(() => {
    const storedContent = localStorage.getItem('content');
    if (storedContent) editor?.commands.setContent(JSON.parse(storedContent));
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (autoSave) {
      timeout = setTimeout(() => {
        localStorage.setItem('content', JSON.stringify(editor?.getJSON()));
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [editor, autoSave]);

  const handleAutoSave = () => {
    setAutoSave(!autoSave);
    localStorage.setItem('autoSave', JSON.stringify(!autoSave));
  };

  const handleExportToText = () => {
    if (!editor?.isEmpty) {
      const filename = getHeadingByHtml(editor!.getHTML());
      download(
        new Blob([editor!.getText()], { type: 'text/plain' }),
        `${filename}.txt`
      );
    }
  };

  const handleExportToMarkdown = () => {
    if (!editor?.isEmpty) {
      const turndownService = new TurndownService({
        headingStyle: 'atx',
      });
      const filename = getHeadingByHtml(editor!.getHTML()!);
      download(
        new Blob([turndownService.turndown(editor!.getHTML()!)], {
          type: 'text/markdown',
        }),
        `${filename}.md`
      );
    }
  };

  const handleExportToHtml = () => {
    if (!editor?.isEmpty) {
      const filename = getHeadingByHtml(editor!.getHTML());
      download(
        new Blob([editor!.getHTML()], { type: 'text/html' }),
        `${filename}.html`
      );
    }
  };

  const handleClipboardText = async () => {
    if (!editor?.isEmpty) {
      try {
        await navigator.clipboard.writeText(editor!.getText()!);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClipboardMarkdown = async () => {
    if (!editor?.isEmpty) {
      const turndownService = new TurndownService({
        headingStyle: 'atx',
      });
      try {
        await navigator.clipboard.writeText(
          turndownService.turndown(editor!.getHTML())
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClipboardHtml = async () => {
    if (!editor?.isEmpty) {
      try {
        await navigator.clipboard.writeText(editor!.getHTML());
      } catch (error) {
        console.log(error);
      }
    }
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
              <DropdownMenuItem onClick={handleClipboardText}>
                Copy as Text
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClipboardMarkdown}>
                Copy as Markdown
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleClipboardHtml}>
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
              <DropdownMenuItem onClick={handleExportToText}>
                Export to Text
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportToMarkdown}>
                Export to Markdown
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportToHtml}>
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
