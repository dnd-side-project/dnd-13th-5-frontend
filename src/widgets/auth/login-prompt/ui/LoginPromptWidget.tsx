import { useId } from 'react';
import { Link } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import { Images } from '@/shared/assets/images';

const LoginPromptWidget = () => {
  const headingId = useId();

  return (
    <article role="region" aria-labelledby={headingId} className="mx-5 my-3 w-[335px]">
      <div className="self-stretch p-5 w-full relative max-w-full rounded-tl-[20px] rounded-tr-[20px] inline-flex flex-col justify-start items-start gap-14 overflow-hidden bg-[linear-gradient(179deg,#D5E2FF_3.56%,#DDEBFF_25.15%,#E0EEFF_60.88%,#DFEDFF_98.85%)]">
        <h2 id={headingId} className="justify-start typo-title-m-bold text-gray-800 z-10">
          내 구독, 한눈에 확인하고
          <br />
          똑똑하게 관리하세요!
        </h2>
        <p className="w-44 justify-start text-gray-800 typo-body-s-medium z-10">
          결제일 알림부터 혜택 비교까지
          <br />
          와구와구에서 시작하세요.
        </p>
        <img
          className="w-[273px] h-[207px] absolute top-0 right-[-60px] z-0"
          src={Images.MainCard}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
        />
      </div>
      <Link
        to="/login"
        className="self-stretch px-5 py-2 w-full bg-[#1F69E3] rounded-bl-[20px] rounded-br-[20px] inline-flex justify-end items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1F69E3]"
      >
        <span className="justify-start text-white typo-body-m-bold">로그인하고 시작하기</span>
        <Icons.ChevronRight className="fill-white size-6" aria-hidden />
      </Link>
    </article>
  );
};

export default LoginPromptWidget;
