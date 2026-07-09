import { Type } from 'lucide-react';
import { useEffect } from 'react';

import {
  getFontFamilyCss,
  GOOGLE_FONTS,
  loadGoogleFont,
} from '@/components/editor/fonts/google-fonts';
import { useEditorStore } from '@/components/editor/persistence/editor-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function FontPicker() {
  const fontFamily = useEditorStore((state) => state.fontFamily);
  const setFontFamily = useEditorStore((state) => state.setFontFamily);

  useEffect(() => {
    loadGoogleFont(fontFamily);
    document.documentElement.style.setProperty(
      '--editor-font-family',
      getFontFamilyCss(fontFamily),
    );
  }, [fontFamily]);

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                <Type />
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            <p>Font</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Writing font</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {GOOGLE_FONTS.map((font) => (
            <DropdownMenuItem
              key={font.family}
              onClick={() => setFontFamily(font.family)}
              className={cn(font.family === fontFamily && 'bg-accent')}
            >
              <span style={{ fontFamily: getFontFamilyCss(font.family) }}>
                {font.label}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
