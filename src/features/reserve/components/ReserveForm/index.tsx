import { useState } from 'react';
import { useReservationConfig } from '@features/reserve/hooks/useReserve';
import { mockReservationConfig } from '@features/reserve/store/mockReservationData';
import { CalendarDatePicker } from './CalendarDatePicker';
import { TimeGrid } from './TimeGrid';

export function ReserveForm({ campaignId }: { campaignId: string }) {
  const { data: reservationConfig, isLoading, error } = useReservationConfig(campaignId);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const dateChangeHandler = (date) => {
    setDate(date);
  };
  const setTimeHandler = (time) => {
    setTime(time);
  };

  const config = reservationConfig ?? mockReservationConfig;

  return (
    <>
      <CalendarDatePicker
        excludedDates={config.disabled}
        excludedDays={undefined}
        onChange={dateChangeHandler}
      />
      <TimeGrid
        campaignId={campaignId}
        // value={time}
        date={date}
        onChange={setTimeHandler}
        intervalMinutes={config.intervalMinutes}
      />
    </>
  );
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">체험 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error) {
    // toast 띄우고 원래 페이지로 이동 useRouter
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">예약 페이지를 불러올 수 없습니다.</p>
      </div>
    );
  }
}
