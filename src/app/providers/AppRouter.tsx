import {
  Route, Routes, useNavigate, useParams,
} from 'react-router-dom';
import { HomePage } from '@/pages/home';
import {
  SubscriptionDetailPage,
  SubscriptionEditPage,
  SubscriptionsPage,
} from '@/pages/subscriptions';
import { ComparisonPage } from '@/pages/comparison';
import { MyPage } from '@/pages/my';
import { AlarmPage } from '@/pages/alarm';
import { LoginPage } from '@/pages/login';
import BackButton from '@/shared/ui/button/BackButton';
import AlarmButton from '@/shared/ui/button/AlarmButton';
import MobileLayout from '@/shared/ui/layout/MobileLayout';
import StarButton from '@/shared/ui/button/StarButton';
import { useState } from 'react';
import { ROUTES } from '@/shared/config/routes';

const SubscriptionRightSlot = () => {
  const [isStarred, setIsStarred] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleStarClick = () => {
    setIsStarred((prev) => !prev);
  };

  const handleEdit = () => {
    navigate(ROUTES.SUBSCRIPTION_EDIT(id));
  };

  return (
    <div className="flex items-center space-x-2">
      <StarButton onClick={handleStarClick} isStarred={isStarred} />
      <button onClick={handleEdit} className="typo-body-m-medium">
        편집
      </button>
    </div>
  );
};

export const AppRouter = () => (
  <Routes>
    {/* 로그인 */}
    <Route path={ROUTES.LOGIN} element={<LoginPage />} />

    {/* 회원가입 */}
    <Route
      element={
        <MobileLayout
          showBottom={false}
          headerProps={{ leftSlot: <BackButton />, centerSlot: '회원가입' }}
        />
      }
    ></Route>

    {/* 홈 (프라이머리 헤더 + 회색 바디) */}
    <Route
      element={
        <MobileLayout
          headerProps={{
            leftSlot: 'Logo',
            rightSlot: <AlarmButton tone="white" />,
            colorVariant: 'primary',
          }}
          bodyVariant="gray"
        />
      }
    >
      <Route path={ROUTES.HOME} element={<HomePage />} />
    </Route>

    {/* 내 구독 */}
    <Route
      element={
        <MobileLayout
          headerProps={{
            centerSlot: '내 구독',
            rightSlot: <AlarmButton />,
          }}
        />
      }
    >
      <Route path={ROUTES.SUBSCRIPTIONS} element={<SubscriptionsPage />} />
    </Route>

    {/* 비교하기 */}
    <Route
      element={
        <MobileLayout
          headerProps={{
            centerSlot: '비교하기',
            rightSlot: <AlarmButton />,
          }}
        />
      }
    >
      <Route path={ROUTES.COMPARISON} element={<ComparisonPage />} />
    </Route>

    {/* 내 구독 상세 (바텀 제거, 우측 '즐겨찾기 & 편집') */}
    <Route
      element={
        <MobileLayout
          showBottom={false}
          headerProps={{
            leftSlot: <BackButton />,
            rightSlot: <SubscriptionRightSlot />,
          }}
        />
      }
    >
      <Route
        path={ROUTES.SUBSCRIPTION_DETAIL()}
        element={<SubscriptionDetailPage />}
      />
    </Route>

    {/* 내 구독 수정 */}
    <Route
      element={
        <MobileLayout
          showBottom={false}
          headerProps={{
            leftSlot: <BackButton />,
            centerSlot: '정보 수정하기',
          }}
        />
      }
    >
      <Route
        path={ROUTES.SUBSCRIPTION_EDIT()}
        element={<SubscriptionEditPage />}
      />
    </Route>

    {/* 마이 */}
    <Route
      element={
        <MobileLayout
          headerProps={{
            leftSlot: 'Logo',
            rightSlot: <AlarmButton />,
          }}
        />
      }
    >
      <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
    </Route>

    {/* 알림 (뒤로가기 + 중앙 타이틀, 회색 바디) */}
    <Route
      element={
        <MobileLayout
          headerProps={{
            leftSlot: <BackButton />,
            centerSlot: '알림',
          }}
          bodyVariant="gray"
        />
      }
    >
      <Route path={ROUTES.ALARM} element={<AlarmPage />} />
    </Route>
  </Routes>
);
