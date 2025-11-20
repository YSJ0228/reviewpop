// import { useQuery } from '@tanstack/react-query';
// import type { MyCampaignDetail } from '@entities/history/types/myCampaign.types';

// interface CampaignDetailResponse {
//   data: MyCampaignDetail;
//   success: boolean;
// }

// /**
//  * 체험 상세 정보를 가져오는 React Query 훅
//  */
// export function useMyCampaignDetails(id: string) {
//   return useQuery({
//     queryKey: ['campaigns', id],
//     queryFn: async (): Promise<MyCampaignDetail> => {
//       const response = await fetch(`/api/my-campaigns/${id}`);
//       if (!response.ok) {
//         throw new Error('체험 상세 정보를 불러오는데 실패했습니다.');
//       }
//       const json: CampaignDetailResponse = await response.json();
//       return json.data;
//     },
//     enabled: !!id, // id가 있을 때만 쿼리 실행
//   });
// }
