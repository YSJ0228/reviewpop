/**
 * localStorage 헬퍼 함수
 *
 * localStorage를 타입 안전하게 사용하기 위한 유틸리티입니다.
 * JSON 직렬화/역직렬화를 자동으로 처리합니다.
 */

/**
 * localStorage에 값을 저장합니다
 *
 * @param key - 저장할 키
 * @param value - 저장할 값 (자동으로 JSON.stringify 됨)
 */
function set<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;

  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('localStorage 저장 실패:', error);
  }
}

/**
 * localStorage에서 값을 가져옵니다
 *
 * @param key - 가져올 키
 * @returns 저장된 값 또는 null
 */
function get<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;

  try {
    const item = localStorage.getItem(key);
    if (item === null) return null;

    return JSON.parse(item) as T;
  } catch (error) {
    console.error('localStorage 읽기 실패:', error);
    return null;
  }
}

/**
 * localStorage에서 값을 삭제합니다
 *
 * @param key - 삭제할 키
 */
function remove(key: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('localStorage 삭제 실패:', error);
  }
}

/**
 * localStorage를 모두 비웁니다
 */
function clear(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error('localStorage 초기화 실패:', error);
  }
}

/**
 * localStorage 헬퍼 객체
 *
 * @example
 * ```ts
 * import { storage } from '@shared/lib/storage';
 *
 * // 저장
 * storage.set('user', { id: 1, name: '홍길동' });
 *
 * // 가져오기
 * const user = storage.get<User>('user');
 *
 * // 삭제
 * storage.remove('user');
 * ```
 */
export const storage = {
  set,
  get,
  remove,
  clear,
};
