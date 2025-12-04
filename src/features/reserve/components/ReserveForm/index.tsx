import { useState } from 'react';
import dayjs from 'dayjs';
import { useReservationConfig } from '@features/reserve/hooks/useReserve';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { CalendarDatePicker } from './CalendarDatePicker';
import { TimeGrid } from './TimeGrid';
import { Counter } from './Counter';
import { DateValue } from '@mantine/dates';
import { Button } from '@shared/components';

export function ReserveForm({ campaignId }: { campaignId: string }) {
  const { data: reservationConfig, isLoading, error } = useReservationConfig(campaignId);
  const setReservationFormData = useReservationStore((state) => state.setReservationFormData);
  const [date, setDate] = useState<DateValue | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [personCount, setPersonCount] = useState<number>(1);

  const dateChangeHandler = (date: DateValue | null) => {
    setDate(date);
    setTime(null);
  };
  const setTimeHandler = (time: string | null) => {
    setTime(time);
  };
  const handlePersonCountChange = (count: number) => {
    setPersonCount(count);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">예약 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !reservationConfig) {
    // TODO: toast 띄우고 원래 페이지로 이동 useRouter
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">예약 페이지를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const handleNextClick = () => {
    // ISO 8601 String 형식으로 변환
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const dateTimeStr = `${dateStr}T${time}:00`;

    setReservationFormData({
      campaignId,
      date: dateTimeStr,
      personCount,
    });
    console.log({
      campaignId,
      date: dateTimeStr,
      personCount,
    });

    // TODO: 예약 확인 페이지로 이동
  };

  const isNextButtonDisabled = !date || !time || !personCount;

  return (
    <>
      <Counter
        title="인원"
        maxCount={reservationConfig.maxCount}
        subtitle={reservationConfig.notice}
        onChange={handlePersonCountChange}
        initialValue={1}
      />
      <CalendarDatePicker
        excludedDates={reservationConfig.disabled}
        excludedDays={undefined}
        onChange={dateChangeHandler}
        startDate={reservationConfig.startDate}
        endDate={reservationConfig.endDate}
      />
      <TimeGrid
        campaignId={campaignId}
        value={time}
        date={date}
        onChange={setTimeHandler}
        intervalMinutes={reservationConfig.intervalMinutes}
      />
      <Button fullWidth onClick={handleNextClick} disabled={isNextButtonDisabled}>
        다음
      </Button>
    </>
  );
}
