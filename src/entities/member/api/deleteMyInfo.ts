import apiClient from '@/shared/api/apiClient';

/**
 * 회원 탈퇴하는 API 함수입니다.
 */
export const deleteMyInfo = async (): Promise<void> => {
  await apiClient.delete('/member/withdraw');
};
