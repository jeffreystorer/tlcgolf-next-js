import React, { useEffect, useState } from 'react';
import { GolferApi } from '@/components/fetchdata/apis';

export default function useFetchToken() {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const GHIN_PASSWORD = import.meta.env.VITE_GHIN_PASSWORD;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await GolferApi.login(
          GHIN_PASSWORD,
          '585871'
        );
        setToken(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return [token, loading];
}
