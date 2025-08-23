import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Icons } from '@/shared/assets/icons';
import { ROUTES } from '@/shared/config/routes';
import type { User } from '@/shared/types';
import { IconButton } from '@/shared/ui/button';
import ToggleButton from '@/shared/ui/button/ToggleButton';
import { ConfirmDialog } from '@/shared/ui/dialog';
import { MobileLayout } from '@/shared/ui/layout';
import SettingCard from '@/widgets/setting-card/ui/SettingCard';
import UserInfoCard from '@/widgets/setting-card/ui/UserInfoCard';

const USER: User = { id: '1', name: '김도훈', email: 'test@naver.com' };

export const MyPage = () => {
  const navigate = useNavigate();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);
  const [onOffAlarm, setOnOffAlarm] = useState(false);

  const handleEmailEdit = () => {
    navigate(ROUTES.EMAIL_EDIT);
  };

  const handleLogout = () => {
    setIsLogoutDialogOpen(false);
    navigate(ROUTES.HOME);
  };

  const handleWithdrawl = () => {
    setIsWithdrawalDialogOpen(false);
    navigate(ROUTES.HOME);
  };

  return (
    <MobileLayout
      headerProps={{
        leftSlot: 'Logo',
      }}
    >
      {/* 내 정보 */}
      <section className="space-y-3 mb-8" aria-label="내 정보 설정">
        <h1 className="typo-body-m-medium">내 정보</h1>
        <div>
          <UserInfoCard userName={USER.name} />
          <SettingCard onClick={handleEmailEdit} radiusStyle="rounded-tl-none rounded-tr-none">
            <div className="typo-body-s-medium">{USER.email}</div>
            <IconButton
              icon={{ component: Icons.Right }}
              ariaLabel="이메일 수정"
              className="w-[20px] h-[20px] flex"
            />
          </SettingCard>
        </div>
      </section>

      {/* 설정 */}
      <section className="space-y-3" aria-label="서비스 설정">
        <h1 className="typo-body-m-medium">설정</h1>
        <div>
          <SettingCard radiusStyle="rounded-bl-none rounded-br-none" borderStyle="border-b-0">
            <div className="flex flex-col">
              <span className="typo-body-s-medium">결제 임박 메일 받기</span>
              <span className="typo-label-s-medium text-gray-500">
                구독하는 서비스의 결제를 5일 전 미리 알려드려요!
              </span>
            </div>
            <ToggleButton
              enabled={onOffAlarm}
              onToggle={() => setOnOffAlarm(!onOffAlarm)}
              ariaLabel="알림 토글 버튼"
            />
          </SettingCard>

          <SettingCard
            onClick={() => setIsLogoutDialogOpen(true)}
            radiusStyle="rounded-none"
            borderStyle="border-b-0"
          >
            <div className="typo-body-s-medium">로그아웃</div>
          </SettingCard>

          <SettingCard
            onClick={() => setIsWithdrawalDialogOpen(true)}
            radiusStyle="rounded-tl-none rounded-tr-none"
          >
            <div className="typo-body-s-medium">회원탈퇴</div>
          </SettingCard>
        </div>
      </section>

      {/* 로그아웃 모달 */}
      <ConfirmDialog
        title="로그아웃"
        body="로그아웃 하시겠습니까?"
        isOpen={isLogoutDialogOpen}
        setIsOpen={setIsLogoutDialogOpen}
        handleConfirm={handleLogout}
      />

      {/* 회원탈퇴 모달 */}
      <ConfirmDialog
        title="회원탈퇴"
        body={
          <span>
            회원 탈퇴 시 저장된 구독 기록들은
            <br /> 삭제되며 복구되지 않습니다.
          </span>
        }
        confirmName="탈퇴하기"
        isOpen={isWithdrawalDialogOpen}
        setIsOpen={setIsWithdrawalDialogOpen}
        handleConfirm={handleWithdrawl}
      />
    </MobileLayout>
  );
};
