import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from '@/shared/api/queryClient';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

function App() {
  // const bootstrap = useAuthStore(state => state.bootstrap);
  // const ready = useAuthStore(state => state.ready);

  // useEffect(() => {
  //   if (!ready) {
  //     bootstrap();
  //   }
  // }, [bootstrap, ready]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
