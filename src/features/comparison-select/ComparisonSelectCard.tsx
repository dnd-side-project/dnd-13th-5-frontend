import type { Products } from '@/entities/product/api/fetchProducts';
import type { SubscriptionService } from '@/entities/subscription/api/fetchMySubscription';
import ComparisonCard from '@/features/comparison-select/ComparisonCard';
import MySubscriptionCard from '@/features/comparison-select/MySubscriptionCard';

// 메인 컴포넌트에서 분리된 컴포넌트를 조건부로 렌더링
type MainProps = {
  product: Products | SubscriptionService;
  isSelected: boolean;
  setIsSelected: () => void;
  handleDetail: (id: number) => void;
  isMySub?: boolean;
};

const ComparisonSelectCard = ({
  product,
  isSelected,
  setIsSelected,
  handleDetail,
  isMySub,
}: MainProps) => {
  if (isMySub) {
    // isMySub일 경우, product는 SubscriptionService[] 타입일 것으로 예상
    // 배열의 첫 번째 요소를 사용하도록 가정
    return (
      <MySubscriptionCard
        subscription={product as SubscriptionService}
        // isSelected={isSelected}
        // setIsSelected={setIsSelected}
        // handleDetail={handleDetail}
      />
    );
  }

  // isMySub이 아닐 경우, product는 Products 타입
  return (
    <ComparisonCard
      product={product as Products}
      isSelected={isSelected}
      setIsSelected={setIsSelected}
      handleDetail={handleDetail}
    />
  );
};

export default ComparisonSelectCard;
