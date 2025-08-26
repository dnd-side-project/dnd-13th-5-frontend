import { formatKRW } from '@/shared/lib/format';
import { ContentsCard } from '@/shared/ui/contents-card';

type Props = {
  serviceName: string;
  imageUrl: string;
  minPrice: number;
  maxPrice: number | null;
  isSelected: boolean;
  setIsSelected: () => void;
};

const ComparisonAddCard = ({
  serviceName,
  imageUrl,
  minPrice,
  maxPrice,
  isSelected,
  setIsSelected,
}: Props) => {
  const priceInfo =
    maxPrice === null ? (
      `월 ${formatKRW(minPrice)}`
    ) : (
      <>
        월 {formatKRW(minPrice)} <br /> ~ {formatKRW(maxPrice)}
      </>
    );

  return (
    <ContentsCard
      left={
        <div className="flex items-center gap-[22px]">
          <img src={imageUrl} alt={serviceName} className="h-12 w-12 rounded-lg" />
          <span className="typo-title-m-bold flex-grow">{serviceName}</span>
        </div>
      }
      right={<span className="typo-body-m-medium text-right">{priceInfo}</span>}
      className={`bg-white border ${isSelected ? 'border-primary-700' : 'border-white'}`}
      interactive={true}
      onClick={setIsSelected}
      ariaLabel="추가할 비교 서비스 카드"
    />
  );
};

export default ComparisonAddCard;
