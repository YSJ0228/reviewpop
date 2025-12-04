import { useState } from 'react';
import { DateValue } from '@mantine/dates';
import { Button } from '@shared/components';
import { useReservationConfig } from '@entities/reservation';
import { useReservationStore } from '@features/reserve/store/reservationStore';
import { combineDateAndTime, validateCampaignId } from './utils';
import { CalendarDatePicker } from './CalendarDatePicker';
import { TimeGrid } from './TimeGrid';
import { Counter } from './Counter';
import styles from './style.module.scss';
import { useRouter } from 'next/navigation';

interface FormState {
  date: DateValue | null;
  time: string | null;
  personCount: number;
}

export function ReserveForm({ campaignId }: { campaignId: string }) {
  const reservationData = useReservationStore((state) => state.reservationData);
  const setReservationFormData = useReservationStore((state) => state.setReservationFormData);
  const resetReservationData = useReservationStore((state) => state.resetReservationData);
  const router = useRouter();
  const isValidCampaignId = validateCampaignId(campaignId, reservationData?.campaignId);

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-gray-500">예약 정보를 불러오는 중...</p>
      </div>
    );
  }

  if (!isValidCampaignId || error || !reservationConfig) {
    // 스토어 초기화
    resetReservationData();

    return (
      <div className="flex justify-center items-center p-8">
        <p className="text-red-500">
          {!isValidCampaignId ? '잘못된 접근입니다.' : '예약 페이지를 불러올 수 없습니다.'}
        </p>
      </div>
    );
  }

  const isNextButtonDisabled = !formState.date || !formState.time || !formState.personCount;

  return (
    <div className={styles.ReserveForm}>
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
        onChange={handleDateChange}
        startDate={reservationConfig.startDate}
        endDate={reservationConfig.endDate}
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
