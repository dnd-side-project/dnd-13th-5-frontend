import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/shared/config/routes';
import { validateEmail } from '@/shared/lib/validation';
import { Button } from '@/shared/ui/button';
import BackButton from '@/shared/ui/button/BackButton';
import { Input } from '@/shared/ui/input';
import { MobileLayout } from '@/shared/ui/layout';

export const EmailEditPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const isDisabled = !validateEmail(email);

  const handleEditEmail = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 이메일 수정 API 호출

    navigate(ROUTES.MY_PAGE);
  };

  return (
    <MobileLayout
      headerProps={{ leftSlot: <BackButton />, centerSlot: '이메일 수정' }}
      showBottom={false}
    >
      <form onSubmit={handleEditEmail}>
        <div className="space-y-8">
          <h1 className="typo-title-l-bold mt-16">
            수정하실 <br /> 이메일 주소를 입력해주세요.
          </h1>

          <div>
            <Input
              placeholder="이메일을 입력해주세요"
              onChange={handleInputChange}
              aria-invalid={isDisabled && email.length > 0}
              className={`focus:ring-0 transition-colors duration-200  ${isDisabled ? 'focus:border-primary-700' : ''}`}
            />
            {isDisabled && email.length > 0 && (
              <span className="typo-label-s-medium text-primary-700 p-5">
                유효한 이메일을 입력해주세요
              </span>
            )}
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto px-5 pb-[calc(56px+env(safe-area-inset-bottom))] ">
          <Button variant="primary-fill" title="수정하기" disabled={isDisabled} type="submit" />
        </footer>
      </form>
    </MobileLayout>
  );
};
