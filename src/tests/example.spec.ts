import { expect, test } from '@playwright/test';

test('홈페이지가 올바르게 열리는지 확인', async ({ page }) => {
  await page.goto('http://localhost:5173'); // Vite dev 서버 주소
  await expect(page).toHaveTitle(/Vite|React/); // 타이틀 안에 "Vite" 또는 "React" 포함
});
