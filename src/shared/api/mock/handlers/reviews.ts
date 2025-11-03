/**
 * 리뷰 관련 MSW 핸들러
 *
 * 리뷰 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { CreateReviewRequest, ReviewFilterParams } from '@entities/review/types/review.types';
import type { ApiResponse } from '@shared/api/types/common.types';

import { mockReviews } from '../data/reviews';
import { mockUsers } from '../data/users';
import { applyFilters } from '../utils/filter';
import { paginate } from '../utils/paginate';

const ITEMS_PER_PAGE = 10; // 백엔드 고정값

export const reviewHandlers = [
  /**
   * 리뷰 목록 조회 (페이지네이션 + 필터링)
   * GET /api/reviews?page=1&campaignId=13&rating=5&minRating=4&searchQuery=좋은
   */
  http.get('/api/reviews', ({ request }) => {
    const url = new URL(request.url);

    // 페이지네이션 파라미터
    const page = Number(url.searchParams.get('page')) || 1;

    // 필터 파라미터 파싱
    const filters: ReviewFilterParams = {
      campaignId: url.searchParams.get('campaignId') || undefined,
      userId: url.searchParams.get('userId') ? Number(url.searchParams.get('userId')) : undefined,
      rating: url.searchParams.get('rating') ? Number(url.searchParams.get('rating')) : undefined,
      minRating: url.searchParams.get('minRating')
        ? Number(url.searchParams.get('minRating'))
        : undefined,
      searchQuery: url.searchParams.get('searchQuery') || undefined,
    };

    // 1. 필터링 적용
    const filteredReviews = applyFilters(mockReviews, filters);

    // 2. 페이지네이션 적용
    const result = paginate(filteredReviews, page, ITEMS_PER_PAGE);

    return HttpResponse.json(result);
  }),

  /**
   * 리뷰 상세 조회
   * GET /api/reviews/:id
   */
  http.get('/api/reviews/:id', ({ params }) => {
    const review = mockReviews.find((r) => r.id === Number(params.id));

    if (!review) {
      return HttpResponse.json(
        {
          success: false,
          error: '리뷰를 찾을 수 없습니다.',
        } satisfies ApiResponse<never>,
        { status: 404 },
      );
    }

    return HttpResponse.json({
      success: true,
      data: review,
    } satisfies ApiResponse<typeof review>);
  }),

  /**
   * 리뷰 작성
   * POST /api/reviews
   */
  http.post('/api/reviews', async ({ request }) => {
    const body = (await request.json()) as CreateReviewRequest;

    const newReview = {
      id: mockReviews.length + 1,
      ...body,
      userId: 1,
      user: {
        id: mockUsers[0].id,
        name: mockUsers[0].name,
        email: mockUsers[0].email,
        profileImage: mockUsers[0].profileImage,
      },
      images: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockReviews.push(newReview);

    return HttpResponse.json({
      success: true,
      data: newReview,
    } satisfies ApiResponse<typeof newReview>);
  }),
];
