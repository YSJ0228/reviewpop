import { useState, useMemo } from 'react';
import { DateValue } from '@mantine/dates';
import { Button } from '@shared/components';
import { useReservationConfig } from '@entities/reservation';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { formatDate } from '@shared/lib/date';
import { combineDateAndTime } from './utils';
import { CalendarDatePicker } from './CalendarDatePicker';
import { TimeGrid } from './TimeGrid';
import { Counter } from './Counter';
import { ReservationErrorGuard } from './ReservationErrorGuard';
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';

interface FormState {
  date: DateValue | null;
  time: string | null;
  personCount: number;
}

export function ReserveForm({ campaignId }: { campaignId: string }) {
  const setReservationFormData = useReservationStore((state) => state.setReservationFormData);
  const resetReservationData = useReservationStore((state) => state.resetReservationData);
  const router = useRouter();

  const { data: reservationConfig, isLoading, error } = useReservationConfig(campaignId);

  const [formState, setFormState] = useState<FormState>({
    date: null,
    time: null,
    personCount: 1,
  });

  const handleDateChange = (newDate: DateValue | null) => {
    setFormState((prev) => ({
      ...prev,
      date: newDate,
      time: null, // Reset time when date changes
    }));
  };

  const handleTimeChange = (newTime: string | null) => {
    setFormState((prev) => ({ ...prev, time: newTime }));
  };

  const handlePersonCountChange = (newCount: number) => {
    setFormState((prev) => ({ ...prev, personCount: newCount }));
  };

  const handleNextClick = () => {
    const dateTimeStr = combineDateAndTime(formState.date, formState.time);
    if (!dateTimeStr) return;

    setReservationFormData({
      campaignId,
      date: dateTimeStr,
      personCount: formState.personCount,
    });
    router.push(`/campaign/${campaignId}/reserve/confirm`);
  };

  // startDate가 오늘보다 이전이면 오늘 날짜로 설정
  const effectiveStartDate = useMemo(() => {
    if (!reservationConfig) return '';
    const today = formatDate(new Date(), 'DATE_ONLY');
    return reservationConfig.startDate < today ? today : reservationConfig.startDate;
  }, [reservationConfig]);

  if (isLoading) {
    return (
      <div className={styles.ReserveForm__Loading}>
        <p>예약 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (error || !reservationConfig) {
    return (
      <ReservationErrorGuard
        message="예약 설정을 불러올 수 없습니다."
        onReset={resetReservationData}
      />
    );
  }

  const isNextButtonDisabled = !formState.date || !formState.time;

  return (
    <div className={styles.ReserveForm}>
      <Counter
        title="인원"
        maxCount={reservationConfig.maxCount}
        subtitle={reservationConfig.notice}
        onChange={handlePersonCountChange}
      />
      <CalendarDatePicker
        excludedDates={reservationConfig.disabled}
        excludedDays={undefined}
        onChange={handleDateChange}
        minDate={effectiveStartDate}
        maxDate={reservationConfig.endDate}
      />
      <TimeGrid
        campaignId={campaignId}
        value={formState.time}
        date={formState.date}
        onChange={handleTimeChange}
        intervalMinutes={reservationConfig.intervalMinutes}
      />
      <Button fullWidth onClick={handleNextClick} disabled={isNextButtonDisabled}>
        다음
      </Button>
    </div>
  );
}
