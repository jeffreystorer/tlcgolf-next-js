'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import {
  setCaptains,
  setTutorials,
  setBets,
} from '@/components/fetchdata/apis/utils';

export function StoreFetchedDataStepOne({ data }) {
  const router = useRouter();
  set('allSchedules', data.batch.valueRanges[0].values);
  setTutorials(data.batch.valueRanges[1].values);
  setBets(data.batch.valueRanges[2].values);
  setCaptains(data.batch.valueRanges[3].values);
  set('sheets', data.sheets);
  set('roster', data.batch.valueRanges[4].values);
  set('courseDataFromGHIN', data.batch.valueRanges[5].values);
  set('token', data.token);
  const isLoggedIn = get('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn !== 'true') {
      router.push('/signin');
    } else {
      const ghinNumber = get('ghinNumber');
      const token = get('token');
      const path = `/fetchdatasteptwo?token=${token}&ghinNumber=${Number(
        ghinNumber
      )}`;
      router.push(path);
    }
  }, []);

  return false;
}
