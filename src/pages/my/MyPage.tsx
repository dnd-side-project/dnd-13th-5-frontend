import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteMyInfo } from '@/entities/member/hooks/useDeleteMyInfo';
import { useLogout } from '@/entities/member/hooks/useLogout';
import { useMyInfo } from '@/entities/member/hooks/useMyInfo';
import { useUpdateMyNotification } from '@/entities/member/hooks/useUpdateMyNotification';
import { queryClient } from '@/shared/api/queryClient';
import { Icons } from '@/shared/assets/icons';
import { Logo } from '@/shared/assets/images';
import { ROUTES } from '@/shared/config/routes';
import { useAuthStore } from '@/shared/store/authStore';
import { IconButton } from '@/shared/ui/button';
import ToggleButton from '@/shared/ui/button/ToggleButton';
import { ConfirmDialog } from '@/shared/ui/dialog';
import { MobileLayout } from '@/shared/ui/layout';
import SettingCard from '@/widgets/setting-card/ui/SettingCard';
import UserInfoCard from '@/widgets/setting-card/ui/UserInfoCard';

export const MyPage = () => {
  const navigate = useNavigate();
  const logoutLocal = useAuthStore(state => state.logout);

  const { data: user, isLoading } = useMyInfo();
  const { mutate: deleteMyInfo } = useDeleteMyInfo();
  const { mutate: updateNotification, isPending: isUpdatingNotification } =
    useUpdateMyNotification();
  const { mutate: logout } = useLogout();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);

  const handleEmailEdit = () => {
    navigate(ROUTES.EMAIL_EDIT);
  };

  const handleToggleAlarm = () => {
    if (isUpdatingNotification) return;

    if (typeof user?.isNotificationOn === 'boolean') {
      const newAlarmState = !user.isNotificationOn; // 현재 상태 반전
      updateNotification(newAlarmState); // 서버와 캐시에 반영
    }
  };

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => setIsLogoutDialogOpen(false),
    });

    navigate(ROUTES.HOME);
  };

  const handleWithdrawal = () => {
    setIsWithdrawalDialogOpen(false);

    deleteMyInfo(undefined, {
      onSuccess: async () => {
        logoutLocal(); // zustand에서 토큰, isAuthenticated 초기화
        await queryClient.clear();
        navigate(ROUTES.HOME, { replace: true });
      },
    });
  };

  return (
    <MobileLayout
      headerProps={{
        leftSlot: <img src={Logo} alt="Logo" className="h-7" />,
      }}
    >
      {/* 내 정보 */}
      <section className="space-y-3 mb-8" aria-label="내 정보 설정">
        <h1 className="typo-body-m-medium">내 정보</h1>
        <div>
          <UserInfoCard userName={user?.name ?? ''} />
          <SettingCard onClick={handleEmailEdit} radiusStyle="rounded-tl-none rounded-tr-none">
            <div className="typo-body-s-medium">{user?.email ?? ''}</div>
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

            {!isLoading && user && (
              <ToggleButton
                enabled={user.isNotificationOn}
                onToggle={handleToggleAlarm}
                ariaLabel="알림 토글 버튼"
              />
            )}
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
        handleConfirm={handleWithdrawal}
      />
    </MobileLayout>
  );
};
