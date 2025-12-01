import { useMutation } from '@tanstack/react-query';

interface ApplyCampaignPayload {
  campaignId: string;
  userId: string;
  name: string;
  phoneNumber: string;
  blogAddress: string;
  message?: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ApplyResponseData {
  applicationId: string; // 예시, 실제 응답에 맞게 수정하세요
  // ... 기타 응답 데이터 필드
}

async function applyCampaign(payload: ApplyCampaignPayload): Promise<ApplyResponseData> {
  const { campaignId, ...body } = payload;

  const response = await fetch(`/api/campaigns/${campaignId}/apply`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const json: ApiResponse<ApplyResponseData> = await response.json();

  if (!response.ok || !json.success) {
    throw new Error(json.error || '체험 신청에 실패했습니다.');
  }

  return json.data!;
}

export function usePostApplication() {
  return useMutation({ mutationFn: applyCampaign });
}
