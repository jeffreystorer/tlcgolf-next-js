import React, { useEffect, useState } from 'react';
import { useScores } from '@/components/fetchdata/apis/hooks';
import { get, set } from '@/components/common/utils';

export default function useGetScores() {
  const [loading, setLoading] = useState(true);
  const [scores, scoresLoading] = useScores();

  useEffect(() => {
    if (!scoresLoading) {
      set('scores', scores);
      setLoading(false);
    }
  }, [scoresLoading]);

  return [loading];
}
