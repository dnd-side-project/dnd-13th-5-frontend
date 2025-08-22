import { formatKRW } from '@/shared/lib/format';
import type { ComparisonCardProps } from '@/widgets/comparison-card/model/types';

const ComparisonAddCard = ({
  serviceName,
  imageUrl,
  minPrice,
  maxPrice,
  isSelected,
  setIsSelected,
}: ComparisonCardProps) => (
  <div
    className={`bg-white w-full h-20 rounded-xl px-5 py-4 flex border items-center justify-between ${isSelected ? 'border-primary-700' : 'border-white'}`}
    onClick={setIsSelected}
  >
    <div className="flex items-center gap-[22px]">
      <img src={imageUrl} alt={serviceName} className="h-12 w-12 rounded-lg bg-gray-200" />
      <span className="typo-title-m-bold flex-grow">{serviceName}</span>
    </div>

    <span className="typo-body-m-medium text-right">
      {maxPrice === null ? (
        `월 ${formatKRW(minPrice)}`
      ) : (
        <>
          월 {formatKRW(minPrice)} <br /> ~ {formatKRW(maxPrice)}
        </>
      )}
    </span>
  </div>
);

export default ComparisonAddCard;
