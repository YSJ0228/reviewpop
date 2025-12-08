export interface BlogBottomSheetProps {
  opened: boolean;
  onClose: () => void;
  blog?: string;
  setBlog: (v: string) => void;
  setIsConnected: (v: boolean) => void;
}
