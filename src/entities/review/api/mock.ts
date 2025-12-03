import { mockReviewRequest } from '@shared/api/mock/data/reviews';
import { http, HttpResponse } from 'msw';

export const reviewHandlers = [
  http.get('/api/reviews/:id/modification-request', () => {
    return HttpResponse.json({ data: mockReviewRequest, success: true });
  }),
];
