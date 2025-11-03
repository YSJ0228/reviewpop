/**
 * Product 관련 타입 정의
 */

/**
 * 제품 정보
 */
export interface Product {
  /** 제품 ID */
  id: number;
  /** 제품명 */
  name: string;
  /** 카테고리 */
  category: string;
  /** 가격 */
  price: number;
  /** 제품 이미지 URL */
  image: string;
  /** 제품 설명 */
  description: string;
  /** 재고 수량 */
  stock: number;
  /** 생성일 (선택) */
  createdAt?: string;
}

/**
 * 제품 필터 쿼리 파라미터
 *
 * @example
 * GET /api/products?category=전자기기&minPrice=10000&maxPrice=100000
 */
export interface ProductFilterParams extends Record<string, unknown> {
  /** 카테고리 필터 */
  category?: string;
  /** 최소 가격 */
  minPrice?: number;
  /** 최대 가격 */
  maxPrice?: number;
  /** 재고 있는 제품만 (true일 경우 stock > 0) */
  inStock?: boolean;
  /** 검색어 (제품명, 설명에서 검색) */
  searchQuery?: string;
}
