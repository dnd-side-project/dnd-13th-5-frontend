// src/features/subscription-register/SubscriptionRegisterWidget.tsx
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  toRegisterPayload,
  type MethodOptionsByKind,
  type RegisterForm,
} from '@/entities/subscription/model/register.types';
import { StepCategory } from '@/features/subscription-register/step1-category/StepCategory';
import { StepService } from '@/features/subscription-register/step2-service/StepService';
import { StepPlan } from '@/features/subscription-register/step3-plan/StepPlan';
import { StepConfirm } from '@/features/subscription-register/step4-confirm/StepConfirm';

// 선택한 서비스명을 헤더에 보여주기 위해 임시 매핑(더미)
const SERVICE_META_BY_CATEGORY: Record<
  number,
  Array<{ id: number; name: string; iconUrl: string }>
> = {
  // 예시: 카테고리 id 1(OTT), 2(쇼핑) …
  1: [
    { id: 101, name: '넷플릭스', iconUrl: '/assets/netflix.png' },
    { id: 102, name: '디즈니+', iconUrl: '/assets/disney.png' },
    { id: 103, name: '웨이브', iconUrl: '/assets/wavve.png' },
    { id: 104, name: '티빙', iconUrl: '/assets/tving.png' },
  ],
  2: [
    { id: 201, name: '쿠팡 와우', iconUrl: '/assets/coupang.png' },
    { id: 202, name: '네이버플러스', iconUrl: '/assets/naverplus.png' },
  ],
};

// 카테고리 라벨도 임시로(혹은 CATEGORY_META 쓰세요)
const CATEGORY_LABEL_BY_ID: Record<number, string> = {
  1: 'OTT',
  2: '쇼핑',
  3: '음악',
  4: '클라우드',
  5: 'AI',
  6: '생산성',
  7: '교육',
  8: '배달',
};

type Props = {
  /** 결제수단 옵션(없으면 StepConfirm 내부 더미를 사용) */
  methodOptions?: MethodOptionsByKind;
  /** 최종 등록 요청 */
  onSubmit: (payload: ReturnType<typeof toRegisterPayload>) => Promise<void> | void;
  step: number;
  setStep: (step: 1 | 2 | 3 | 4) => void;
};

export const SubscriptionRegisterWidget = ({ methodOptions, onSubmit, step, setStep }: Props) => {
  const methods = useForm<RegisterForm>({
    defaultValues: {
      // 공통 초기값
      participantCount: 1,
      payCycleNum: 1,
      payCycleUnit: 'MONTH',
      // 직접입력 케이스에서 사용할 수 있는 필드(옵션)
      customProductName: null,
      customPrice: undefined,
    },
    mode: 'onChange',
  });

  const { watch, handleSubmit } = methods;
  const categoryId = watch('categoryId'); // 1단계 결과
  const productId = watch('productId'); // 2단계 결과 (0 이면 직접입력)
  const NONE_ID = 0; // 직접입력 분기용 상수

  // eslint-disable-next-line unused-imports/no-unused-vars
  const goNext = () => setStep(Math.min(4, step + 1) as 1 | 2 | 3 | 4);
  const goPrev = () => setStep(Math.max(1, step - 1) as 1 | 2 | 3 | 4);

  const submit = handleSubmit(async form => {
    await onSubmit(toRegisterPayload(form));
  });

  // 헤더에 보여줄 선택 서비스 메타(일반 케이스만 필요)
  const selectedServiceMeta = useMemo(() => {
    if (!categoryId || !productId || productId === NONE_ID) return undefined;
    return SERVICE_META_BY_CATEGORY[categoryId]?.find(s => s.id === productId);
  }, [categoryId, productId]);

  // 카테고리 라벨(없으면 빈 문자열)
  const categoryLabel = useMemo(
    () => (categoryId ? (CATEGORY_LABEL_BY_ID[categoryId] ?? '') : ''),
    [categoryId],
  );

  return (
    <FormProvider {...methods}>
      <div className="">
        {/* 1단계: 카테고리 선택 (내부 더미 사용, API 주석 가이드) */}
        {step === 1 && <StepCategory onNext={() => setStep(2)} />}

        {/* 2단계: 서비스 선택 (내부 더미 + '없어요' 분기) */}
        {step === 2 && <StepService onPrev={goPrev} onNext={() => setStep(3)} />}

        {/* 3단계: 요금제 선택 or 직접입력(서비스 없어요 선택 시) */}
        {step === 3 && <StepPlan onPrev={goPrev} onNext={() => setStep(4)} />}

        {/* 4단계: 확인/등록
            - productId가 0(직접입력)이어도 진입해야 하므로 !== undefined 조건으로 체크
        */}
        {step === 4 && productId !== undefined && (
          <StepConfirm
            // 일반 케이스에서만 사용(직접입력 모드에선 내부에서 custom name 사용)
            productName={selectedServiceMeta?.name ?? ''}
            productIcon={selectedServiceMeta?.iconUrl ?? ''}
            categoryLabel={categoryLabel}
            // 외부에서 결제수단 옵션을 넘기면 사용, 없으면 StepConfirm의 더미 사용
            methodOptions={methodOptions}
            onPrev={goPrev}
            onSubmit={submit}
          />
        )}
      </div>
    </FormProvider>
  );
};
