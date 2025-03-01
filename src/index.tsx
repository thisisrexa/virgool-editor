import React from 'react';
import ReactDOM from 'react-dom/client';

import Editor from '@/components/Editor';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className="max-w-3xl mx-auto min-h-full p-4">
      <Editor />
    </main>
  </React.StrictMode>
);
