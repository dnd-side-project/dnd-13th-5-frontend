import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { MyInfo } from '@/entities/member/api/fetchMyInfo';
import { updateMyNotification } from '@/entities/member/api/updateMyNotification';

// 내 알림 상태 수정 훅
export const useUpdateMyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isNotificationOn: boolean) => updateMyNotification(isNotificationOn),

    // mutation 시작 직후 캐시를 업데이트
    onMutate: async (isNotificationOn: boolean) => {
      await queryClient.cancelQueries({ queryKey: ['myInfo'] });

      // 기존 캐시 데이터 가져오기
      const previousData = queryClient.getQueryData<MyInfo>(['myInfo']);

      // 캐시 바로 업데이트
      queryClient.setQueryData<MyInfo>(['myInfo'], prev =>
        prev ? { ...prev, isNotificationOn } : prev,
      );

      // 콜백용 데이터 반환
      return { previousData };
    },

    // 실패 시 콜백
    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['myInfo'], context.previousData);
      }
      console.error('알림 상태 변경 실패:', error);
    },
    // 성공 시 콜백 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
};
