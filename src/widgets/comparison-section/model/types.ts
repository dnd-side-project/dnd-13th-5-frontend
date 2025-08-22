import type { Product } from '@/entities/comparison/model/types';
import type { Subscription } from '@/entities/subscription/model/types';

export interface ComparisonMySubSectionProps {
  category: string | null;
  mySubs: Omit<Subscription, 'isFavorites'>[];
  selectedSubs: number[];
  handleSelect: (id: number) => void;
  handleDetail: (id: number) => void;
}

export interface ComparisonAddSectionProps {
  category: string | null;
  addedSubs: Product[];
  selectedSubs: number[];
  handleSelect: (id: number) => void;
  handleDetail: (id: number) => void;
  handleAdd: () => void;
  handleDelete: () => void;
}
