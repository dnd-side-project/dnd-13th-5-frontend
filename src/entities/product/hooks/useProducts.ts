import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { CategoryOption } from '@/shared/types/category.types';

import type { Products } from '../api/fetchProducts';
import { fetchProducts } from '../api/fetchProducts';

export const useProducts = (category: CategoryOption): UseQueryResult<Products[], Error> =>
  useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
