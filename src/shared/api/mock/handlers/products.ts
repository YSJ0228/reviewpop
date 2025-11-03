/**
 * 제품 관련 MSW 핸들러
 *
 * 제품 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ProductFilterParams } from '@entities/product/types/product.types';
import type { ApiResponse } from '@shared/api/types/common.types';

import { mockProducts } from '../data/products';
import { applyFilters } from '../utils/filter';
import { paginate } from '../utils/paginate';

const ITEMS_PER_PAGE = 12; // 백엔드 고정값 (제품은 12개씩)

export const productHandlers = [
  /**
   * 제품 목록 조회 (페이지네이션 + 필터링)
   * GET /api/products?page=1&category=전자기기&minPrice=10000&maxPrice=100000&inStock=true&searchQuery=이어폰
   */
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url);

    // 페이지네이션 파라미터
    const page = Number(url.searchParams.get('page')) || 1;

    // 필터 파라미터 파싱
    const filters: ProductFilterParams = {
      category: url.searchParams.get('category') || undefined,
      minPrice: url.searchParams.get('minPrice')
        ? Number(url.searchParams.get('minPrice'))
        : undefined,
      maxPrice: url.searchParams.get('maxPrice')
        ? Number(url.searchParams.get('maxPrice'))
        : undefined,
      inStock: url.searchParams.get('inStock')
        ? url.searchParams.get('inStock') === 'true'
        : undefined,
      searchQuery: url.searchParams.get('searchQuery') || undefined,
    };

    // 1. 필터링 적용
    const filteredProducts = applyFilters(mockProducts, filters);

    // 2. 페이지네이션 적용
    const result = paginate(filteredProducts, page, ITEMS_PER_PAGE);

    return HttpResponse.json(result);
  }),

  /**
   * 제품 상세 조회
   * GET /api/products/:id
   */
  http.get('/api/products/:id', ({ params }) => {
    const product = mockProducts.find((p) => p.id === Number(params.id));

    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          error: '제품을 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: product,
    } satisfies ApiResponse<typeof product>);
  }),
];
