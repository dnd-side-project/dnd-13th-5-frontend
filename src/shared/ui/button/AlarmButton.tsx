import { useNavigate } from 'react-router-dom';
import { Icons } from '@/shared/assets/icons';
import IconButton from '@/shared/ui/button/IconButton';

const AlarmButton = ({ tone = 'default' as 'default' | 'white' }) => {
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
      onClick={() => navigate('/alarm')}
    />
  );
};

export default AlarmButton;
