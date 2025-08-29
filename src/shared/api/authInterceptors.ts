import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  AxiosResponseHeaders,
  InternalAxiosRequestConfig,
} from 'axios';

import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/shared/store/authStore';

import { extractAccessFromHeaders, getAccessToken, setAccessToken } from './tokenManager';

// 토큰 재발급 API 호출 함수
// 순환 참조를 방지하기 위해 apiClient를 직접 사용하지 않고, 새로운 요청을 만듭니다.
const refreshToken = async (apiClient: AxiosInstance): Promise<string | null> => {
  const requestConfig = {
    // 이 요청 자체는 Authorization 헤더가 필요 없음을 명시
    skipAuth: true,
  } as AuthRequestConfig;

  const response = await apiClient.get('/auth/reissue', requestConfig);
  return extractAccessFromHeaders(response.headers as AxiosResponseHeaders);
};

// 동시 요청 문제를 해결하기 위한 재발급 로직 캡슐화
// isRefreshing 플래그와 대기열(subscribers)을 클로저로 관리
let isRefreshing = false;
let subscribers: ((token: string) => void)[] = [];

const addSubscriber = (callback: (token: string) => void) => {
  subscribers.push(callback);
};

const onRefreshed = (token: string) => {
  subscribers.forEach(callback => callback(token));
  subscribers = []; // 대기열 비우기
};

// 커스텀 설정이 포함된 요청 타입 정의
interface AuthRequestConfig extends InternalAxiosRequestConfig {
  skipAuth?: boolean; // 인증 헤더 추가를 건너뛸지 여부
  isRetry?: boolean; // 재시도된 요청인지 여부
}

/**
 * Axios 요청 인터셉터입니다.
 * 메모리에 액세스 토큰이 있으면 'Authorization: Bearer' 헤더를 추가합니다.
 * @param {AuthRequestConfig} config - Axios 요청 설정 객체
 * @returns {AuthRequestConfig} 수정된 설정 객체
 */
export const requestInterceptor = (config: AuthRequestConfig): AuthRequestConfig => {
  // 'skipAuth' 플래그가 true이면 인증 헤더를 추가하지 않습니다. (예: 토큰 재발급 요청)
  const isPublicRoute = config.url === ROUTES.HOME;
  if (config.skipAuth || isPublicRoute) {
    return config;
  }

  const accessToken = getAccessToken();
  if (accessToken && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
};

/**
 * Axios 응답 인터셉터입니다.
 * 성공적인 응답의 헤더에 새 액세스 토큰이 있으면 저장합니다.
 */
export const successResponseInterceptor = (response: AxiosResponse) => {
  const newAccessToken = extractAccessFromHeaders(response.headers as AxiosResponseHeaders);
  if (newAccessToken) {
    setAccessToken(newAccessToken);
  }
  return response;
};

/**
 * Axios 응답 에러 인터셉터입니다. (401 에러 처리 및 토큰 재발급 로직)
 * @param {AxiosInstance} apiClient - 에러가 발생한 Axios 인스턴스
 * @param {AxiosError} error - 발생한 Axios 에러 객체
 */
export const errorResponseInterceptor = async (apiClient: AxiosInstance, error: AxiosError) => {
  const originalRequest = error.config as AuthRequestConfig;

  if (error.response?.status !== 401 || originalRequest.isRetry) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise(resolve => {
      addSubscriber(newAccessToken => {
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        resolve(apiClient(originalRequest));
      });
    });
  }

  const retryRequest = { ...originalRequest, isRetry: true };
  isRefreshing = true;

  try {
    const newAccessToken = await refreshToken(apiClient);

    if (newAccessToken) {
      setAccessToken(newAccessToken);
      onRefreshed(newAccessToken);

      if (retryRequest.headers) {
        retryRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      }
      return apiClient(retryRequest);
    }
    throw new Error('Failed to refresh token');
  } catch (refreshError) {
    // ✅ 수정된 부분: 강제 리디렉션 대신 전역 상태를 업데이트합니다.
    useAuthStore.getState().logout();
    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};
