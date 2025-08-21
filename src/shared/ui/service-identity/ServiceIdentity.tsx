import { useId, useState } from 'react';

import { cn } from '@/lib/utils'; // clsx + tailwind-merge 유틸
import { Tag } from '@/shared/ui/tag';

/**
 * 아이콘 + 서비스명 + 태그 묶음
 * - 단순 프레젠테이션 컴포넌트 (공통 Tag 재사용)
 * - 그림이 핵심 정보이므로 img에 의미 있는 alt 제공
 * - 이미지 실패 시 이니셜 fallback 제공
 */

export interface ServiceIdentityProps {
  /** 서비스명 (텍스트 및 img 대체 텍스트로 사용) */
  serviceName: string;
  /** 카테고리 라벨 (예: '쇼핑', 'OTT') */
  category: string;
  /** 정사각 아이콘 URL */
  imageUrl: string;

  /** 아이콘 크기 프리셋 */
  size?: 'md' | 'lg' | 'xl';
  /** 전체 래퍼 클래스 */
  className?: string;
  /** Tag 커스터마이즈가 필요할 때 */
  tagClassName?: string;
}

const ICON_SIZE = {
  md: 'size-16 rounded-xl',
  lg: 'size-24 rounded-2xl',
  xl: 'size-[82px] rounded-2xl',
} as const;

export const ServiceIdentity = ({
  serviceName,
  category,
  imageUrl,
  size = 'xl',
  className,
  tagClassName,
}: ServiceIdentityProps) => {
  const titleId = useId();
  const [imgError, setImgError] = useState(false);

  return (
    // figure/figcaption 시맨틱으로 제목과 시각자료를 묶음
    <figure aria-labelledby={titleId} className={cn('flex flex-col items-center gap-3', className)}>
      {/* 아이콘 */}
      {imgError ? (
        // 이미지 실패 시 이니셜 fallback (접근성: 장식 처리)
        <div
          aria-hidden
          className={cn(
            'grid place-items-center bg-gray-100 text-gray-400 typo-title-l-bold',
            'select-none',
            ICON_SIZE[size],
          )}
        >
          {serviceName?.[0] ?? '?'}
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={`${serviceName} 아이콘`}
          loading="lazy"
          width={82}
          height={82}
          className={cn('object-cover', ICON_SIZE[size])}
          onError={() => setImgError(true)}
        />
      )}

      {/* 제목 + 태그 라인 */}
      <figcaption className="flex items-center gap-2">
        <h3 id={titleId} className="typo-title-l-bold text-gray-900">
          {serviceName}
        </h3>

        {/* 기존 Tag 컴포넌트 활용 (outline 스타일 가정) */}
        <Tag appearance="outline" color="red" className={tagClassName}>
          {category}
        </Tag>
      </figcaption>
    </figure>
  );
};
