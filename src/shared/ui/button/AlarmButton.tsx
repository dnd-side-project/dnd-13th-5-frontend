import { useNavigate } from 'react-router-dom';
import { Icons } from '@/shared/assets/icons';
import IconButton from '@/shared/ui/button/IconButton';
import { ROUTES } from '@/shared/config/routes';

interface AlarmButtonProps {
  tone?: 'default' | 'white';
}

const AlarmButton = ({ tone = 'default' }: AlarmButtonProps) => {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={
        tone === 'white'
          ? {
            component: Icons.Alarm,
            variant: 'fill',
            colorClass: 'text-white',
          }
          : { component: Icons.Alarm }
      }
      ariaLabel="알림"
      onClick={() => navigate(ROUTES.ALARM)}
    />
  );
};

export default AlarmButton;
