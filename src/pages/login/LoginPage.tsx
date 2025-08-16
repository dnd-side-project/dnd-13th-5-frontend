import LoginButton from '@/shared/ui/button/LoginButton';
import { Header } from '@/shared/ui/header';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLookAround = () => {
    navigate('/');
  };
  const handleLogin = () => {};

  return (
    <div className="min-h-dvh max-w-md m-auto flex flex-col justify-between px-5">
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

      <footer className="pb-[calc(56px+env(safe-area-inset-bottom))]">
        <LoginButton onClick={handleLogin} />
      </footer>
    </div>
  );
};
