// shared/api/error.ts
import axios from 'axios';

export type AppError = {
  status?: number;
  code?: string;
  message: string;
  details?: unknown;
};

export const normalizeAxiosError = (err: unknown): AppError => {
  if (!axios.isAxiosError(err)) return { message: '알 수 없는 오류가 발생했어요.' };

  const status = err.response?.status;
  const body = err.response?.data as { code?: string; message?: string; [key: string]: unknown };

  // 서버 표준: { status, code, message, data } 또는 오타(satatusCode)까지 방어
  const code = body?.code;
  const message = body?.message ?? err.message ?? '요청 처리 중 오류가 발생했어요.';

  return { status, code, message, details: body };
};
