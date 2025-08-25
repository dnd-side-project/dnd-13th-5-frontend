// src/features/subscription-register/step4-confirm/StepConfirm.tsx
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type {
  MethodKind,
  MethodOptionsByKind,
  RegisterForm,
} from '@/entities/subscription/model/register.types';
import { BillingCycleRadio } from '@/features/subscription-edit/ui/BillingCycleRadio';
import { PaymentDateField } from '@/features/subscription-edit/ui/PaymentDateField';
import { PaymentMethodPicker } from '@/features/subscription-edit/ui/PaymentMethodPicker';
import { Button } from '@/shared/ui/button';
import { ContentsCardStacked } from '@/shared/ui/contents-card-stacked';
import { Input } from '@/shared/ui/input';
import { Tag } from '@/shared/ui/tag';

// ------------------------------------------------------------------
// Dummies (나중에 교체)
// ------------------------------------------------------------------
const NONE_ID = 0;

// 주기 옵션(값은 단순 데모용). 실서버 스펙과 맞추면 교체
const DUMMY_CYCLE_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: '매주' },
  { value: 2, label: '매달' },
  { value: 12, label: '매년' },
];

// 결제수단 옵션 더미
const DUMMY_METHOD_OPTIONS: MethodOptionsByKind = {
  CARD: [
    { id: 101, label: '국민카드' },
    { id: 102, label: '신한카드' },
  ],
  ACCOUNT: [
    { id: 201, label: 'KB국민은행' },
    { id: 202, label: '신한은행' },
  ],
  EASY: [
    { id: 301, label: '네이버페이' },
    { id: 302, label: '카카오페이' },
  ],
};

type ConfirmProps = {
  /** 일반 케이스에서 보여줄 이름/아이콘/카테고리 라벨(직접입력 모드에선 무시) */
  productName: string;
  productIcon: string;
  categoryLabel: string;
  /** onPrev/onSubmit 콜백 */
  onPrev: () => void;
  onSubmit: () => void;
  /** 더미를 바꾸고 싶으면 외부에서 주입 가능(옵션) */
  cycleOptions?: { value: number; label: string }[];
  methodOptions?: MethodOptionsByKind;
};

export const StepConfirm = ({
  productName,
  productIcon,
  categoryLabel,
  onPrev,
  onSubmit,
  cycleOptions = DUMMY_CYCLE_OPTIONS,
  methodOptions = DUMMY_METHOD_OPTIONS,
}: ConfirmProps) => {
  const { watch, setValue, register, formState } = useFormContext<RegisterForm>();

  // 폼 상태
  const productId = watch('productId');
  const isCustom = productId === NONE_ID;

  const cycleMonths = watch('payCycleNum');
  const startDay = watch('startDay'); // string|null
  const methodKind = watch('methodKind');
  const methodId = watch('paymentMethodId');

  const customName = watch('customProductName') ?? '';
  const customPrice = watch('customPrice');
  const participantCount = watch('participantCount');
  const selectedPlan = watch('selectedPlan');

  const [isUnknownDate, setIsUnknownDate] = useState(false);

  // 헤더에 표시할 서비스명/아이콘(직접입력 시 아이콘 없음)
  const headerTitle = useMemo(
    () => (isCustom ? customName || '직접입력한 이름' : productName),
    [isCustom, customName, productName],
  );
  const headerIcon = useMemo(() => (isCustom ? '' : productIcon), [isCustom, productIcon]);

  // 제출 가능 여부(직접입력 모드에선 금액 필수)
  const canSubmit = useMemo(() => {
    if (isCustom) {
      if (!customName?.trim()) return false;
      if (!customPrice || Number.isNaN(customPrice) || customPrice <= 0) return false;
      if (!participantCount || participantCount < 1) return false;
    }
    return true;
  }, [isCustom, customName, customPrice, participantCount]);

  return (
    <section className="space-y-6">
      <header className="typo-title-m-bold">구독 정보를 확인하고 등록해주세요!</header>

      {/* 선택한 구독 서비스 요약 */}
      <ContentsCardStacked className="bg-gray-50">
        <ContentsCardStacked.Header
          title={
            <div className="flex items-center">
              <img src={headerIcon} alt="" aria-hidden className="size-6 mr-3" />
              <p>{headerTitle}</p>
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
                  <p>{selectedPlan?.priceLabel || '-'}</p>
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
        name="payCycleNum"
        value={cycleMonths}
        onChange={v => setValue('payCycleNum', v, { shouldDirty: true })}
        options={cycleOptions}
      />

      {/* 결제일(다이얼로그는 내부 컴포넌트에서 처리) */}
      <PaymentDateField
        value={startDay ?? null}
        onChange={d => setValue('startDay', d, { shouldDirty: true })}
      />
      <div className="mt-3 flex items-center gap-2">
        <input
          id="unknown-date"
          type="checkbox"
          checked={isUnknownDate}
          onChange={e => setIsUnknownDate(e.target.checked)}
        />
        <label htmlFor="unknown-date" className="text-gray-600">
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
