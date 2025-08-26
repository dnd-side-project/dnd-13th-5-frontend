import { useQuery } from '@tanstack/react-query';

import { fetchPlans } from '@/entities/product/api/fetchPlans';

export const usePlans = (productId: number) =>
  useQuery({
    queryKey: ['plans', productId],
    queryFn: () => fetchPlans(productId),
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
