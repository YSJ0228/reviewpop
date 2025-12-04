import { http, HttpResponse } from 'msw';
import { INITIAL_REVIEWS } from './data';
import { BlogReviews } from '../../types/review.types';
import { createEditRequest } from './EditData';

// 메모리상에서 리뷰 데이터 관리
const reviews = [...INITIAL_REVIEWS];

export const reviewHandlers = [
  // 리뷰 목록 조회 (Pagination)
  http.get('/api/reviews', ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '1');
    const size = Number(url.searchParams.get('size') || '10');
    const campaignId = url.searchParams.get('campaignId');

    let filteredReviews = [...reviews];

    if (campaignId) {
      filteredReviews = filteredReviews.filter((r) => r.campaignId === campaignId);
    }

    // 최신순 정렬
    filteredReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalCount = filteredReviews.length;
    const totalPages = Math.ceil(totalCount / size);
    const start = (page - 1) * size;
    const end = start + size;
    const content = filteredReviews.slice(start, end);

    return HttpResponse.json<BlogReviews>({
      reviews: content,
      pageSize: size,
      hasNext: page < totalPages,
    });
  }),

  // 리뷰 수정 요청
  http.get('/api/reviews/:id/edit-request', () => {
    return HttpResponse.json({ data: createEditRequest(), success: true });
  }),
];
