/**
 * 페이지네이션 유틸리티
 *
 * 데이터 배열에 페이지네이션을 적용합니다.
 */

import type { PaginatedResponse } from '@shared/api/types/common.types';

/**
 * 페이지네이션 적용
 *
 * @param items - 전체 데이터 배열
 * @param page - 페이지 번호 (1부터 시작)
 * @param itemsPerPage - 페이지당 아이템 수 (백엔드 고정값)
 * @returns 페이지네이션된 응답 (백엔드 형식: { success, count, items })
 *
 * @example
 * const result = paginate(mockReviews, 1, 10);
 * // {
 * //   success: true,
 * //   count: 50,
 * //   items: [...] // 10개
 * // }
 */
export function paginate<T>(
  items: T[],
  page: number = 1,
  itemsPerPage: number = 10,
): PaginatedResponse<T> {
  // 페이지 번호는 최소 1
  const validPage = Math.max(1, page);

  // 시작 인덱스와 종료 인덱스 계산
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    success: true,
    count: items.length, // 전체 아이템 수
    items: items.slice(startIndex, endIndex), // 현재 페이지의 데이터
  };
}
