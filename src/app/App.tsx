import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { queryClient } from '@/shared/api/queryClient';
import { useAuthStore } from '@/shared/store/authStore';
import { Toaster } from '@/shared/ui/toast/Toaster';

import { AppRouter } from './providers/AppRouter';

import './styles/index.css';

function App() {
  const checkAuth = useAuthStore(state => state.checkAuth);
  const isLoading = useAuthStore(state => state.isLoading);

  useEffect(() => {
    // 앱이 처음 마운트될 때 딱 한 번만 실행
    checkAuth();
  }, [checkAuth]);

  // 최초 인증 확인이 끝나기 전까지는 스플래시 화면이나 로딩 UI를 보여줌
  if (isLoading) {
    return <div>Loading...</div>; // TODO: 스플래시 스크린 컴포넌트로 교체
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppRouter />
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
