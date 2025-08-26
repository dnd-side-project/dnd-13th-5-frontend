// /shared/api/tokenManager.ts
import type { AxiosResponseHeaders } from 'axios';

// ... getAccessToken, setAccessToken, clearAccessToken 함수는 동일 ...
let accessToken: string | null = null;
export const getAccessToken = (): string | null => accessToken;
export const setAccessToken = (newToken: string | null): void => {
  accessToken = newToken;
};
export const clearAccessToken = (): void => {
  accessToken = null;
};

/**
 * Axios 응답 헤더 객체에서 액세스 토큰을 추출합니다.
 * HTTP 헤더는 대소문자를 구분하지 않으므로, 소문자로 변환하여 확인합니다.
 * @param {AxiosResponseHeaders} headers - Axios 응답의 headers 객체
 * @returns {string | null} 추출된 액세스 토큰 또는 null
 */
export const extractAccessFromHeaders = (headers: AxiosResponseHeaders): string | null => {
  // 헤더 이름을 소문자로 일관되게 처리하여 안정성 확보
  const authHeader = headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return headers['x-access-token'] || headers.accesstoken || null;
};
