// src/features/subscription-register/step4-confirm/StepConfirm.tsx
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { transformToMethodOptions } from '@/entities/subscription/api/fetchPaymentMethods';
import { usePaymentMethods } from '@/entities/subscription/hook/usePaymentMethods';
import type {
  MethodKind,
  MethodOptionsByKind,
  RegisterForm,
} from '@/entities/subscription/model/register.types';
import { BillingCycleRadio } from '@/features/subscription-edit/ui/BillingCycleRadio';
import { PaymentDateField } from '@/features/subscription-edit/ui/PaymentDateField';
import { PaymentMethodPicker } from '@/features/subscription-edit/ui/PaymentMethodPicker';
import { Icons } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { ContentsCardStacked } from '@/shared/ui/contents-card-stacked';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';
import { Tag } from '@/shared/ui/tag';

// ------------------------------------------------------------------
// Dummies (나중에 교체)
// ------------------------------------------------------------------
const NONE_ID = 0;

// 주기 옵션(값은 단순 데모용). 실서버 스펙과 맞추면 교체
const CYCLE_OPTIONS: { value: 'WEEK' | 'MONTH' | 'YEAR'; label: string }[] = [
  { value: 'WEEK', label: '매주' },
  { value: 'MONTH', label: '매달' },
  { value: 'YEAR', label: '매년' },
];

type ConfirmProps = {
  categoryLabel: string;
  /** onPrev/onSubmit 콜백 */
  onPrev: () => void;
  onSubmit: () => void;
};

