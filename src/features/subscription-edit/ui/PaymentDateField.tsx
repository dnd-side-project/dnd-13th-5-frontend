// features/subscription-edit/ui/PaymentDateField.tsx
import { useState } from 'react';

import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'; // 너가 만든 dialog
import { Input } from '@/shared/ui/input';

type Props = {
  value: string | null | undefined; // 'YYYY-MM-DD'
  onChange: (date: string | null) => void;
};

export const PaymentDateField = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<string>(value ?? '');

  return (
    <fieldset>
      <legend className="mb-2 typo-title-s-bold">결제일</legend>

      <div className="relative">
        <Input
          value={value ?? ''}
          placeholder="YYYY-MM-DD"
          readOnly
          className="pr-12"
          aria-describedby="payment-date-desc"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="달력 열기"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-600 hover:bg-gray-100"
            >
              📅
            </button>
          </DialogTrigger>

          <DialogContent ariaLabel="결제일 선택">
            <DialogHeader>
              <DialogTitle>결제일 선택</DialogTitle>
            </DialogHeader>

            {/* 간단히 native datepicker 사용 (향후 캘린더로 교체 가능) */}
            <Input type="date" value={draft} onChange={e => setDraft(e.target.value)} />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="primary-fill" title="취소" />
              </DialogClose>
              <Button
                variant="primary-fill"
                onClick={() => {
                  onChange(draft || null);
                  setOpen(false);
                }}
                title="확인"
              />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <p id="payment-date-desc" className="sr-only">
        입력 칸은 읽기 전용입니다. 달력 버튼으로 날짜를 선택하세요.
      </p>
    </fieldset>
  );
};
