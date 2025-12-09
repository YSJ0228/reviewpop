# CampaignRejectedCardFooter 컴포넌트

## 개요

`CampaignRejectedCardFooter`는 미선정된 체험 카드의 하단 컴포넌트입니다. 모집 일정과 최대 선정 인원 정보를 표시하여 사용자에게 체험 모집 정보를 제공합니다.

## 주요 기능

- 모집 일정 표시 (시작일 ~ 종료일)
- 최대 선정 인원 정보 표시
- `recruitmentSchedule`이 없는 경우 렌더링하지 않음

## 사용 방법

```typescript
import { CampaignRejectedCardFooter } from '@features/history/components/CampaignCard/CampaignRejectedCard/CampaignRejectedCardFooter';

<CampaignRejectedCardFooter
  recruitmentSchedule={['2024-01-01', '2024-01-31']}
  maxRecruitment={10}
/>
```

## Props

| Prop                  | Type               | Required | 설명                       |
| --------------------- | ------------------ | -------- | -------------------------- |
| `recruitmentSchedule` | `[string, string]` | ❌       | 모집 일정 (시작일, 종료일) |
| `maxRecruitment`      | `number`           | ❌       | 최대 선정 인원             |

## 특징

- `recruitmentSchedule`이 제공되지 않으면 `null`을 반환하여 렌더링하지 않음
- 날짜는 `MMDD_SHORT` 형식으로 표시됨
- `maxRecruitment`가 제공되지 않으면 기본값(`CONSTANTS.DEFAULT_COUNT.MAX_RECRUITMENT`) 사용
- 접근성을 위한 `aria-label` 제공

## 관련 컴포넌트

- [CampaignRejectedCard](../README.md) - 미선정 체험 카드 컴포넌트
