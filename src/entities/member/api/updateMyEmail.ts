import type { MyInfo, MyInfoResponse } from '@/entities/member/api/fetchMyInfo';
import apiClient from '@/shared/api/apiClient';

/**
 * 현재 로그인된 사용자의 정보를 수정하는 API 함수입니다.
 * @param {string} email - 변경할 이메일 주소입니다.
 */
export const updateMyEmail = async (email: string): Promise<MyInfo> => {
  const response = await apiClient.patch<MyInfoResponse>('/member/my/info', { email });
  return response.data.data; // 서버 응답의 data 객체 안의 data를 반환합니다.
};
