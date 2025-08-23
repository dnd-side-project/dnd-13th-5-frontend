import { useNavigate } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import IconButton from '@/shared/ui/button/IconButton';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton
      icon={{ component: Icons.Left }}
      ariaLabel="뒤로가기"
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;
