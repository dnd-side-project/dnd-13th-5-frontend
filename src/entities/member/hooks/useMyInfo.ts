import { useQuery } from '@tanstack/react-query';

import { fetchMyInfo } from '../api/myInfo';

export const useMyInfo = () => useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });
