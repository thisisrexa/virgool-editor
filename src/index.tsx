import React from 'react';
import ReactDOM from 'react-dom/client';
import Editor from '@/components/Editor';
import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <main className='max-w-3xl mx-auto min-h-full pt-6 pb-24 flex flex-col-reverse justify-end'>
      <Editor />
    </main>
  </React.StrictMode>
);
