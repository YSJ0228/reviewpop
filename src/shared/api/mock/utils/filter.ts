/**
 * 범용 필터링 유틸리티
 *
 * 어떤 데이터든 필터 조건에 따라 자동으로 필터링합니다.
 */

/**
 * 범용 필터링 함수
 *
 * @param items - 필터링할 데이터 배열
 * @param filters - 필터 조건 객체
 * @returns 필터링된 데이터
 *
 * @example
 * // 기본 필터링 (정확히 일치)
 * applyFilters(reviews, { productId: 1, rating: 5 })
 *
 * @example
 * // 범위 필터링 (minXXX, maxXXX)
 * applyFilters(products, { minPrice: 10000, maxPrice: 100000 })
 *
 * @example
 * // 검색 필터링
 * applyFilters(products, { searchQuery: '이어폰' })
 *
 * @example
 * // Boolean 필터링
 * applyFilters(products, { inStock: true }) // stock > 0인 것만
 */
export function applyFilters<T>(items: T[], filters: Record<string, unknown>): T[] {
  return items.filter((item) => {
    const itemRecord = item as Record<string, unknown>;

    return Object.entries(filters).every(([key, value]) => {
      // 값이 없으면 필터링 안 함
      if (value === undefined || value === null) {
        return true;
      }

      // minXXX 처리 (예: minPrice, minRating)
      if (key.startsWith('min')) {
        const field = key.slice(3); // 'minPrice' -> 'Price'
        const fieldName = field.charAt(0).toLowerCase() + field.slice(1); // 'Price' -> 'price'
        const fieldValue = itemRecord[fieldName];
        if (fieldValue === undefined || fieldValue === null) return false;
        return typeof fieldValue === 'number' && typeof value === 'number' && fieldValue >= value;
      }

      // maxXXX 처리 (예: maxPrice, maxRating)
      if (key.startsWith('max')) {
        const field = key.slice(3); // 'maxPrice' -> 'Price'
        const fieldName = field.charAt(0).toLowerCase() + field.slice(1); // 'Price' -> 'price'
        const fieldValue = itemRecord[fieldName];
        if (fieldValue === undefined || fieldValue === null) return false;
        return typeof fieldValue === 'number' && typeof value === 'number' && fieldValue <= value;
      }

      // inStock 처리 (특수 케이스)
      if (key === 'inStock' && typeof value === 'boolean') {
        if (value === true) {
          const stock = itemRecord.stock;
          return typeof stock === 'number' && stock > 0;
        }
        return true; // inStock: false는 모든 제품 반환
      }

      // searchQuery 처리 (문자열 검색)
      if (key === 'searchQuery' || key === 'search') {
        const searchValue = String(value).toLowerCase();
        const searchableFields = ['name', 'title', 'description', 'content', 'category'];

        return searchableFields.some((field) => {
          const fieldValue = itemRecord[field];
          if (fieldValue === undefined || fieldValue === null) {
            return false;
          }
          return String(fieldValue).toLowerCase().includes(searchValue);
        });
      }

      // 정확히 일치하는 필터 (기본)
      return itemRecord[key] === value;
    });
  });
}
