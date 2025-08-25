import { AxiosResponseHeaders } from 'axios';
import { useEffect, useState } from 'react';

import apiClient from '@/shared/api/apiClient';
import { extractAccessFromHeaders, setAccessToken } from '@/shared/api/tokenManager';

export const useAuthBootstrap = () => {
  const [_ready, _setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        console.log('auth bootstrap start');
        console.log('Cookies before request:', document.cookie);

        const res = await apiClient.get('/auth/reissue', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Request headers:', res.config.headers);
        console.log('Response:', res);

        const at = extractAccessFromHeaders(res.headers as AxiosResponseHeaders);
        if (at) setAccessToken(at);
      } catch (error) {
        console.error('Auth bootstrap error:', error);
      } finally {
        _setReady(true);
      }
    })();
  }, []);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       console.log('auth bootstrap start');
  //       const res = await apiClient.get('/auth/reissue', { withCredentials: true }); // 쿠키로 인증, 응답 헤더에 AT
  //       const at = extractAccessFromHeaders(res.headers as any);
  //       console.log('aa', res, at);
  //       if (at) setAccessToken(at);
  //       // 여기서 /me 등으로 유저 정보까지 스토어에 채워도 됨
  //     } finally {
  //       _setReady(true);
  //     }
  //   })();
  // }, []);

  return _ready;
};
