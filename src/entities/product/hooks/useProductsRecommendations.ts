import { useQuery } from '@tanstack/react-query';

import { fetchProductsRecommendations } from '@/entities/product/api/fetchProductsRecommendations';
import type { CategoryParam } from '@/shared/types/category.types';

export const useProductsRecommendations = (category: CategoryParam) =>
  useQuery({
    queryKey: ['productsRecommendations', category],
    queryFn: () => fetchProductsRecommendations(category),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
