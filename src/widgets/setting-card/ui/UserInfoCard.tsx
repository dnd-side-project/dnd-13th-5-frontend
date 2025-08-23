import type { UserInfoCardProps } from '@/widgets/setting-card/model/types';
import SettingCard from '@/widgets/setting-card/ui/SettingCard';

const UserInfoCard = ({ userName }: UserInfoCardProps) => (
  <SettingCard radiusStyle="rounded-bl-none rounded-br-none" borderStyle="border-b-0">
    <div className="flex items-center gap-1">
      <span className="typo-title-m-bold">{userName}님</span>
      <span className="typo-label-s-medium text-gray-500 px-3 py-1 rounded-2xl bg-gray-100">
        카카오 로그인
      </span>
    </div>
  </SettingCard>
);

export default UserInfoCard;
