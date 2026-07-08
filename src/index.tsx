import React from 'react';
import ReactDOM from 'react-dom/client';

import Editor from '@/components/editor/editor';
import { initTheme } from '@/components/theme/init-theme';

initTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="max-w-3xl mx-auto min-h-full p-4">
      <Editor />
    </main>
  </React.StrictMode>,
);
