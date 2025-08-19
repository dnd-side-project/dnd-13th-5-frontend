import { useNavigate } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import { Images } from '@/shared/assets/images';

const LoginPromptWidget = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="mx-5 my-3 w-[335px]">
      <div className="self-stretch p-5 w-full relative max-w-full rounded-tl-[20px] rounded-tr-[20px] inline-flex flex-col justify-start items-start gap-14 overflow-hidden bg-[linear-gradient(179deg,#D5E2FF_3.56%,#DDEBFF_25.15%,#E0EEFF_60.88%,#DFEDFF_98.85%)]">
        <h2 className="justify-start typo-title-m-bold text-gray-800 z-10">
          내 구독, 한눈에 확인하고
          <br />
          똑똑하게 관리하세요!
        </h2>
        <div className="w-44 justify-start text-gray-800 typo-body-s-medium z-10">
          결제일 알림부터 혜택 비교까지
          <br />
          와구와구에서 시작하세요.
        </div>
        <img
          className="w-[273px] h-[207px] absolute top-0 right-[-60px] z-0"
          src={Images.MainCard}
        />
      </div>
      <div
        className="self-stretch px-5 py-2 w-full bg-[#1F69E3] rounded-bl-[20px] rounded-br-[20px] inline-flex justify-end items-center gap-1"
        onClick={handleLoginClick}
      >
        <div className="justify-start text-white">로그인하고 시작하기</div>
        <Icons.ChevronRight className="fill-white" />
      </div>
    </div>
  );
};

export default LoginPromptWidget;
