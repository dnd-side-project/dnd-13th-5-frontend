import { useQuery } from '@tanstack/react-query';

import { fetchProductsInfo } from '@/entities/product/api/fetchProductsInfo';

export const useProductsInfo = (productIds: number[]) =>
  useQuery({
    queryKey: ['productsInfo', productIds],
    queryFn: () => fetchProductsInfo(productIds),
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
