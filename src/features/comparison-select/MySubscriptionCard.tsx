import type { SubscriptionService } from '@/entities/subscription/api/fetchMySubscription';
import { cn } from '@/shared/lib';
import { formatKRW } from '@/shared/lib/format';

type Props = {
  subscription: SubscriptionService;
  // isSelected: boolean;
  // setIsSelected: () => void;
  // handleDetail: (id: number) => void;
};

const MySubscriptionCard = ({ subscription }: Props) => {
  const { id, name, imageUrl, planName, price } = subscription;

  // const handleCardClick = () => {
  //   setIsSelected();
  // };

  // const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     e.preventDefault();
  //     setIsSelected();
  //   }
  // };

  const priceInfo = planName ? `${planName} ${formatKRW(price)}` : `${formatKRW(price)}`;

  return (
    <div
      className={cn(
        `px-5 py-4 border rounded-lg w-full h-[125px] flex flex-col items-center justify-center relative transition-colors duration-200 ease-in-out`,
      )}
      // onClick={handleCardClick}
      // tabIndex={0}
      // role="button"
      // aria-pressed={isSelected}
      // onKeyDown={handleKeyDown}
    >
      <img src={imageUrl} alt={name} className="h-10 w-10 bg-gray-200 rounded-lg mb-1" />
      <div className="flex items-center">
        <span className="typo-body-s-bold text-center whitespace-nowrap">{name}</span>
        {/* <IconButton
          icon={{ component: Icons.Right }}
          ariaLabel="자세히보기"
          className="hover:bg-gray-200 rounded-md transition-colors duration-300 ease-in-out"
          onClick={e => {
            e.stopPropagation();
            handleDetail(id);
          }}
        /> */}
      </div>
      <span className="typo-label-s-medium text-gray-500 text-center whitespace-nowra">
        {priceInfo}
      </span>
    </div>
  );
};

export default MySubscriptionCard;
