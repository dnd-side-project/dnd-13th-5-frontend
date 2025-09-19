import apiClient from '@/shared/api/apiClient';

export const logout = async (): Promise<void> => {
  await apiClient.post(`/auth/logout`, {}, { withCredentials: true });
};
