import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';

export const SubscriptionEditPage = () => (
    <MobileLayout
      showBottom={false}
      headerProps={{
        leftSlot: <BackButton />,
        centerSlot: '정보 수정하기',
      }}
    >
      SubscriptionEditPage
    </MobileLayout>
);
