import { useQuery } from '@tanstack/react-query';

import { fetchUnsubscriptionUrl } from '../api/fetchUnsubscriptionUrl';

export const useUnsubscriptionUrl = (subscriptionId: number) => useQuery({
    queryKey: ['unsubscription-url', subscriptionId],
    queryFn: () => fetchUnsubscriptionUrl(subscriptionId),
    enabled: !!subscriptionId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: false, // 실패 시 재시도 안함
  });
