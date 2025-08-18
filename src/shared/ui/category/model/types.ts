import type { ReactNode } from 'react';

export type ChipColor = 'red' | 'black';
export type ChipSize = 'sm' | 'md';

/** 그룹(컨테이너) 공개 API — 단일 선택 전용 */
export type ChipGroupProps = {
  value?: string | null; // 제어형 값
  defaultValue?: string | null; // 비제어 초기값
  onValueChange?: (value: string | null) => void;
  name?: string; // 라디오 name (없으면 자동 생성)
  className?: string;
  children: ReactNode;
};

/** 개별 칩 공개 API */
export type ChipItemProps = {
  value: string; // 선택 값 (= 라벨 의미)
  children: ReactNode; // 표시 텍스트/아이콘
  color?: ChipColor; // 선택 시 색상
  size?: ChipSize; // 사이즈 토큰
  disabled?: boolean;
  id?: string; // input id 고정이 필요할 때
  inputClassName?: string; // 숨겨진 input 클래스 (테스트 등)
  labelClassName?: string; // 라벨(시각 요소) 클래스
};

/** Group -> Item 내부 전달 브리지 (context 없이 단순 주입) */
export type _ChipInternalBridge = {
  radioName: string;
  current: string | null;
  setValue: (value: string | null) => void;
};
