import { useCallback, useState } from 'react';
import { BubbleMenu, useCurrentEditor } from '@tiptap/react';
import { Bold, Italic, Link, Type } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export default function EditorBubbleMenu() {
  const { editor } = useCurrentEditor();
  const [linkValue, setLinkValue] = useState<string>('');

  const handleSetLink = useCallback(() => {
    if (linkValue === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor
      ?.chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: linkValue })
      .run();
  }, [editor, linkValue]);

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu editor={editor}>
      <div className="bg-foreground rounded-lg px-2 flex text-background [&>button]:hover:bg-transparent [&>button]:hover:text-background">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold
            className={cn('size-4', editor.isActive('bold') && 'text-blue-500')}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic
            className={cn(
              'size-4',
              editor.isActive('italic') && 'text-blue-500'
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            const isH1Exists = editor
              .getJSON()
              .content?.some(
                (node) => node.type === 'heading' && node.attrs?.level === 1
              );

            if (isH1Exists) {
              if (editor.isActive('heading', { level: 1 })) {
                editor.chain().focus().setParagraph().run();
              } else {
                editor.chain().focus().toggleHeading({ level: 2 }).run();
              }
            } else {
              editor.chain().focus().toggleHeading({ level: 1 }).run();
            }
          }}>
          <Type
            className={cn(
              'size-4',
              editor.isActive('heading', { level: 1 }) && 'text-blue-500',
              editor.isActive('heading', { level: 2 }) && 'text-blue-500'
            )}
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }>
          <Type
            className={cn(
              'size-3.5',
              editor.isActive('heading', { level: 3 }) && 'text-blue-500'
            )}
          />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Link
                className={cn(
                  'size-4',
                  editor.isActive('link') && 'text-blue-500'
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
                defaultValue={editor?.getAttributes('link').href}
                onChange={(e) => setLinkValue(e.target.value)}
              />
              <DialogClose asChild>
                <Button onClick={handleSetLink}>Save</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </BubbleMenu>
  );
}
