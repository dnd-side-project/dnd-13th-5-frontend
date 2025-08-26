// /shared/api/apiClient.ts

import type { AxiosInstance } from 'axios';
import axios from 'axios';
import qs from 'qs';

import {
  errorResponseInterceptor,
  requestInterceptor,
  successResponseInterceptor,
} from './authInterceptors';

axios.defaults.withCredentials = true;

/**
 * API 통신을 위한 기본 Axios 클라이언트 인스턴스입니다.
 * baseURL, withCredentials 등 기본 설정이 포함되어 있습니다.
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api`,
  withCredentials: true, // cross-origin 환경에서 쿠키(리프레시 토큰) 전송을 위함
  timeout: 10000, // 10초 타임아웃
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }), // 배열 직렬화를 위함
});

// 요청/응답 인터셉터 적용
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(
  successResponseInterceptor,
  error => errorResponseInterceptor(apiClient, error), // 에러 인터셉터에는 apiClient 인스턴스 자신을 전달
);

export default apiClient;
