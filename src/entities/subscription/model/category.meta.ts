import { CategoryImages } from '@/shared/assets/images/index';

// 서버 문자열 → 고정 id/라벨/아이콘 매핑
export const CATEGORY_META: Record<string, { id: number; label: string; iconUrl: string }> = {
  OTT: { id: 1, label: 'OTT', iconUrl: CategoryImages.OTT },
  쇼핑: { id: 2, label: '쇼핑', iconUrl: CategoryImages.Shopping },
  음악: { id: 3, label: '음악', iconUrl: CategoryImages.Music },
  클라우드: { id: 4, label: '클라우드', iconUrl: CategoryImages.Cloud },
  AI: { id: 5, label: 'AI', iconUrl: CategoryImages.AI },
  생산성: { id: 6, label: '생산성', iconUrl: CategoryImages.Productivity },
  교육: { id: 7, label: '교육', iconUrl: CategoryImages.Education },
  배달: { id: 8, label: '배달', iconUrl: CategoryImages.Delivery },
};

export const CATEGORY_FALLBACK = (name: string, idx: number) => ({
  id: 9000 + idx,
  label: name,
  iconUrl: CategoryImages.Default, // 공용 기본 아이콘
});
