/**
 * 이메일 주소의 유효성을 정규 표현식으로 검사합니다.
 * @param email - 검사할 이메일 주소 문자열
 * @returns 이메일 주소가 유효하면 true, 아니면 false
 */
export const validateEmail = (email: string): boolean => {
  // 이메일 정규식
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
