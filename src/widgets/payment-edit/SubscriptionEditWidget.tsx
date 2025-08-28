// src/widgets/payment-edit/SubscriptionEditWidget.tsx
/**
 * 구독 서비스 결제 정보를 편집하는 위젯 컴포넌트
 * - 일반 요금제와 커스텀 요금제 모두 지원
 * - 결제 금액, 사용 인원, 결제 주기, 결제일, 결제 수단 등 모든 결제 관련 정보 관리
 * - react-hook-form을 사용한 폼 검증 및 상태 관리
 */
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

// API 관련 타입 및 훅 imports
import type { Plans } from '@/entities/product/api/fetchPlans';
import { usePlans } from '@/entities/product/hooks/usePlans';
// UI 컴포넌트 imports
import { transformToMethodOptions } from '@/entities/subscription/api/fetchPaymentMethods';
import { usePaymentMethods } from '@/entities/subscription/hook/usePaymentMethods';
import type { MethodKind } from '@/entities/subscription/model/edit.types';
import type { MethodOptionsByKind } from '@/entities/subscription/model/register.types';
import { BillingCycleRadio } from '@/features/subscription-edit/ui/BillingCycleRadio';
import { PaymentDateField } from '@/features/subscription-edit/ui/PaymentDateField';
import { PaymentMethodPicker } from '@/features/subscription-edit/ui/PaymentMethodPicker';
import { Icons } from '@/shared/assets/icons';
import { cn } from '@/shared/lib';
import { Button } from '@/shared/ui/button';
import { ContentsCard } from '@/shared/ui/contents-card';
import { Icon } from '@/shared/ui/icon';
import { Input } from '@/shared/ui/input';

/**
 * 결제주기 옵션 정의
 * - WEEK: 매주 반복 결제
 * - MONTH: 매달 반복 결제
 * - YEAR: 매년 반복 결제
 */
const CYCLE_OPTIONS: { value: 'WEEK' | 'MONTH' | 'YEAR'; label: string }[] = [
  { value: 'WEEK', label: '매주' },
  { value: 'MONTH', label: '매달' },
  { value: 'YEAR', label: '매년' },
];

/**
 * 결제 편집 폼의 데이터 구조 정의
 * @interface SubscriptionEditForm
 */
type SubscriptionEditForm = {
  /** 선택된 요금제 ID */
  planId: number;
  /** 구독 서비스명 (커스텀 모드에서 사용자 입력) */
  productName: string;
  /** 결제 금액 */
  price: number;
  /** 사용 인원 수 */
  participantCount: number;
  /** 결제 주기 단위 */
  payCycleUnit: 'WEEK' | 'MONTH' | 'YEAR';
  /** 결제 시작일 (null이면 결제일 모름) */
  startedAt: string | null;
  /** 선택된 결제수단 ID */
  paymentMethodId: number;
  /** 결제수단 종류 (카드/계좌/간편결제) */
  methodKind: MethodKind;
  /** 사용자 메모 */
  memo: string;
  /** 선택된 요금제 상세 정보 (확인 단계에서 재조회 방지용) */
  selectedPlan?: {
    id: number;
    name: string;
    price: number;
    benefit: string;
  };
};

/**
 * SubscriptionEditWidget 컴포넌트의 Props 정의
 * @interface SubscriptionEditWidgetProps
 */
type SubscriptionEditWidgetProps = {
  /** 폼 초기값 (편집 모드에서 기존 데이터 전달) */
  defaultValues?: Partial<SubscriptionEditForm>;
  /** 저장 버튼 클릭 시 호출되는 콜백 */
  onSave: (data: SubscriptionEditForm) => void;
  /** 취소 버튼 클릭 시 호출되는 콜백 (선택사항) */
  onCancel?: () => void;
  /** 저장 중 로딩 상태 표시 */
  isLoading?: boolean;
  /** 구독 서비스의 제품 ID */
  productId: number;
  /** 커스텀 모드 여부 (true: 사용자 정의, false: 기존 요금제 선택) */
  isCustom: boolean;
  /** 기본 선택할 요금제명 (선택사항) */
  planName?: string;
};

