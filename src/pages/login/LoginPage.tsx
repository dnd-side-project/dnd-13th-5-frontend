import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import LoginButton from '@/shared/ui/button/LoginButton';
import { Header } from '@/shared/ui/header';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLookAround = () => {
    navigate(ROUTES.HOME);
  };
  const handleLogin = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-dvh max-w-md m-auto flex flex-col justify-between">
      <Header
        rightSlot={<button onClick={handleLookAround}>둘러보기</button>}
      />

      <main className="flex flex-col items-center justify-center space-y-20">
        <h1 className="typo-title-xl-bold">LOGO</h1>

        <div className="text-center space-y-5">
          <h2 className="typo-title-xl-bold text-gray-800">
            지금 와구와구랑
            <br /> 함께하세요!
          </h2>
          <p className="typo-body-s-medium text-primary-700">
            와르르 쏟아지는 구독 걱정없이!
          </p>
        </div>
      </main>

      <footer className="pb-[calc(56px+env(safe-area-inset-bottom))] px-5">
        <LoginButton onClick={handleLogin} />
      </footer>
    </div>
  );
};
