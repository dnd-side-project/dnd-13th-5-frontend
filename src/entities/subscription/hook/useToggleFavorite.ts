import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ToggleFavoriteResponse } from '../api/toggleFavorite';
import { toggleFavorite } from '../api/toggleFavorite';

/**
 * 구독 서비스의 즐겨찾기 상태를 토글하는 React Query mutation 훅입니다.
 * 성공 시 관련 쿼리들을 무효화하여 최신 데이터를 다시 가져옵니다.
 */
export const useToggleFavorite = (): UseMutationResult<ToggleFavoriteResponse, Error, number> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      // 즐겨찾기 상태 변경 성공 시 관련 쿼리들을 무효화하여 최신 데이터 갱신
      queryClient.invalidateQueries({ queryKey: ['my-subscriptions'] });
    },
    onError: error => {
      console.error('즐겨찾기 상태 변경 실패:', error);
    },
  });
};
