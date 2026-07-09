import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { DEFAULT_FONT_FAMILY } from '@/components/editor/fonts/google-fonts';

const PREFS_KEY = 'virgool-editor-prefs';

interface EditorStore {
  autoSave: boolean;
  fontFamily: string;
  setAutoSave: (autoSave: boolean) => void;
  toggleAutoSave: () => void;
  setFontFamily: (fontFamily: string) => void;
}

export const useEditorStore = create<EditorStore>()(
  persist(
    (set) => ({
      autoSave: true,
      fontFamily: DEFAULT_FONT_FAMILY,
      setAutoSave: (autoSave) => set({ autoSave }),
      toggleAutoSave: () => set((state) => ({ autoSave: !state.autoSave })),
      setFontFamily: (fontFamily) => set({ fontFamily }),
    }),
    { name: PREFS_KEY },
  ),
);
