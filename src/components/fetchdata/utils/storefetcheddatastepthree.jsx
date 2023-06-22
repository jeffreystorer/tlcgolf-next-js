'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import {
  addGHINDataToPlayers,
  setCanadianData,
  setFoundGolferAndIsLoggedIn,
} from '@/components/fetchdata/apis/utils';

export function StoreFetchedDataStepThree({ data }) {
  const router = useRouter();
  const foundGolfer = get('foundGolfer'); //fecthed and stored in step two
  console.log('😊😊 data.foundGolfers', data.foundGolfers);
  let ghinData = [];
  data.foundGolfers[0].map((golfer) => ghinData.push(JSON.parse(golfer.value)));
  console.log('😊😊 ghinData', ghinData);
  let canadianData = [];
  data.canadian[0].map((golfer) =>
    canadianData.push(JSON.parse(golfer.value).members[0])
  );
  addGHINDataToPlayers(ghinData);
  setCanadianData(canadianData);
  setFoundGolferAndIsLoggedIn(foundGolfer);

  useEffect(() => {
    router.push('/lineup');
  }, []);

  return false;
}
