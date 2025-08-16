import { Icons } from '@/shared/assets/icons';
import { Icon } from '@/shared/ui/icon';

interface LoginButtonProps {
  onClick: () => void;
}

const LoginButton = ({ onClick }: LoginButtonProps) => (
    <button
      onClick={onClick}
      className="flex items-center p-4 h-14 bg-[#FAE100] rounded-xl w-full"
    >
      <Icon component={Icons.KaKao} variant="fill" />
      <span className="flex-grow typo-body-m-bold text-gray-800">
        카카오로 3초만에 시작하기
      </span>
    </button>
);

export default LoginButton;
