// src/features/subscription-register/SubscriptionRegisterWidget.tsx
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useCreateCustomSubscription } from '@/entities/subscription/hook/useCreateCustomSubscription';
import { useCreateSubscription } from '@/entities/subscription/hook/useCreateSubscription';
import { CATEGORY_META } from '@/entities/subscription/model/category.meta';
import {
  toCustomRegisterPayload,
  toRegisterPayload,
  type RegisterForm,
} from '@/entities/subscription/model/register.types';
import { StepCategory } from '@/features/subscription-register/step1-category/StepCategory';
import { StepService } from '@/features/subscription-register/step2-service/StepService';
import { StepPlan } from '@/features/subscription-register/step3-plan/StepPlan';
import { StepConfirm } from '@/features/subscription-register/step4-confirm/StepConfirm';

// 선택한 서비스명을 헤더에 보여주기 위해 임시 매핑(더미)

type Props = {
  step: number;
  setStep: (step: 1 | 2 | 3 | 4) => void;
};

export const SubscriptionRegisterWidget = ({ step, setStep }: Props) => {
  const navigate = useNavigate();
  const methods = useForm<RegisterForm>({
    defaultValues: {
      // 공통 초기값
      participantCount: 1,
      payCycleUnit: 'WEEK',
      // 직접입력 케이스에서 사용할 수 있는 필드(옵션)
      customProductName: null,
      customPrice: undefined,
    },
    mode: 'onChange',
  });

  const { watch, handleSubmit } = methods;
  const createSubscriptionMutation = useCreateSubscription();
  const createCustomSubscriptionMutation = useCreateCustomSubscription();
  const categoryName = watch('categoryName'); // 1단계 결과
  const productId = watch('productId'); // 2단계 결과 (0 이면 직접입력)

  const goNext = () => setStep(Math.min(4, step + 1) as 1 | 2 | 3 | 4);
  const goPrev = () => setStep(Math.max(1, step - 1) as 1 | 2 | 3 | 4);

  const submit = handleSubmit(async form => {
    try {
      const isCustom = form.productId === 0;

      if (isCustom) {
        // 커스텀 구독 등록
        const payload = toCustomRegisterPayload(form);
        const result = await createCustomSubscriptionMutation.mutateAsync(payload);
        console.log('✅ 커스텀 구독 등록 성공:', result.message);
      } else {
        // 일반 구독 등록
        const payload = toRegisterPayload(form);
        const result = await createSubscriptionMutation.mutateAsync(payload);
        console.log('✅ 구독 등록 성공:', result.message);
      }

      // /subscriptions 페이지로 리디렉션
      navigate('/subscriptions');
    } catch (error) {
      console.error('구독 등록 실패:', error);
    }
  });

  // 카테고리 라벨 (CATEGORY_META에서 직접 가져오기)
  const categoryLabel = useMemo(() => {
    if (categoryName) {
      return CATEGORY_META[categoryName]?.label ?? '';
    }
    return '';
  }, [categoryName]);

  return (
    <FormProvider {...methods}>
      <div className="">
        {/* 1단계: 카테고리 선택 (내부 더미 사용, API 주석 가이드) */}
        {step === 1 && <StepCategory onNext={goNext} />}

        {/* 2단계: 서비스 선택 (내부 더미 + '없어요' 분기) */}
        {step === 2 && <StepService onPrev={goPrev} onNext={goNext} />}

        {/* 3단계: 요금제 선택 or 직접입력(서비스 없어요 선택 시) */}
        {step === 3 && <StepPlan onPrev={goPrev} onNext={goNext} />}

        {/* 4단계: 확인/등록
            - productId가 0(직접입력)이어도 진입해야 하므로 !== undefined 조건으로 체크
        */}
        {step === 4 && productId !== undefined && (
          <StepConfirm
            // 일반 케이스에서만 사용(직접입력 모드에선 내부에서 custom name 사용)
            categoryLabel={categoryLabel}
            // 외부에서 결제수단 옵션을 넘기면 사용, 없으면 StepConfirm의 더미 사용
            onPrev={goPrev}
            onSubmit={submit}
          />
        )}
      </div>
    </FormProvider>
  );
};
