import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';

export const SubscriptionsPage = () => (
  <MobileLayout
    headerProps={{
      centerSlot: '내 구독',
      rightSlot: <AlarmButton />,
    }}
  >
    SubscriptionsPage
  </MobileLayout>
);
