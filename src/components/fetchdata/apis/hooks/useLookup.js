import React, { useEffect, useState } from 'react';
import { get } from '@/components/common/utils';
import { LookupGolferApi } from '@/components/fetchdata/apis';

export default function useLookup() {
  const [loading, setLoading] = useState(true);
  const [golfers, setGolfers] = useState('');
  const token = get('token');
  const last_name = get('last_name');
  const first_name = get('first_name') ? get('first_name') : null;
  const state = get('state') ? get('state') : null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await LookupGolferApi.lookupGolfer(
          token,
          last_name,
          first_name,
          state
        );
        setGolfers(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return [golfers, loading];
}
