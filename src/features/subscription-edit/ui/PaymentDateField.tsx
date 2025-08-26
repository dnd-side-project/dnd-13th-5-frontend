// features/subscription-edit/ui/PaymentDateField.tsx
import { useEffect, useState } from 'react';

import { Icons } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/button';
import { Calendar } from '@/shared/ui/calendar/Calendar';
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
  const [date, setDate] = useState<Date | undefined>(undefined);

  // value가 변경될 때 date 상태를 동기화
  useEffect(() => {
    if (value) {
      // YYYY-MM-DD 형식의 문자열을 Date 객체로 변환 (시간대 문제 방지)
      const [year, month, day] = value.split('-').map(Number);
      setDate(new Date(year, month - 1, day)); // month는 0부터 시작
    } else {
      setDate(undefined);
    }
  }, [value]);

  const handleSave = () => {
    if (date) {
      // Date 객체를 YYYY-MM-DD 형식으로 변환 (시간대 문제 방지)
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      onChange(dateString);
    } else {
      onChange(null);
    }
    setOpen(false);
  };

  return (
    <fieldset>
      <legend className="mb-2 typo-title-s-bold">결제일</legend>

      <div className="relative">
        <Input
          value={value ?? ''}
          placeholder="YYYY-MM-DD"
          readOnly
          className="typo-body-s-medium text-gray-800"
          aria-describedby="payment-date-desc"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              aria-label="달력 열기"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-2 text-gray-600 hover:bg-gray-100"
            >
              <Icons.Calendar className="fill-gray-500" />
            </button>
          </DialogTrigger>

          <DialogContent ariaLabel="결제일 선택">
            <DialogHeader>
              <DialogTitle>결제일 선택</DialogTitle>
            </DialogHeader>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-lg border w-full"
            />

            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="primary-stroke" title="취소" />
              </DialogClose>
              <Button variant="primary-fill" onClick={handleSave} title="저장" />
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
