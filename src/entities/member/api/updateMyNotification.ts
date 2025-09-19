import type { MyInfo, MyInfoResponse } from '@/entities/member/api/fetchMyInfo';
import apiClient from '@/shared/api/apiClient';

/**
 * 내 이메일 알람 상태를 수정하는 API 함수입니다.
 */
export const updateMyNotification = async (isNotificationOn: boolean): Promise<MyInfo> => {
  const response = await apiClient.patch<MyInfoResponse>('/member/my/notification', {
    isNotificationOn,
  });
  return response.data.data; // 서버 응답의 data 객체 안의 data를 반환합니다.
};
