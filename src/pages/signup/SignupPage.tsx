import { Button } from '@/shared/ui/button';
import BackButton from '@/shared/ui/button/BackButton';
import { Header } from '@/shared/ui/header';

export const SignupPage = () => (
    <div className="min-h-dvh max-w-md m-auto flex flex-col justify-between">
      <Header leftSlot={<BackButton />} centerSlot="회원가입" />

      <main className="flex flex-col space-y-20 px-5">
        <h1 className="typo-title-l-bold text-left">
          마지막으로
          <br /> 더 나은 서비스 제공을 위해 <br />
          이용약관에 동의해주세요 :)
        </h1>

        <div className="space-y-5">
          <span className="typo-title-m-bold text-left">약관 동의</span>
          <div className="bg-gray-50 border border-gray-100 p-4 rounded-lg"></div>
        </div>
      </main>

      <footer className="pb-[calc(56px+env(safe-area-inset-bottom))] px-5">
        <Button
          variant="primary-fill"
          title="동의"
          disabled={true}
          onClick={() => {}}
        ></Button>
      </footer>
    </div>
);
