export interface EditRequestBottomSheetProps {
  opened: boolean;
  onClose: () => void;
  reviewId: string;
  campaignId: string;
  applicationId?: string;
}
