import { Download, Save, SaveOff, Upload } from 'lucide-react';

import { useEditorStore } from '@/components/editor/persistence/editor-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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

interface DocumentMenuProps {
  onImportJson: () => void;
  onSaveJson: () => void;
}

export default function DocumentMenu({
  onImportJson,
  onSaveJson,
}: DocumentMenuProps) {
  const autoSave = useEditorStore((state) => state.autoSave);
  const setAutoSave = useEditorStore((state) => state.setAutoSave);

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger asChild>
              <Button size="icon" variant="ghost">
                {autoSave ? <Save /> : <SaveOff />}
              </Button>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>
            <p>Document</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-52">
        <DropdownMenuLabel>Document</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={autoSave}
          onCheckedChange={setAutoSave}
        >
          Auto save
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onImportJson}>
          <Upload />
          Import JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSaveJson}>
          <Download />
          Save JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
