import { useNavigate } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import IconButton from '@/shared/ui/button/IconButton';

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
