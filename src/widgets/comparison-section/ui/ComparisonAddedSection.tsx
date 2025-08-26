import ComparisonSelectCard from '@/features/comparison-select/ComparisonSelectCard';
import { Icons } from '@/shared/assets/icons';
import { cn } from '@/shared/lib';
import { hasKoreanLastConsonantLetter } from '@/shared/lib/format';
import { Icon } from '@/shared/ui/icon';
import type { ComparisonAddedSectionProps } from '@/widgets/comparison-section/model/types';

const ComparisonAddedSection = ({
  category,
  addedSubs,
  selectedSubs,
  handleSelect,
  handleAdd,
  handleDetail,
  handleDelete,
}: ComparisonAddedSectionProps) => {
  const disabledAddButton = addedSubs.length > 3;
  const showDeleteButton = addedSubs.some(p => selectedSubs.includes(p.productId));

  return (
    <section className="py-[10px] space-y-4 mb-[18px]">
      <header className="flex justify-between items-center">
        <h2 className="flex typo-body-m-bold gap-1">
          비교하고 싶은
          <span className="text-primary-700">
            {category}
            {hasKoreanLastConsonantLetter(category) ? '을' : '를'} 추가해보세요!
          </span>
        </h2>

        {/* 추가한 서비스가 있을 때만 삭제하기 버튼 나타내기 */}
        {showDeleteButton && (
          <button className="typo-body-s-bold" onClick={handleDelete}>
            삭제하기
          </button>
        )}
      </header>

      <div className="grid grid-cols-2 gap-x-[14px] gap-y-4">
        {/* 서비스 추가 시, 보여지는 카드 */}
        {addedSubs.map(p => (
          <ComparisonSelectCard
            key={p.productId}
            product={p}
            isSelected={selectedSubs.includes(p.productId)}
            setIsSelected={() => handleSelect(p.productId)}
            handleDetail={handleDetail}
          />
        ))}

        {/* OTT 추가 버튼 */}
        <button
          className={cn(
            `px-5 py-4 border-[1.5px] rounded-lg w-full flex flex-col justify-center border-dashed h-[125px] gap-[2px] text-gray-500`,
            `bg-gray-50 border-gray-200 hover:text-primary-700 hover:border-primary-700`,
            `disabled:bg-gray-100 disabled:border-gray-300 disabled:pointer-events-none`,
            `transition-colors duration-200 ease-in-out`,
          )}
          onClick={handleAdd}
          disabled={disabledAddButton}
          aria-label={`${category} 추가하기`}
        >
          <Icon component={Icons.Plus} size="xl" />
          <span className={cn('typo-body-m-bold')}>{category} 추가</span>
        </button>
      </div>
    </section>
  );
};

export default ComparisonAddedSection;
