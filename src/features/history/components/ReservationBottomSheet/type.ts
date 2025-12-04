export interface ReservationBottomSheetProps {
  appliedAt?: [string, string];
  isOpen: boolean;
  onClose: () => void;
  onDateChange: () => void;
  onCancel: () => Promise<void>;
}
