import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App.tsx';
import './index.css';

{
  /* 1. Create the Client */
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // This prevents React from refetching data every time you tab
      // away and back to your browser window during development.
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Wrap the app */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
