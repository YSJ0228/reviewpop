import { useMutation } from '@tanstack/react-query';

import { Reservation } from '@entities/reservation';
import { createReservation } from '../api/reserveApi';

// 예약 생성 hook
export const useReserve = (campaignId: string) => {
  return useMutation({
    mutationFn: (data: Reservation) => createReservation(campaignId, data),
  });
};
