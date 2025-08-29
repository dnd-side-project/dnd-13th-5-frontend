import { useNavigate } from 'react-router-dom';

import { Logo } from '@/shared/assets/images';
import { ROUTES } from '@/shared/config/routes';
import KakaoLoginButton from '@/shared/ui/button/KakaoLoginButton';
import { Header } from '@/shared/ui/header';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const KAKAO_LOGIN_URL = `${API_BASE}/oauth2/authorization/kakao`;

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLookAround = () => {
    navigate(ROUTES.HOME);
  };

  return (
    <div className="min-h-dvh max-w-md m-auto flex flex-col justify-between">
      <Header rightSlot={<button onClick={handleLookAround}>둘러보기</button>} />

      <main className="flex flex-col items-center justify-center space-y-20">
        <img src={Logo} alt="와구와구 로고" className="h-12" />

        <div className="text-center space-y-5">
          <h2 className="typo-title-xl-bold text-gray-800">
            지금 와구와구랑
            <br /> 함께하세요!
          </h2>
          <p className="typo-body-s-medium text-primary-700">와르르 쏟아지는 구독 걱정없이!</p>
        </div>
      </main>

      <footer className="pb-[calc(56px+env(safe-area-inset-bottom))] px-5">
        <a href={KAKAO_LOGIN_URL}>
          <KakaoLoginButton />
        </a>
      </footer>
    </div>
  );
};
