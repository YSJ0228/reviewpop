import { http, HttpResponse } from 'msw';
import { mockUsers } from '@shared/api/mock/data/users';

export const UserHandlers = [
  // 유저 상세 조회
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params;
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      return HttpResponse.json(
        {
          success: false,
          message: '유저를 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      data: user,
      success: true,
    });
  }),
];
