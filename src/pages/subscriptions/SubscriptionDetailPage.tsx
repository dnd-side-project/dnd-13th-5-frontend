import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import BackButton from '@/shared/ui/button/BackButton';
import StarButton from '@/shared/ui/button/StarButton';
import { MobileLayout } from '@/shared/ui/layout';

const SubscriptionRightSlot = () => {
  const [isStarred, setIsStarred] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStarClick = () => {
    setIsStarred((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(ROUTES.SUBSCRIPTION_EDIT(id));
  };

  return (
    <div className="flex items-center space-x-2">
      <StarButton onClick={handleStarClick} isStarred={isStarred} />
      <button onClick={handleEdit} className="typo-body-m-medium">
        편집
      </button>
    </div>
  );
};

export const SubscriptionDetailPage = () => (
    <MobileLayout
      showBottom={false}
      headerProps={{
        leftSlot: <BackButton />,
        rightSlot: <SubscriptionRightSlot />,
      }}
    >
      SubscriptionDetailPage
    </MobileLayout>
);
