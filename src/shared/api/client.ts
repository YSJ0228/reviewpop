/**
 * Axios HTTP 클라이언트 설정
 *
 * 앱 전체에서 사용하는 HTTP 클라이언트입니다.
 * 공통 설정, 인터셉터, 에러 처리 등이 포함되어 있습니다.
 */

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { env } from '@shared/config/env';
import { CONSTANTS } from '@shared/config/constants';

/**
 * Axios 인스턴스 생성
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터
 *
 * 모든 요청에 인증 토큰을 자동으로 추가합니다.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // localStorage에서 토큰 가져오기
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/**
 * 응답 인터셉터
 *
 * 공통 에러 처리를 수행합니다.
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // 에러 처리
    if (error.response) {
      // 서버가 응답을 반환한 경우
      const { status } = error.response;

      switch (status) {
        case 401:
          // 인증 실패 - 로그인 페이지로 리다이렉트
          if (typeof window !== 'undefined') {
            localStorage.removeItem(CONSTANTS.STORAGE_KEYS.AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.STORAGE_KEYS.USER);
            window.location.href = '/login';
          }
          break;
        case 403:
          // 권한 없음
          console.error('접근 권한이 없습니다.');
          break;
        case 404:
          // 찾을 수 없음
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          // 서버 에러
          console.error('서버 오류가 발생했습니다.');
          break;
        default:
          console.error('오류가 발생했습니다:', error.message);
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      console.error('서버로부터 응답이 없습니다.');
    } else {
      // 요청 설정 중 에러가 발생한 경우
      console.error('요청 중 오류가 발생했습니다:', error.message);
    }

    return Promise.reject(error);
  },
);
