import { useAuthBootstrap } from '@/app/hooks/useAuthBootstrap';
import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';

export const SubscriptionsPage = () => {
  useAuthBootstrap();
  return (
    <MobileLayout
      headerProps={{
        centerSlot: '내 구독',
        rightSlot: <AlarmButton />,
      }}
    >
      SubscriptionsPage
    </MobileLayout>
  );
};
