import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { deleteMyInfo, fetchMyInfo, updateMyInfo, updateMyNotification } from '../api/myInfo';

export const useMyInfo = () =>
  useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    retry: 1, // 토큰 갱신 실패 시 1번만 재시도
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    refetchOnWindowFocus: false,
  });

// 내 정보 수정 훅 (이메일))
export const useUpdateMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (email: string) => updateMyInfo(email),
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

// 내 알림 상태 수정 훅
export const useUpdateMyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (isNotificationOn: boolean) => updateMyNotification(isNotificationOn),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: error => {
      console.error('Failed to update my notification:', error);
    },
  });
};

// 회원탈퇴 훅
export const useDeleteMyInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteMyInfo(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myInfo'] });
    },
    onError: error => {
      console.error('Failed to delete my info:', error);
    },
  });
};
