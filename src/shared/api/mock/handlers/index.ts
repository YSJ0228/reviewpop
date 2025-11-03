/**
 * MSW 핸들러 통합
 *
 * 모든 도메인별 핸들러를 하나로 통합합니다.
 */

import { authHandlers } from './auth';
import { productHandlers } from './products';
import { reviewHandlers } from './reviews';

/**
 * 모든 MSW 핸들러
 *
 * 새로운 도메인 핸들러를 추가할 때는 여기에 추가하세요.
 */
export const handlers = [...reviewHandlers, ...productHandlers, ...authHandlers];
