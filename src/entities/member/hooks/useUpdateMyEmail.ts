import { useMutation, useQueryClient } from '@tanstack/react-query';

import { updateMyEmail } from '@/entities/member/api/updateMyEmail';

// 내 정보 수정 훅 (이메일))
export const useUpdateMyEmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => updateMyEmail(email),
    onSuccess: () => {
      // 수정이 성공하면 'myInfo' 쿼리 키를 무효화하여 최신 데이터를 다시 불러옵니다.
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: error => {
      // 에러 처리 로직 (예: 에러 메시지 표시)
      console.error('Failed to update my info:', error);
    },
  });
};
