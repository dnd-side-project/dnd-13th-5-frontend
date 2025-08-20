import { Children, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { PaginationDots } from '@/shared/ui/pagination';

interface CarouselProps {
  children: ReactNode; // <ContentsCard/> ... 여러 개
  className?: string;
  slideClassName?: string; // 각 슬라이드 래퍼 클래스 (간격 등)
  dotsClassName?: string;
  ariaLabel?: string; // 스크린리더용 캐러셀 라벨
}

/**
 * - 스크롤 스냅(snap-x, snap-mandatory) 기반으로 화면 너비 1장의 카드씩 이동
 * - IntersectionObserver(IO)로 "현재 보이는 슬라이드"를 계산해 점 네비 활성화
 * - 점(Dots)을 클릭하면 해당 슬라이드로 smooth scroll
 * - 컨테이너 패딩/음수 마진으로 카드 섀도우가 바깥으로 자연스럽게 보이도록 여백 조정
 */

export const Carousel = ({
  children,
  className,
  slideClassName,
  dotsClassName,
  ariaLabel = '콘텐츠 캐러셀',
}: CarouselProps) => {
  // children을 배열로 고정 (key/개수 추적 및 map에 사용)
  const slides = useMemo(() => Children.toArray(children), [children]);
  const total = slides.length;
  // 스크롤 컨테이너와 각 슬라이드 DOM 참조
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  // itemRefs.current = [];

  // 현재 활성 인덱스 (점 네비 연동)
  const [active, setActive] = useState(0);

  // 각 슬라이드 div에 ref를 주입하기 위한 팩토리
  const setRef =
    (i: number) =>
    (el: HTMLDivElement | null): void => {
      if (el) itemRefs.current[i] = el;
    };

  // IntersectionObserver로 현재 화면에 "가장 많이 보이는" 슬라이드를 활성화
  useEffect(() => {
    const root = containerRef.current;
    if (!root || total === 0) return () => {};

    const io = new IntersectionObserver(
      entries => {
        const vis = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis?.target) {
          const idx = Number((vis.target as HTMLElement).dataset.index);
          if (!Number.isNaN(idx)) setActive(idx);
        }
      },
      { root, threshold: 0.6 },
    );

    itemRefs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const scrollTo = (idx: number) => {
    const el = itemRefs.current[idx];
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={className}
    >
      {/* 스크롤 스냅 컨테이너 */}
      <div
        ref={containerRef}
        className={cn(
          'flex gap-8 pb-3 px-3 -mx-3 overflow-x-auto snap-x snap-mandatory scroll-smooth',
          // 스크롤바 숨김(웹킷/파폭/IE)
          '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          // 좌우 패딩이 있으면 시작점 정렬이 자연스러움
        )}
      >
        {slides.map((child, i) => (
          <div
            ref={setRef(i)}
            key={i}
            data-index={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} / ${total}`}
            className={cn(
              // 한 화면에 하나씩 보이도록 전체 폭 차지
              'snap-start shrink-0 basis-full',
              slideClassName,
            )}
          >
            {child}
          </div>
        ))}
        {/* shadow를 위해 공간 확보했기에, 마지막 인덱스에서 공간 확보 */}
        <div aria-hidden className="shrink-0 w-3" />
      </div>

      {/* 점 네비게이션 */}
      <PaginationDots total={total} active={active} onChange={scrollTo} className={dotsClassName} />
    </section>
  );
};
