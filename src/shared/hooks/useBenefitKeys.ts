import { useMemo } from 'react';

import type { Plans } from '@/entities/product/api/fetchPlans';
import type { ProductsInfo } from '@/entities/product/api/fetchProductsInfo';
import { getBenefitKeys } from '@/shared/lib/getBenefitKeys';

/**
 * 선택된 상품들의 요금제에서 모든 고유한 혜택 키를 수집하는 커스텀 훅
 * @param products - 요금제 정보를 포함하는 상품 배열
 * @returns 모든 상품의 고유한 혜택 키 배열
 */

export const useBenefitKeysFromPlans = (plans: Plans[] | null): string[] => useMemo(() => {
    if (!plans || plans.length === 0) return [];

    const allBenefitKeys = new Set<string>();

    plans.forEach(plan => {
      const benefitsString = plan.benefit ?? '';
      getBenefitKeys(benefitsString).forEach(key => allBenefitKeys.add(key));
    });

    return Array.from(allBenefitKeys);
  }, [plans]);

/**
 * Products 배열에서 모든 고유한 혜택 키를 수집하는 커스텀 훅.
 * @param products - 상품 정보를 담고 있는 Products 배열 또는 null.
 * @returns 모든 혜택의 고유한 키 배열.
 */
export const useBenefitKeysFromProducts = (products: ProductsInfo[] | null): string[] => useMemo(() => {
    if (!products || products.length === 0) return [];

    const allBenefitKeys = new Set<string>();

    products.forEach(product => {
      product.plans?.forEach(plan => {
        const benefitsString = plan.benefit ?? '';
        getBenefitKeys(benefitsString).forEach(key => allBenefitKeys.add(key));
      });
    });

    return Array.from(allBenefitKeys);
  }, [products]);
