import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/theme/use-theme';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" onClick={toggleTheme} variant="ghost">
            {theme === 'dark' ? <Sun /> : <Moon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle dark mode</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
