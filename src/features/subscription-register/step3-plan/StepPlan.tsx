// src/features/subscription-register/step3-plan/StepPlan.tsx
import { useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { PlanOption, RegisterForm } from '@/entities/subscription/model/register.types';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Input } from '@/shared/ui/input';

const NONE_ID = 0; // Step2에서 "구독 중인 서비스가 없어요" 선택 시 productId로 사용

/** 간단한 가격 포맷터 (외부 의존 최소화) */
const toKRW = (n: number) => `${n.toLocaleString('ko-KR')}원`;

/** (임시) productId 별 요금제 더미 */
const DUMMY_PLANS_BY_PRODUCT: Record<
  number,
  Array<{ id: number; name: string; price: number; benefit?: string }>
> = {
  101: [
    { id: 1, name: 'basic', price: 7900, benefit: '광고o, FHD-1' },
    { id: 2, name: 'standard', price: 13500, benefit: 'FHD-2 동시' },
    { id: 3, name: 'premium', price: 17000, benefit: 'UHD-4 동시' },
  ],
  201: [
    { id: 11, name: '와우 베이직', price: 4990, benefit: '로켓배송, 리워드' },
    { id: 12, name: '와우 플러스', price: 8900, benefit: '영상 + 배송' },
  ],
  // 필요 시 추가…
};

type ApiResp = {
  status: number;
  code: string;
  message: string;
  data: { plans: Array<{ id: number; name: string; price: number; benefit?: string }> };
};

/**
 * Step3: 요금제 선택 + 인원 입력
 * - productId가 바뀌면 planId/selectedPlan을 초기화
 * - (지금은 더미를 사용) 실제 API 호출은 주석 참고
 * - 직접입력 케이스(productId === 0)면 이름만 입력하고 다음 단계에서 가격/인원 등을 받음
 */
export const StepPlan = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) => {
  const { setValue, watch, register, formState, trigger } = useFormContext<RegisterForm>();

  const productId = watch('productId');
  const planId = watch('planId');
  const participant = watch('participantCount');
  const isCustom = productId === NONE_ID;

  console.log(planId, participant, formState.isValid);
  const [options, setOptions] = useState<PlanOption[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  /* ──────────────────────────────────────────────────────────────────────────
   * ① 직접입력 모드 (productId === 0)
   *  - 서비스명만 먼저 받는다. 금액/인원은 StepConfirm에서 입력.
   * ────────────────────────────────────────────────────────────────────────── */
  if (isCustom) {
    return (
      <section className="space-y-6">
        <header className="typo-title-l-bold">
          구독 중인 상품이 없나요?
          <br />
          직접 추가해서 등록할 수 있어요.
        </header>

        <div>
          <Input
            placeholder="구독 중인 상품 이름을 입력하세요"
            {...register('customProductName', {
              required: '필수 입력값이에요.',
              maxLength: { value: 15, message: '15자를 초과할 수 없어요.' },
            })}
            aria-invalid={!!formState.errors.customProductName}
            className={cn(
              'rounded-2xl',
              formState.errors.customProductName && 'border-primary-600',
            )}
          />
          {formState.errors.customProductName?.message && (
            <p className="mt-2 ml-2 text-sm text-primary-600">
              {formState.errors.customProductName.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button variant="primary-stroke" onClick={onPrev} title="이전" />
          <Button
            variant="primary-fill"
            onClick={async () => {
              const ok = await trigger('customProductName');
              if (ok) onNext();
            }}
            disabled={!formState.isValid}
            title="다음"
          />
        </div>
      </section>
    );
  }

  /* ──────────────────────────────────────────────────────────────────────────
   * ② 일반 모드: productId 변경 시 요금제 로딩 & 선택 초기화
   *    - planId, selectedPlan 모두 초기화
   * ────────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!productId) {
      setOptions([]);
      setLoading(false);
      return;
    }
    // 서비스가 바뀌면 이전 선택 초기화
    setValue('planId', undefined, { shouldDirty: true });
    setValue('selectedPlan', null, { shouldDirty: true });

    // (현재) 더미 사용
    setLoading(true);
    setErr(null);
    const dummy = DUMMY_PLANS_BY_PRODUCT[productId] ?? [];
    const mapped: PlanOption[] = dummy.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price, // 숫자 가격 보존
      priceLabel: toKRW(p.price), // 표시용 라벨
      benefit: p.benefit,
    }));
    setOptions(mapped);
    setLoading(false);

    // (추후) 실제 API
  }, [productId, setValue]);

  const title = useMemo(() => '요금제를 선택해주세요.', []);

  /* ──────────────────────────────────────────────────────────────────────────
   * ③ 뷰
   *  - 라디오 선택 시 planId와 함께 selectedPlan 메타를 폼에 저장
   *    → StepConfirm에서 watch('selectedPlan')로 그대로 사용 가능
   * ────────────────────────────────────────────────────────────────────────── */
  return (
    <section className="space-y-6">
      <header className="typo-title-m-bold">
        구독중인 서비스의 <br />
        {title}
      </header>

      {/* 로딩/에러 핸들링 (간단 표시) */}
      {loading && (
        <div className="rounded-2xl border p-6 text-center text-gray-500">불러오는 중…</div>
      )}
      {err && <div className="rounded-2xl border p-6 text-center text-primary-600">{err}</div>}

      {!loading && !err && (
        <div className="space-y-3" role="radiogroup" aria-label="요금제 선택">
          {(options ?? []).length === 0 ? (
            <div className="rounded-2xl border border-dashed p-6 text-center text-gray-500">
              해당 서비스의 요금제가 없어요.
            </div>
          ) : (
            options!.map(p => {
              const selected = planId === p.id;
              return (
                <label key={p.id} className="block">
                  <input
                    type="radio"
                    name="planId"
                    className="sr-only"
                    checked={selected}
                    onChange={() => {
                      setValue('planId', p.id!, { shouldDirty: true });
                      // ✅ 선택 요금제 요약 메타 저장: StepConfirm에서 재조회 없이 사용
                      setValue(
                        'selectedPlan',
                        {
                          id: p.id!,
                          name: p.name,
                          price: p.price,
                          priceLabel: p.priceLabel,
                          benefit: p.benefit,
                        },
                        { shouldDirty: true },
                      );
                    }}
                  />
                  <ContentsCard
                    left={<span className="typo-title-s-bold">{p.name}</span>}
                    right={<span className="typo-title-s-bold text-gray-800">{p.priceLabel}</span>}
                    className={cn(
                      'rounded-2xl bg-white',
                      selected ? 'ring-1 ring-primary-600' : 'ring-1 ring-transparent',
                    )}
                  />
                </label>
              );
            })
          )}
        </div>
      )}

      {/* 인원 입력 (일반 모드에서만) */}
      <div>
        <p className="mb-2 typo-title-s-bold">함께 사용하는 인원을 입력해주세요.</p>
        <div className="flex items-center">
          <Input
            type="number"
            min={1}
            defaultValue={1}
            {...register('participantCount', { valueAsNumber: true, min: 1 })}
            className="pr-10"
          />
          <span className="px-5">명</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button variant="primary-stroke" onClick={onPrev} title="이전" />
        <Button
          variant="primary-fill"
          onClick={onNext}
          disabled={!planId || !participant || !formState.isValid}
          title="다음"
        />
      </div>
    </section>
  );
};