/**
 * 결제 정보 편집 위젯 메인 컴포넌트
 *
 * @param defaultValues - 폼 초기값 (편집 모드에서 사용)
 * @param onSave - 저장 완료 시 호출되는 콜백 함수
 * @param onCancel - 취소 버튼 클릭 시 호출되는 콜백 함수
 * @param isLoading - 저장 중 로딩 상태
 * @param productId - 구독 서비스 제품 ID
 * @param isCustom - 커스텀 모드 여부 (일반 요금제 vs 사용자 정의)
 * @param planName - 기본 선택할 요금제명
 */
const SubscriptionEditWidget = ({
  defaultValues,
  onSave,
  onCancel,
  isLoading = false,
  productId,
  isCustom,
  planName,
}: SubscriptionEditWidgetProps) => {
  // ============================================================================
  // 1. API 데이터 조회
  // ============================================================================

  /** 해당 제품의 모든 요금제 정보 조회 */
  const { data: plansData, isLoading: isPlansLoading, isError: isPlansError } = usePlans(productId);

  // ============================================================================
  // 2. 폼 상태 관리 (react-hook-form)
  // ============================================================================

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SubscriptionEditForm>({
    defaultValues: {
      ...defaultValues,
    },
  });

  // ============================================================================
  // 3. 폼 필드 실시간 감시
  // ============================================================================

  // productId로 plan을 조회
  // planId도 같이 넘겨줘

  /** 폼 필드들의 현재 값 실시간 감시 */
  const payCycleUnit = watch('payCycleUnit');
  const startedAt = watch('startedAt');
  const paymentMethodId = watch('paymentMethodId');
  const participantCount = watch('participantCount');
  const price = watch('price');
  const productName = watch('productName');
  const methodKind = watch('methodKind');
  const methodId = watch('paymentMethodId');
  const memo = watch('memo');
  const planId = watch('planId');

  /** 🔍 실시간 폼 데이터 확인 - 개발 모드에서만 */
  const watchedData = watch();

  // ============================================================================
  // 4. 로컬 상태 관리
  // ============================================================================

  /** 결제일 모름 상태 (체크박스로 제어) */
  const [isUnknownDate, setIsUnknownDate] = useState(defaultValues?.startedAt === null);

  // ============================================================================
  // 5. 이벤트 핸들러
  // ============================================================================

  /**
   * 결제일 모름 상태 변경 핸들러
   * 체크 시 결제일을 null로 설정하여 '결제일 모름' 상태로 만듦
   */
  const handleUnknownDateChange = (checked: boolean) => {
    setIsUnknownDate(checked);
    if (checked) {
      setValue('startedAt', null, { shouldDirty: true });
    }
  };

  // ============================================================================
  // 6. API 데이터 가공 및 변환
  // ============================================================================

  /** 결제수단 목록 조회 (카드, 계좌, 간편결제) */
  const { data: paymentMethodsData, isLoading: isPaymentMethodsLoading } = usePaymentMethods();

  /**
   * API 응답을 폼에서 사용할 수 있는 구조로 변환
   * 각 결제수단 종류별로 옵션 배열을 생성
   */
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

  /**
   * paymentMethodId로 해당하는 methodKind를 찾는 유틸리티 함수
   * 편집 모드에서 기존 결제수단의 종류를 자동 감지하는 데 사용
   */
  const findMethodKindById = useMemo(() => {
    if (!paymentMethodsData) return null;

    return (id: number): MethodKind | null => {
      // CARD에서 찾기
      if (paymentMethodsData.card.some(method => method.id === id)) {
        return 'CARD';
      }
      // ACCOUNT에서 찾기
      if (paymentMethodsData.account.some(method => method.id === id)) {
        return 'ACCOUNT';
      }
      // EASY에서 찾기 (간편결제)
      if (paymentMethodsData.easyPay.some(method => method.id === id)) {
        return 'EASY';
      }
      return null;
    };
  }, [paymentMethodsData]);

  // ============================================================================
  // 7. 사이드 이펙트 (useEffect)
  // ============================================================================

  /**
   * 편집 모드에서 기존 결제수단 ID로 결제수단 종류를 자동 감지
   * defaultValues.paymentMethodId가 있을 때 해당하는 methodKind를 자동으로 설정
   */
  useEffect(() => {
    if (defaultValues?.paymentMethodId && findMethodKindById && !methodKind) {
      const detectedKind = findMethodKindById(defaultValues.paymentMethodId);
      if (detectedKind) {
        setValue('methodKind', detectedKind, { shouldDirty: false });
      }
    }
  }, [defaultValues?.paymentMethodId, findMethodKindById, methodKind, setValue]);

  /**
   * planName이 제공된 경우 해당 이름의 요금제를 자동 선택
   * 등록 플로우에서 이전 단계에서 선택한 요금제를 자동으로 설정하는 데 사용
   */
  useEffect(() => {
    if (planName && plansData && !planId) {
      const matchedPlan = plansData.find((p: Plans) => p.name === planName);
      if (matchedPlan) {
        setValue('planId', matchedPlan.id, { shouldDirty: false });
        setValue(
          'selectedPlan',
          {
            id: matchedPlan.id,
            name: matchedPlan.name,
            price: matchedPlan.price,
            benefit: matchedPlan.benefit,
          },
          { shouldDirty: false },
        );
      }
    }
  }, [planName, plansData, planId, setValue]);

  // ============================================================================
  // 8. 폼 검증 및 제출
  // ============================================================================

  /**
   * 폼 제출 가능 여부 검증
   * 필수 필드들이 모두 올바르게 입력되었는지 확인
   */
  const canSubmit = useMemo(() => {
    if (!participantCount || participantCount < 1) return false;
    if (!paymentMethodId || paymentMethodId === 0) return false;
    if (!productName?.trim()) return false;
    if (!price || price <= 0) return false;
    // 결제일 모름 체크박스가 체크되지 않은 경우, 결제일이 필수
    if (!isUnknownDate && !startedAt) {
      return false;
    }
    return true;
  }, [participantCount, paymentMethodId, productName, price, isUnknownDate, startedAt]);

  /**
   * 폼 제출 핸들러
   * react-hook-form의 handleSubmit과 함께 사용되어 검증 통과 시 실행
   */
  const onSubmit = (data: SubscriptionEditForm) => {
    onSave(data);
  };

  // ============================================================================
  // 9. 렌더링 (JSX)
  // ============================================================================

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* ======================================================================
            요금제 선택 섹션 (일반 모드에서만 표시)
        ====================================================================== */}
        {!isCustom && (
          <fieldset className="flex flex-col gap-3">
            <legend className="mb-2 typo-title-s-bold">선택한 요금제</legend>
            {plansData &&
              plansData.map((p: Plans) => {
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
                            benefit: p.benefit,
                          },
                          { shouldDirty: true },
                        );
                      }}
                    />
                    <ContentsCard
                      left={<span className="typo-body-s-medium">{p.name}</span>}
                      right={<span className="typo-body-s-medium text-gray-800">{p.price}원</span>}
                      className={cn(
                        'rounded-2xl bg-white border box-border',
                        selected ? 'border-primary-700' : 'border-gray-100',
                      )}
                    />
                  </label>
                );
              })}
          </fieldset>
        )}

        {/* ======================================================================
            커스텀 서비스명 입력 (커스텀 모드에서만 표시)
        ====================================================================== */}
        {isCustom && (
          <fieldset>
            <legend className="mb-2 typo-title-s-bold">구독 서비스 이름</legend>
            <Input
              placeholder="서비스명을 입력해주세요."
              {...register('productName', {
                required: '서비스명을 입력해주세요.',
              })}
              aria-invalid={!!errors.productName}
              className={errors.productName ? 'border-primary-600' : undefined}
            />
            {errors.productName?.message && (
              <p className="mt-2 ml-2 text-sm text-primary-600">
                {String(errors.productName.message)}
              </p>
            )}
          </fieldset>
        )}

        {/* ======================================================================
            커스텀 결제 금액 입력 (커스텀 모드에서만 표시)
        ====================================================================== */}
        {isCustom && (
          <fieldset>
            <legend className="mb-2 typo-title-s-bold">결제 금액</legend>
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="클릭하여 금액을 입력해주세요."
                {...register('price', {
                  valueAsNumber: true,
                  required: '결제 금액을 입력해주세요.',
                  min: { value: 1, message: '1원 이상 입력해주세요.' },
                })}
                aria-invalid={!!errors.price}
                className={errors.price ? 'border-primary-600' : undefined}
              />
              <span className="px-5">원</span>
            </div>
            {errors.price?.message && (
              <p className="mt-2 ml-2 text-sm text-primary-600">{String(errors.price.message)}</p>
            )}
          </fieldset>
        )}

        {/* ======================================================================
            사용 인원 입력 (공통 필드)
        ====================================================================== */}
        <fieldset>
          <legend className="mb-2 typo-title-s-bold">사용 인원</legend>
          <div className="flex items-center">
            <Input
              type="number"
              min={1}
              {...register('participantCount', {
                valueAsNumber: true,
                required: '사용 인원을 입력해주세요.',
                min: { value: 1, message: '최소 1명 이상이어야 합니다.' },
              })}
              aria-invalid={!!errors.participantCount}
              className={errors.participantCount ? 'border-primary-600' : undefined}
            />
            <span className="px-5">명</span>
          </div>
          {errors.participantCount?.message && (
            <p className="mt-2 ml-2 text-sm text-primary-600">
              {String(errors.participantCount.message)}
            </p>
          )}
        </fieldset>

        {/* ======================================================================
            결제 주기 선택 (공통 필드)
        ====================================================================== */}
        <BillingCycleRadio
          name="payCycleUnit"
          value={payCycleUnit}
          onChange={v => setValue('payCycleUnit', v, { shouldDirty: true })}
          options={CYCLE_OPTIONS}
        />

        {/* ======================================================================
            결제일 설정 (공통 필드)
        ====================================================================== */}
        <div className={isUnknownDate ? 'opacity-50 pointer-events-none' : ''}>
          <PaymentDateField
            value={isUnknownDate ? null : startedAt}
            onChange={d => setValue('startedAt', d, { shouldDirty: true })}
            disabled={isUnknownDate}
          />
        </div>
        {/* 결제일 모름 체크박스 */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleUnknownDateChange(!isUnknownDate)}
            className="flex items-center justify-center w-5 h-5 transition-colors"
            aria-pressed={isUnknownDate}
            aria-label="결제 날짜를 모르겠어요"
          >
            <Icon
              component={Icons.Check}
              size="sm"
              className={`text-white rounded ${
                isUnknownDate ? 'bg-primary-700 border-primary-700' : 'bg-gray-300'
              }`}
            />
          </button>
          <label
            onClick={() => handleUnknownDateChange(!isUnknownDate)}
            className="text-gray-500 cursor-pointer select-none typo-body-s-medium"
          >
            결제 날짜를 모르겠어요 (결제일 없이 등록)
          </label>
        </div>

        {/* ======================================================================
            결제 수단 선택 (공통 필드)
        ====================================================================== */}
        <PaymentMethodPicker
          kind={methodKind}
          methodId={methodId?.toString()}
          onChangeKind={k => setValue('methodKind', k as MethodKind, { shouldDirty: true })}
          onChangeMethod={id => setValue('paymentMethodId', Number(id), { shouldDirty: true })}
          options={methodOptions}
        />

        {/* ======================================================================
            메모 입력 (선택 필드)
        ====================================================================== */}
        <fieldset>
          <legend className="mb-2 typo-title-s-bold">메모</legend>
          <Input
            placeholder="클릭하여 메모를 남길 수 있어요."
            {...register('memo')}
            defaultValue={memo}
          />
        </fieldset>

        {/* ======================================================================
            액션 버튼 (저장/취소)
        ====================================================================== */}
        <div className="grid grid-cols-2 gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="primary-stroke"
              onClick={onCancel}
              disabled={isLoading}
              title="취소"
            />
          )}
          <Button
            type="submit"
            variant="primary-fill"
            disabled={!canSubmit || isLoading}
            title={isLoading ? '저장 중...' : '저장하기'}
            className={!onCancel ? 'col-span-2' : ''}
          />
        </div>
      </form>
    </div>
  );
};

export default SubscriptionEditWidget;
