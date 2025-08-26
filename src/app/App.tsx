import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from '@/shared/api/queryClient';

import { useAuthBootstrap } from './hooks/useAuthBootstrap';
import { AppRouter } from './providers/AppRouter';
import './styles/index.css';

function App() {
  useAuthBootstrap();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
