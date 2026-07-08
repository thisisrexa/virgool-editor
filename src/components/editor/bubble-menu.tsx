import { useCurrentEditor } from '@tiptap/react';
import { BubbleMenu as TiptapBubbleMenu } from '@tiptap/react/menus';
import { Bold, Italic, Link, Type } from 'lucide-react';
import { useCallback, useState } from 'react';

import { togglePrimaryHeading } from '@/components/editor/commands/headings';
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

export default function BubbleMenu() {
  const { editor } = useCurrentEditor();
  const [linkValue, setLinkValue] = useState<string>('');

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
            className={cn('size-4', editor.isActive('bold') && 'text-blue-500')}
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
              editor.isActive('italic') && 'text-blue-500',
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => togglePrimaryHeading(editor)}
        >
          <Type
            className={cn(
              'size-4',
              editor.isActive('heading', { level: 1 }) && 'text-blue-500',
              editor.isActive('heading', { level: 2 }) && 'text-blue-500',
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Type
            className={cn(
              'size-3.5',
              editor.isActive('heading', { level: 3 }) && 'text-blue-500',
            )}
          />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Link
                className={cn(
                  'size-4',
                  editor.isActive('link') && 'text-blue-500',
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
                defaultValue={editor.getAttributes('link').href}
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
