import AlarmButton from '@/shared/ui/button/AlarmButton';
import { MobileLayout } from '@/shared/ui/layout';
import { ServiceIdentity } from '@/shared/ui/service-identity';

export const HomePage = () => (
  <MobileLayout
    headerProps={{
      leftSlot: 'Logo',
      rightSlot: <AlarmButton />,
      colorVariant: 'white',
    }}
    bodyVariant="gray"
  >
    <ServiceIdentity
      serviceName="쿠팡 와우"
      category="쇼핑"
      imageUrl="https://blog.kakaocdn.net/dna/kEtR9/btrgfMGHvbz/AAAAAAAAAAAAAAAAAAAAAFnlHYpDkUsQtU0PpJmF9um5YJwR0ZuhoUk71wNnibV3/img.png?credential=yqXZFxpELC7KVnFOS48ylbz2pIh7yKj8&expires=1756652399&allow_ip=&allow_referer=&signature=KwdcSm%2B2yKL%2BAnqJlLsE9GU56Ts%3D"
      size="xl"
      tagClassName="py-1"
    />
  </MobileLayout>
);
