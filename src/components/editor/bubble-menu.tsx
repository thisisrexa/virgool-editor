import { useCurrentEditor } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Link, Type } from 'lucide-react';
import { useCallback, useState } from 'react';

import { toggleHeading } from '@/components/editor/commands/headings';
import { setLink } from '@/components/editor/commands/links';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const HEADING_LEVELS = [
  { level: 1 as const, size: 'size-4' },
  { level: 2 as const, size: 'size-3.5' },
  { level: 3 as const, size: 'size-3' },
];

export default function BubbleMenu() {
  const { editor } = useCurrentEditor();
  const [linkValue, setLinkValue] = useState('');

  const handleLinkOpenChange = useCallback(
    (open: boolean) => {
      if (open && editor) {
        setLinkValue(editor.getAttributes('link').href ?? '');
      }
    },
    [editor],
  );

  const handleSetLink = useCallback(() => {
    if (!editor) {
      return;
    }

    setLink(editor, linkValue);
  }, [editor, linkValue]);

  if (!editor) {
    return null;
  }

  return (
    <TiptapBubbleMenu editor={editor}>
      <div className="bg-foreground rounded-lg px-2 flex text-background [&>button]:hover:bg-transparent [&>button]:hover:text-background">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold
            className={cn('size-4', editor.isActive('bold') && 'text-editor-link')}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic
            className={cn(
              'size-4',
              editor.isActive('italic') && 'text-editor-link',
            )}
          />
        </Button>
        {HEADING_LEVELS.map(({ level, size }) => (
          <Button
            key={level}
            variant="ghost"
            size="icon"
            onClick={() => toggleHeading(editor, level)}
          >
            <Type
              className={cn(
                size,
                editor.isActive('heading', { level }) && 'text-editor-link',
              )}
            />
          </Button>
        ))}
        <Dialog onOpenChange={handleLinkOpenChange}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Link
                className={cn(
                  'size-4',
                  editor.isActive('link') && 'text-editor-link',
                )}
              />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Label htmlFor="url">Link</Label>
            <div className="flex gap-x-2">
              <Input
                type="url"
                id="url"
                placeholder="https://example.com"
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
              />
              <DialogClose asChild>
                <Button onClick={handleSetLink}>Save</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </TiptapBubbleMenu>
  );
}
