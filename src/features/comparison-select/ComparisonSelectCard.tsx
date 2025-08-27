import React from 'react';

import type { Products } from '@/entities/product/api/fetchProducts';
import { Icons } from '@/shared/assets/icons';
import { formatKRW } from '@/shared/lib/format';
import { IconButton } from '@/shared/ui/button';
import { Icon } from '@/shared/ui/icon';

type Props = {
  product: Products;
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
}: Props) => {
  const { productId: id, name: serviceName, imageUrl, minPrice, maxPrice } = product;

  const handleCardClick = () => {
    setIsSelected();
  };

  const handleCheckboxClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsSelected();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === '') {
      e.preventDefault();
      setIsSelected();
    }
  };

  const notMySubPriceInfo =
    maxPrice === null
      ? `월 ${formatKRW(minPrice ?? 0)}`
      : `월 ${formatKRW(minPrice ?? 0)} ~ ${formatKRW(maxPrice ?? 0)}`;

  // const mySubPriceInfo = myPrice && `${planName} ${formatKRW(myPrice)}`;
  const mySubPriceInfo = `요금제 ${formatKRW(15500)}`;

  return (
    <div
      className={`px-5 py-4 border rounded-lg w-full h-[125px] flex flex-col items-center justify-center relative transition-colors duration-200 ease-in-out cursor-pointer ${isSelected ? 'border-primary-700' : 'border-gray-100'}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      onKeyDown={handleKeyDown}
    >
      {!isMySub && (
        <div
          className="absolute top-[10px] left-[12px] h-6 w-6 cursor-pointer z-10" // 클릭 가능한 영역 추가
          onClick={handleCheckboxClick}
        >
          <input
            type="checkbox"
            className="absolute appearance-none top-0 left-0 rounded-md h-6 w-6 border border-gray-300 p-2 cursor-pointer bg-gray-300 checked:bg-primary-700 checked:border-primary-700 transition-colors"
            checked={isSelected} // isSelected prop과 연결
            readOnly // input 자체의 변경은 막고 클릭으로만 제어
          />
          <div className="absolute top-0 left-0 pointer-events-none">
            <Icon component={Icons.Check} className="text-white" />
          </div>
        </div>
      )}

      <img src={imageUrl} alt={serviceName} className="h-10 w-10 bg-gray-200 rounded-lg mb-1" />

      <div className="flex items-center">
        <span className="typo-body-s-bold">{serviceName}</span>

        <IconButton
          icon={{ component: Icons.Right }}
          ariaLabel="자세히보기"
          className="hover:bg-gray-200 rounded-md transition-colors duration-300 ease-in-out"
          onClick={e => {
            e.stopPropagation();
            handleDetail(id);
          }}
        />
      </div>

      <span className="typo-label-s-medium text-gray-500">
        {isMySub ? mySubPriceInfo : notMySubPriceInfo}
      </span>
    </div>
  );
};

export default ComparisonSelectCard;
