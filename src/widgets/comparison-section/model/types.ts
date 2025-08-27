import type { Products } from '@/entities/product/api/fetchProducts';
import type { SubscriptionService } from '@/entities/subscription/api/fetchMySubscription';

export type ComparisonMySubSectionProps = {
  category: string | null;
  mySubs: SubscriptionService[];
  selectedSubs: number[];
  handleSelect: (id: number) => void;
  handleDetail: (id: number) => void;
  addedSubs?: Products[];
};

export type ComparisonAddedSectionProps = {
  category: string | null;
  addedSubs: Products[];
  selectedSubs: number[];
  handleSelect: (id: number) => void;
  handleDetail: (id: number) => void;
  handleAdd: () => void;
  handleDelete: () => void;
};

export type ComparisonResultSectionProps = {
  selectedSubs: number[];
  handleDetail: (id: number) => void;
};

export type RecommentSubSectionProps = {
  category: string | null;
  handleDetail: (id: number) => void;
};
