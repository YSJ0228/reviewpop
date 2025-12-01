import { FormDataType } from '@shared/components/Form/types';

export interface CautionBottomSheetProps {
  opened: boolean;
  onClose: () => void;
  formData: FormDataType;
}
