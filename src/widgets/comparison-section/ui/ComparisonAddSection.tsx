import { Icons } from '@/shared/assets/icons';
import { cn } from '@/shared/lib';
import { hasKoreanLastConsonantLetter } from '@/shared/lib/format';
import { Icon } from '@/shared/ui/icon';
import ComparisonCard from '@/widgets/comparison-card/ui/ComparisonCard';
import type { ComparisonAddSectionProps } from '@/widgets/comparison-section/model/types';

const ComparisonAddSection = ({
  category,
  addedSubs,
  selectedSubs,
  handleSelect,
  handleDetail,
  handleAdd,
  handleDelete,
}: ComparisonAddSectionProps) => {
  const disabledAddButton = addedSubs.length > 3;
  const showDeleteButton = addedSubs.some(service => selectedSubs.includes(service.id));

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
        {addedSubs.map(service => (
            <ComparisonCard
              key={service.id}
              serviceName={service.name}
              imageUrl={service.imageUrl}
              minPrice={service.minPrice}
              maxPrice={service.maxPrice}
              isSelected={selectedSubs.includes(service.id)}
              setIsSelected={() => handleSelect(service.id)}
              handleDetail={() => handleDetail(service.id)}
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

export default ComparisonAddSection;
