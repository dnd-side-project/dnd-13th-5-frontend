import BackButton from '@/shared/ui/button/BackButton';
import { MobileLayout } from '@/shared/ui/layout';

export const AlarmPage = () => (
  <MobileLayout
    headerProps={{
      leftSlot: <BackButton />,
      centerSlot: '알림',
    }}
    bodyVariant="gray"
  >
    AlarmPage
  </MobileLayout>
);
