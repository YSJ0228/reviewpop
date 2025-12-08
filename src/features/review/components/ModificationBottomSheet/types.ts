export interface ModificationBottomSheetProps {
  opened: boolean;
  onClose: () => void;
  reviewId: string;
  campaignId: string;
  applicationId?: string;
}
