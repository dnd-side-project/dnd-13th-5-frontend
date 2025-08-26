import { formatKRW } from '@/shared/lib/format';
import { ProgressBar } from '@/shared/ui/progress';
import { SpeechBubble } from '@/shared/ui/speech-bubble/SpeechBubble';
import { Tag } from '@/shared/ui/tag';

import type { PaymentSummaryCardProps } from '../model/types';

// 날짜 뱃지는 공통 컴포넌트가 있다고 했으므로 가정 사용

export const PaymentSummaryCard = ({
  title,
  dateText,
  subCount,
  monthUsed,
  monthLimit,
  progressPercent = 0, // 기본값 설정
}: PaymentSummaryCardProps) => (
  <section aria-label="이번달 결제 요약">
    {title && <h2 className="typo-title-l-bold mb-10">{title}</h2>}

    <article className="relative rounded-[20px] bg-white px-5 pt-5 pb-3 shadow-[2px_2px_20px_0_rgba(0,0,0,0.08)]">
      {subCount === 0 && (
        <SpeechBubble className="absolute -top-5 rounded-xl right-0 z-10">
          <p className="typo-label-s-medium text-gray-800">
            구독 중인 서비스의 정보를 입력하면
            <br />
            이번달 남은 결제를 알려드려요!
          </p>
        </SpeechBubble>
      )}
      <Tag color="gray" className="absolute -top-4 left-5 z-10">
        {dateText}
      </Tag>

      {/* 카드 내부 컨텐츠 */}
      <div>
        <p className="typo-body-s-medium text-gray-600">이번달 남은 결제</p>

        {/* 금액 */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="typo-title-l-bold text-primary-700">{formatKRW(monthUsed)}</span>
          <span className="typo-body-m-medium text-gray-500">/</span>
          <span className="typo-body-m-medium text-gray-500">{formatKRW(monthLimit)}</span>
        </div>

        {/* 진행 바 + 퍼센트 */}
        <div className="mt-[6px] flex items-center justify-between gap-6">
          <ProgressBar
            value={progressPercent}
            className="flex-1 bg-gray-100"
            barClassName="bg-primary-700"
            srLabel="이번달 사용률"
          />
          <span className="typo-title-l-bold text-primary-800">{progressPercent}%</span>
        </div>
      </div>
    </article>
  </section>
);
