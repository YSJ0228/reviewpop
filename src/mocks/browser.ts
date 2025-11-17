/**
 * MSW 브라우저 설정
 *
 * 브라우저 환경에서 Mock API를 활성화합니다.
 * 개발 환경에서만 사용됩니다.
 */

import { setupWorker } from 'msw/browser';

import { handlers } from './handlers';

/**
 * Service Worker 설정
 */
export const worker = setupWorker(...handlers);
