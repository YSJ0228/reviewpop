/**
 * 정렬 유틸리티 (나중 사용을 위한 준비)
 *
 * 데이터 배열에 정렬을 적용합니다.
 * 현재는 사용하지 않지만, 나중에 정렬 기능이 필요할 때 활용하세요.
 */

/**
 * 범용 정렬 함수
 *
 * @param items - 정렬할 데이터 배열
 * @param sortField - 정렬할 필드명 (예: 'createdAt', 'rating', 'price')
 * @param order - 정렬 순서 ('asc': 오름차순, 'desc': 내림차순)
 * @returns 정렬된 데이터 배열
 *
 * @example
 * // 가격 오름차순 정렬
 * const sorted = applySort(products, 'price', 'asc');
 *
 * @example
 * // 생성일 내림차순 정렬 (최신순)
 * const sorted = applySort(reviews, 'createdAt', 'desc');
 *
 * @example
 * // 평점 내림차순 정렬 (높은 평점 순)
 * const sorted = applySort(reviews, 'rating', 'desc');
 */
export function applySort<T>(items: T[], sortField?: string, order: 'asc' | 'desc' = 'desc'): T[] {
  // 정렬 필드가 없으면 원본 배열 반환
  if (!sortField) {
    return items;
  }

  // 배열 복사 후 정렬 (원본 변경 방지)
  return [...items].sort((a, b) => {
    const aRecord = a as Record<string, unknown>;
    const bRecord = b as Record<string, unknown>;
    const aValue = aRecord[sortField];
    const bValue = bRecord[sortField];

    // undefined/null 처리
    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    // 숫자 비교
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // 문자열 비교 (날짜 문자열 포함)
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      if (order === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }

    // 기본 비교
    if (order === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}

/**
 * 정렬 사용 예시 (주석 처리됨)
 *
 * handlers/reviews.ts 에서 사용하는 방법:
 *
 * ```typescript
 * import { applySort } from '../utils/sort';
 *
 * http.get('/api/reviews', ({ request }) => {
 *   const url = new URL(request.url);
 *
 *   // 정렬 파라미터 파싱
 *   const sort = url.searchParams.get('sort') || 'createdAt';
 *   const order = url.searchParams.get('order') === 'asc' ? 'asc' : 'desc';
 *
 *   // 1. 필터링
 *   let result = applyFilters(mockReviews, filters);
 *
 *   // 2. 정렬
 *   result = applySort(result, sort, order);
 *
 *   // 3. 페이지네이션
 *   return HttpResponse.json(paginate(result, page, ITEMS_PER_PAGE));
 * });
 * ```
 */
