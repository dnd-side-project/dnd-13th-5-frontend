import { useProductsRecommendations } from '@/entities/product/hooks/useProductsRecommendations';
import { formatKRW } from '@/shared/lib/format';
import type { CategoryParam } from '@/shared/types/category.types';
import { ContentsCard } from '@/shared/ui/contents-card';
import type { RecommentSubSectionProps } from '@/widgets/comparison-section/model/types';

const RecommendSubSection = ({ category, handleDetail }: RecommentSubSectionProps) => {
  const { data: products, isLoading } = useProductsRecommendations(category as CategoryParam);

  if (!category) return null; // 카테고리 미선택 시 비노출

  if (isLoading) {
    return (
      <section>
        <header className="flex items-center gap-5 mb-[18px] ">
          <h1 className="typo-title-l-bold">이런 서비스는 어때요?</h1>
        </header>
        <div className="bg-gray-50 rounded-[10px] px-[15px] py-[30px] space-y-4">
          <div className="h-[84px] bg-white rounded-[10px] animate-pulse" />
          <div className="h-[84px] bg-white rounded-[10px] animate-pulse" />
        </div>
      </section>
    );
  }

  return (
    <section>
      <header className="flex items-center gap-5 mb-[18px] ">
        <h1 className="typo-title-l-bold">이런 서비스는 어때요?</h1>
      </header>

      <div className="bg-gray-50 rounded-[10px] px-[15px] py-[30px] space-y-5">
        <h2 className="typo-body-m-bold">추천하는 서비스</h2>

        {/* 랜덤으로 카테고리에 해당하는 2개 서비스 보여주기 */}
        <div className="space-y-4">
          {products?.map(p => (
            <ContentsCard
              key={p.productId}
              left={
                <div className="flex items-center gap-5">
                  <img src={p.imageUrl} alt={p.name} className="h-9 w-9 rounded-lg" />

                  <div className="flex flex-col gap-1">
                    <span className="typo-body-m-bold">{p.name}</span>
                    <div className="space-x-1 text-gray-700">
                      {/* <span className="typo-body-m-bold">{p.plans[0].planName}</span> */}
                      <span className="typo-body-m-bold">요금제 이름</span>
                      <span className="typo-body-m-medium">월 {formatKRW(15500)}</span>
                    </div>
                  </div>
                </div>
              }
              className="bg-white rounded-[10px] h-[84px]"
              interactive={true}
              onClick={() => handleDetail(p.productId)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendSubSection;
