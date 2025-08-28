import { CategoryImages } from '@/shared/assets/images/index';

// 카테고리 이름을 기반으로 한 메타데이터 (API 친화적)
export const CATEGORY_META: Record<string, { label: string; iconUrl: string }> = {
  OTT: { label: 'OTT', iconUrl: CategoryImages.OTT },
  SHOPPING: { label: '쇼핑', iconUrl: CategoryImages.Shopping },
  MUSIC: { label: '음악', iconUrl: CategoryImages.Music },
  CLOUD: { label: '클라우드', iconUrl: CategoryImages.Cloud },
  AI: { label: 'AI', iconUrl: CategoryImages.AI },
  // PRODUCTIVITY: { label: '생산성', iconUrl: CategoryImages.Productivity },
  // EDUCATION: { label: '교육', iconUrl: CategoryImages.Education },
  DELIVERY: { label: '배달', iconUrl: CategoryImages.Delivery },
};

// 카테고리 목록 (순서 보장)
export const CATEGORY_LIST = Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>;

export const CATEGORY_FALLBACK = (name: string) => ({
  label: name,
  iconUrl: CategoryImages.Default, // 공용 기본 아이콘
});