export const StepConfirm = ({ categoryLabel, onPrev, onSubmit }: ConfirmProps) => {
  const { watch, setValue, register, formState } = useFormContext<RegisterForm>();

  // 결제수단 데이터 조회
  const { data: paymentMethodsData, isLoading: isPaymentMethodsLoading } = usePaymentMethods();

  // API 응답을 기존 폼 구조에 맞게 변환
  const methodOptions: MethodOptionsByKind = useMemo(() => {
    if (!paymentMethodsData) {
      // 로딩 중이거나 데이터가 없을 때 빈 배열 반환
      return {
        CARD: [],
        ACCOUNT: [],
        EASY: [],
      };
    }
    return transformToMethodOptions(paymentMethodsData);
  }, [paymentMethodsData]);

  // 폼 상태
  const productId = watch('productId');
  const isCustom = productId === NONE_ID;
  const payCycleUnit = watch('payCycleUnit');
  const productImgUrl = watch('productImgUrl');
  const productName = isCustom ? watch('customProductName') || '' : watch('productName') || '';

  const startedAt = watch('startedAt'); // string|null
  const methodKind = watch('methodKind');
  const methodId = watch('paymentMethodId');

  const customPrice = watch('customPrice');
  const participantCount = watch('participantCount');
  const selectedPlan = watch('selectedPlan');

  const [isUnknownDate, setIsUnknownDate] = useState(false);

  // 결제일 모름 상태 변경 핸들러
  const handleUnknownDateChange = (checked: boolean) => {
    setIsUnknownDate(checked);
    if (checked) {
      // 결제일을 모르는 경우 startedAt을 null로 설정
      setValue('startedAt', null, { shouldDirty: true });
    }
    // checked가 false인 경우는 사용자가 직접 날짜를 선택하도록 함
  };

  // 제출 가능 여부(직접입력 모드에선 금액 필수)
  const canSubmit = useMemo(() => {
    if (isCustom) {
      if (!productName?.trim()) return false;
      if (!customPrice || Number.isNaN(customPrice) || customPrice <= 0) return false;
      if (!participantCount || participantCount < 1) return false;
    }
    return true;
  }, [isCustom, productName, customPrice, participantCount]);

  return (
    <section className="space-y-6">
      <header className="typo-title-m-bold">
        구독 정보를 확인하고
        <br /> 등록해주세요!
      </header>

      {/* 선택한 구독 서비스 요약 */}
      <ContentsCardStacked className="bg-gray-50">
        <ContentsCardStacked.Header
          title={
            <div className="flex items-center">
              {productImgUrl && (
                <img src={productImgUrl} alt="" aria-hidden className="size-6 mr-3" />
              )}
              <p>{productName}</p>
            </div>
          }
          right={
            <Tag appearance="outline" className="py-0.5">
              {categoryLabel}
            </Tag>
          }
        />
        {!isCustom && (
          <>
            <ContentsCardStacked.Divider />
            <ContentsCardStacked.Row
              label={selectedPlan?.name || '-'}
              value={
                <div className="flex items-center gap-2">
                  <p className="text-gray-800">{selectedPlan?.price || '-'}원</p>
                  {participantCount > 1 && (
                    <Tag appearance="soft" color="gray" className=" py-0.5">
                      n빵
                    </Tag>
                  )}
                </div>
              }
            />
          </>
        )}
      </ContentsCardStacked>

      {/* 직접입력 모드 전용: 결제 금액 / 사용 인원 */}
      {isCustom && (
        <>
          <fieldset>
            <legend className="mb-2 typo-title-s-bold">결제 금액</legend>
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="클릭하여 금액을 입력해주세요."
                {...register('customPrice', {
                  valueAsNumber: true,
                  required: '결제 금액을 입력해주세요.',
                  min: { value: 1, message: '1원 이상 입력해주세요.' },
                })}
                aria-invalid={!!formState.errors.customPrice}
                className={formState.errors.customPrice ? 'border-primary-600' : undefined}
              />
              <span className="px-5">원</span>
            </div>
            {formState.errors.customPrice?.message && (
              <p className="mt-2 ml-2 text-sm text-primary-600">
                {String(formState.errors.customPrice.message)}
              </p>
            )}
          </fieldset>

          <fieldset>
            <legend className="mb-2 typo-title-s-bold">사용 인원</legend>
            <div className="flex items-center">
              <Input
                type="number"
                min={1}
                {...register('participantCount', { valueAsNumber: true, min: 1 })}
              />
              <span className="px-5">명</span>
            </div>
          </fieldset>
        </>
      )}

      {/* 결제 주기 */}
      <BillingCycleRadio
        name="payCycleUnit"
        value={payCycleUnit}
        onChange={v => setValue('payCycleUnit', v, { shouldDirty: true })}
        options={CYCLE_OPTIONS}
      />

      {/* 결제일(다이얼로그는 내부 컴포넌트에서 처리) */}
      <div className={isUnknownDate ? 'opacity-50 pointer-events-none' : ''}>
        <PaymentDateField
          value={isUnknownDate ? null : (startedAt ?? null)}
          onChange={d => {
            if (!isUnknownDate) {
              setValue('startedAt', d, { shouldDirty: true });
            }
          }}
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={() => handleUnknownDateChange(!isUnknownDate)}
          className={`
            flex items-center justify-center w-5 h-5 transition-colors
            
          `}
          aria-pressed={isUnknownDate}
          aria-label="결제 날짜를 모르겠어요"
        >
          <Icon
            component={Icons.Check}
            size="sm"
            className={`text-white rounded
            ${isUnknownDate ? 'bg-primary-700 border-primary-700' : 'bg-gray-300 '}
            `}
          />
        </button>
        <label
          onClick={() => handleUnknownDateChange(!isUnknownDate)}
          className="text-gray-500 cursor-pointer select-none typo-body-s-medium"
        >
          결제 날짜를 모르겠어요 (결제일 없이 등록)
        </label>
      </div>

      {/* 결제 수단 */}
      <PaymentMethodPicker
        kind={methodKind}
        methodId={methodId?.toString()}
        onChangeKind={k => setValue('methodKind', k as MethodKind, { shouldDirty: true })}
        onChangeMethod={id => setValue('paymentMethodId', Number(id), { shouldDirty: true })}
        options={methodOptions}
      />

      {/* 메모 */}
      <fieldset>
        <legend className="mb-2 typo-title-s-bold">메모</legend>
        <Input placeholder="클릭하여 메모를 남길 수 있어요." {...register('memo')} />
      </fieldset>

      {/* 액션 */}
      <div className="grid grid-cols-2 gap-2">
        <button type="button" onClick={onPrev} className="rounded-2xl border py-3">
          이전
        </button>
        <Button
          variant="primary-fill"
          type="button"
          onClick={onSubmit}
          className="w-full"
          disabled={!canSubmit}
          title="등록하기"
        />
      </div>
    </section>
  );
};
