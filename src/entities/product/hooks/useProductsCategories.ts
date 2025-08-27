import { useQuery } from '@tanstack/react-query';

import { fetchProductsCategoriesInfo } from '@/entities/product/api/fetchProductsCategories';

export const useProductsCategories = () =>
  useQuery({
    queryKey: ['productsCategories'],
    queryFn: () => fetchProductsCategoriesInfo(),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
