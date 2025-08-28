import { useEffect, useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // API 호출이나 토큰 존재 여부를 확인하여 인증 상태를 설정합니다.
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};
