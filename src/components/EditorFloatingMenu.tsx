import { useState, useCallback } from 'react';
import { FloatingMenu, useCurrentEditor } from '@tiptap/react';
import { Image, Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export default function EditorFloatingMenu() {
  const { editor } = useCurrentEditor();
  const [open, setOpen] = useState<boolean>(false);
  const [imageUrlValue, setImageUrlValue] = useState<string>('');
  const [imageAltValue, setImageAltValue] = useState<string>('');

  const handleToggleMenu = () => {
    setOpen(!open);
    if (open) {
      document.documentElement.style.setProperty('--placeholder-opacity', '1');
    } else {
      document.documentElement.style.setProperty('--placeholder-opacity', '0');
    }
  };

  const handleAddImage = useCallback(() => {
    if (imageUrlValue) {
      editor
        ?.chain()
        .focus()
        .setImage({ src: imageUrlValue, alt: imageAltValue ?? '' })
        .run();
      setImageUrlValue('');
      setImageAltValue('');
    }
  }, [editor, imageUrlValue, imageAltValue]);

  if (!editor) {
    return null;
  }

  return (
    <FloatingMenu editor={editor}>
      <div className="flex absolute -left-16 top-1/2 -translate-y-1/2 items-center">
        <Button
          variant="outline"
          size="icon"
          className="border-muted-foreground/30"
          onClick={handleToggleMenu}>
          <Plus
            className={cn(
              'size-4 transition-transform duration-200 text-muted-foreground',
              open && 'rotate-45'
            )}></Plus>
        </Button>
        <div
          className={cn(
            'transition-all duration-200 space-x-2 ease-out w-0 overflow-hidden [&>button]:border-muted-foreground/30',
            open && 'w-max ml-4'
          )}>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Image />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <Label htmlFor="imageUrl" className="text-right">
                    Image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    value={imageUrlValue}
                    className="col-span-3"
                    placeholder="https://example.com/image.jpg"
                    onChange={(e) => setImageUrlValue(e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="imageAlt" className="text-right">
                    Image Alt Text
                  </Label>
                  <Input
                    id="imageAlt"
                    value={imageAltValue}
                    className="col-span-3"
                    placeholder="A black cat on the table"
                    onChange={(e) => setImageAltValue(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleAddImage}>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </FloatingMenu>
  );
}
