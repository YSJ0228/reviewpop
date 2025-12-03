import { STATUS_VISIT } from './constants';

/**
 * 방문 상태 타입
 * - before: 방문 전
 * - scheduled: 방문 예정
 */
export type VisitStatus = keyof typeof STATUS_VISIT;
