/**
 * 공통 API 응답 타입
 *
 * 프로젝트 전체에서 사용하는 표준 API 응답 형식을 정의합니다.
 */

/**
 * 페이지네이션 응답 (백엔드 표준 형식)
 *
 * @example
 * {
 *   success: true,
 *   count: 50,
 *   items: [...]
 * }
 */
export interface PaginatedResponse<T> {
  success: true;
  /** 전체 아이템 수 */
  count: number;
  /** 현재 페이지의 데이터 배열 */
  items: T[];
}

/**
 * API 응답 타입 (Discriminated Union)
 *
 * TypeScript의 타입 좁히기를 활용하여 success 값에 따라
 * data 또는 error 속성의 존재를 보장합니다.
 *
 * @example
 * const response: ApiResponse<User> = await fetch(...);
 *
 * if (response.success) {
 *   console.log(response.data.name); // ✅ data 속성 사용 가능
 * } else {
 *   console.log(response.error);     // ✅ error 속성 사용 가능
 * }
 */
export type ApiResponse<T> = { success: true; data: T } | { success: false; error: string };

/**
 * API 응답을 unwrap하여 데이터를 반환하거나 에러를 throw합니다.
 *
 * 이 헬퍼 함수를 사용하면 API 함수에서 성공 케이스만 다루고,
 * 에러는 자동으로 throw되어 try-catch나 React Query로 처리할 수 있습니다.
 *
 * @param response - API 응답 객체
 * @returns 성공 시 데이터 반환
 * @throws 실패 시 에러 메시지와 함께 Error throw
 *
 * @example
 * export async function getUser(id: number) {
 *   const response = await apiClient.get<ApiResponse<User>>(`/users/${id}`);
 *   return unwrapApiResponse(response.data);
 * }
 */
export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  if (!response.success) {
    throw new Error(response.error);
  }
  return response.data;
}

/**
 * 페이지네이션 쿼리 파라미터
 */
export interface PaginationParams {
  /** 페이지 번호 (1부터 시작) */
  page?: number;
}

/**
 * 정렬 쿼리 파라미터 (나중을 위한 준비)
 */
export interface SortParams {
  /** 정렬 필드 (예: 'createdAt', 'rating', 'price') */
  sort?: string;
  /** 정렬 순서 */
  order?: 'asc' | 'desc';
}
