'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import {
  setCaptains,
  setTutorials,
  setBets,
  setSchedules,
} from '@/components/fetchdata/apis/utils';

export function StoreFetchedDataStepOne({ sheets, batch, token }) {
  const router = useRouter();
  setSchedules(batch.valueRanges[0].values);
  setTutorials(batch.valueRanges[1].values);
  setBets(batch.valueRanges[2].values);
  setCaptains(batch.valueRanges[3].values);
  set('sheets', sheets);
  set('roster', batch.valueRanges[4].values);
  set('token', token);
  const isLoggedIn = get('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn !== 'true') {
      router.push('/signin');
    } else {
      const ghinNumber = get('ghinNumber');
      const path = `/fromghin?token=${token}&ghinNumber=${Number(ghinNumber)}`;
      router.push(path);
    }
  }, []);

  return false;
}
