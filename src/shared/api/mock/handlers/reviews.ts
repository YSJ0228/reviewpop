/**
 * 리뷰 관련 MSW 핸들러
 *
 * 리뷰 API 엔드포인트를 Mock으로 구현합니다.
 */

import { http, HttpResponse } from 'msw';

import type { ApiResponse } from '@shared/api/types/common.types';
import { toISO } from '@shared/lib/date';

import { mockReviews } from '../data/reviews';
import { mockUsers } from '../data/users';
import { applyFilters } from '../utils/filter';
import { paginate } from '../utils/paginate';
import type { CreateReviewRequest, Review } from '@entities/review';

// ReviewFilterParams는 로컬에서 정의하거나 any로 처리 (mock 유틸리티가 유연함)
interface ReviewFilterParams {
  campaignId?: string;
  userId?: string;
  rating?: number;
  minRating?: number;
  searchQuery?: string;
  [key: string]: unknown;
}

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
      userId: url.searchParams.get('userId') ?? undefined,
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

    const newReview: Review = {
      id: mockReviews.length + 1,
      campaignId: body.campaignId,
      userId: body.userId,
      rating: body.rating,
      title: body.title,
      content: body.content,
      images: body.images || [],
      user: {
        id: mockUsers[0].id,
        name: mockUsers[0].name,
        email: mockUsers[0].email,
        profileImage: mockUsers[0].profileImage || '',
      },
      createdAt: toISO(),
      updatedAt: toISO(),
    };

    // Mock DB에 추가 (메모리 상)
    mockReviews.unshift(newReview);

    return HttpResponse.json({
      success: true,
      data: newReview,
    } satisfies ApiResponse<typeof newReview>);
  }),
];
