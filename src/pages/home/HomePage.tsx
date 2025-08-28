import { useEffect, useState } from 'react';

import { useMyInfo } from '@/entities/member/hooks/useMyInfo';
import {
  Logo,
  HomeOne,
  HomeTwo,
  HomeThree,
  Sad,
  Smile,
  Scissor,
  Brain,
  Money,
} from '@/shared/assets/images';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import KakaoLoginButton from '@/shared/ui/button/KakaoLoginButton';
import { MobileLayout } from '@/shared/ui/layout';

// === 카드 내용 ===
const CardContents = [
  {
    id: 0,
    icon: Sad,
    title: (
      <>
        구독이 늘어날 때마다
        <br />
        복잡해지는 관리
      </>
    ),
    style: 'base',
  },
  {
    id: 1,
    icon: Smile,
    title: (
      <>
        구독이 늘어나도
        <br />더 스마트한 관리
      </>
    ),
    style: 'wagu',
  },
  {
    id: 2,
    icon: Scissor,
    title: (
      <>
        단순한 해지 유도로
        <br />
        서비스포기
      </>
    ),
    style: 'base',
  },
  {
    id: 3,
    icon: Brain,
    title: (
      <>
        효율적인 활용으로
        <br />
        서비스 극대화
      </>
    ),
    style: 'wagu',
  },
];

// === 카드 컴포넌트 ===
const ComparisonCard = ({ icon, title, style }: (typeof CardContents)[number]) => {
  const cardStyle =
    style === 'base' ? 'bg-primary-50 text-primary-700' : 'bg-secondary-200 text-white';
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center rounded-xl h-[120px] gap-1 border border-gray-100',
        cardStyle,
      )}
    >
      <img src={icon} alt="이모지" className="w-10" />
      <span className="typo-body-s-bold">{title}</span>
    </div>
  );
};

// === Hero 이미지 섹션 ===
const HeroImagesSection = ({ onLoad }: { onLoad: () => void }) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const images = [HomeOne, HomeTwo, HomeThree];

  useEffect(() => {
    if (loadedCount === images.length) {
      onLoad(); // ✅ 모든 이미지 로드 완료 후 안전하게 부모에 알림
    }
  }, [loadedCount, images.length, onLoad]);

  const handleImageLoad = () => {
    setLoadedCount(prev => {
      const next = prev + 1;
      if (next === images.length) onLoad(); // 모든 이미지 로드 완료
      return next;
    });
  };

  return (
    <section className="space-y-[30px] mb-[30px]">
      {images.map((src, idx) => (
        <img key={idx} src={src} alt={`Hero ${idx + 1}`} onLoad={handleImageLoad} />
      ))}
    </section>
  );
};

// === Cards 섹션 ===
const CardsSection = ({ visible }: { visible: boolean }) => (
  <section
    className={cn(
      'bg-white mb-[30px] -mx-5 transition-opacity duration-700',
      visible ? 'opacity-100' : 'opacity-0',
    )}
  >
    <div className="px-5 py-[30px] space-y-5">
      <h1 className="typo-title-l-bold">기존 방식 vs 와구와구</h1>
      <div className="grid grid-cols-2 gap-x-4 gap-y-5">
        {CardContents.map(content => (
          <ComparisonCard key={content.id} {...content} />
        ))}
      </div>
    </div>
  </section>
);

// === Philosophy 섹션 ===
const PhilosophySection = () => (
  <section className="space-y-10 pt-20">
    <div className="p-5 bg-white rounded-3xl border border-primary-700 flex justify-between items-start">
      <div>
        <h2 className="typo-title-m-bold mb-5">
          <span className="text-primary-700">와구 와구</span> 만의 철학
        </h2>
        <span className="typo-body-m-medium">
          구독을 줄이는 것이 답이 아니에요! <br />
          똑똑하게 관리하며 더 많은 서비스를 <br />
          마음 편하게 누리는 것을 도와드립니다
        </span>
      </div>
      <img src={Money} alt="아이콘" className="w-20" />
    </div>
    <div>
      <h2 className="typo-title-m-bold mb-5">
        지금 시작하세요! <br />
        구독 관리의 새로운 경험
      </h2>
      <span className="typo-body-m-medium">
        5분만 투자하면 당신의 모든 구독이
        <br />
        체계적으로 정리됩니다
      </span>
    </div>
    <Button variant="primary-fill" title={<>둘러보기</>} />
  </section>
);

// === HomePage ===
export const HomePage = () => {
  const { data: _data } = useMyInfo();
  const [heroLoaded, setHeroLoaded] = useState(false);

  const handleLogin = () => {};

  return (
    <MobileLayout
      headerProps={{
        leftSlot: <img src={Logo} alt="logo" className="h-7" />,
        className: 'bg-gray-50',
      }}
      bodyVariant="gray"
      bodyClassName="pb-52"
    >
      <HeroImagesSection onLoad={() => setHeroLoaded(true)} />
      <CardsSection visible={heroLoaded} />
      <PhilosophySection />

      <footer className="fixed z-50 bottom-24 left-0 right-0 max-w-md w-full m-auto px-3">
        <KakaoLoginButton onClick={handleLogin} />
      </footer>
    </MobileLayout>
  );
};
