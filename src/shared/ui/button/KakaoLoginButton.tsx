import { Icons } from '@/shared/assets/icons';
import { Icon } from '@/shared/ui/icon';

type Props = {
  onClick?: () => void;
};

const KakaoLoginButton = ({ onClick }: Props) => (
  <button onClick={onClick} className="flex items-center p-4 h-14 bg-kakao rounded-xl w-full">
    <Icon component={Icons.KaKao} variant="fill" />
    <span className="flex-grow typo-body-m-bold text-gray-800">카카오로 3초만에 시작하기</span>
  </button>
);

export default KakaoLoginButton;
