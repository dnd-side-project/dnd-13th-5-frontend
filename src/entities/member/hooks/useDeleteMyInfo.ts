import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteMyInfo } from '@/entities/member/api/deleteMyInfo';

// 회원탈퇴 훅
export const useDeleteMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMyInfo(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['myInfo'] });
    },
    onError: error => {
      console.error('Failed to delete my info:', error);
    },
  });
};
