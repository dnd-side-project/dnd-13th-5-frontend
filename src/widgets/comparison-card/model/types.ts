export interface ComparisonCardProps {
  serviceName: string;
  imageUrl: string;
  minPrice: number | null;
  maxPrice: number | null;
  isSelected: boolean;
  setIsSelected: () => void;
  handleDetail?: () => void;
  mySub?: boolean;
  myPrice?: number;
}
