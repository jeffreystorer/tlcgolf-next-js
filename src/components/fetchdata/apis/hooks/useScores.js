import React, { useEffect, useState } from 'react';
import { get } from '@/components/common/utils';
import { ScoresApi } from '@/components/fetchdata/apis';

export default function useLookup() {
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState('');
  const token = get('token');
  const golfer_id = get('golfer_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await ScoresApi.scores(token, golfer_id);
        setScores(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return [scores, loading];
}
