import { useCurrentEditor } from '@tiptap/react';
import { FloatingMenu as TiptapFloatingMenu } from '@tiptap/react/menus';
import {
  Code,
  Image,
  List,
  ListOrdered,
  Plus,
  Quote,
  Video,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

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

export default function FloatingMenu() {
  const { editor } = useCurrentEditor();
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [imageUrlValue, setImageUrlValue] = useState<string>('');
  const [imageAltValue, setImageAltValue] = useState<string>('');
  const [youtubeUrlValue, setYoutubeUrlValue] = useState<string>('');

  const closeMenu = useCallback(() => {
    setOpen(false);
    document.documentElement.style.setProperty('--placeholder-opacity', '1');
  }, []);

  const openMenu = useCallback(() => {
    setOpen(true);
    document.documentElement.style.setProperty('--placeholder-opacity', '0');
  }, []);

  const handleToggleMenu = () => {
    if (open) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeMenu, open]);

  const handleAddImage = useCallback(() => {
    if (imageUrlValue) {
      editor
        ?.chain()
        .focus()
        .setImage({ src: imageUrlValue, alt: imageAltValue })
        .run();
      setImageUrlValue('');
      setImageAltValue('');
      closeMenu();
    }
  }, [closeMenu, editor, imageUrlValue, imageAltValue]);

  const handleAddYoutube = useCallback(() => {
    if (youtubeUrlValue) {
      editor?.chain().focus().setYoutubeVideo({ src: youtubeUrlValue }).run();
      setYoutubeUrlValue('');
      closeMenu();
    }
  }, [closeMenu, editor, youtubeUrlValue]);

  if (!editor) {
    return null;
  }

  return (
    <TiptapFloatingMenu editor={editor}>
      <div
        ref={menuRef}
        className="flex absolute -start-16 top-1/2 -translate-y-1/2 items-center"
      >
        <Button
          variant="outline"
          size="icon"
          className="border-muted-foreground/30"
          onClick={handleToggleMenu}
        >
          <Plus
            className={cn(
              'size-4 transition-transform duration-200 text-muted-foreground',
              open && 'rotate-45',
            )}
          />
        </Button>
        <div
          className={cn(
            'transition-all duration-200 space-x-2 ease-out w-0 overflow-hidden [&>button]:border-muted-foreground/30',
            open && 'w-max ms-4',
          )}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={closeMenu}>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon" onClick={closeMenu}>
                <Video />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <div className="grid gap-4 py-4">
                <div className="space-y-3">
                  <Label htmlFor="youtubeUrl">YouTube URL</Label>
                  <Input
                    id="youtubeUrl"
                    value={youtubeUrlValue}
                    placeholder="https://www.youtube.com/watch?v=..."
                    onChange={(e) => setYoutubeUrlValue(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={handleAddYoutube}>Embed</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              editor.chain().focus().toggleCodeBlock().run();
              closeMenu();
            }}
          >
            <Code />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              editor.chain().focus().toggleBlockquote().run();
              closeMenu();
            }}
          >
            <Quote />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              editor.chain().focus().toggleBulletList().run();
              closeMenu();
            }}
          >
            <List />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              editor.chain().focus().toggleOrderedList().run();
              closeMenu();
            }}
          >
            <ListOrdered />
          </Button>
        </div>
      </div>
    </TiptapFloatingMenu>
  );
}
