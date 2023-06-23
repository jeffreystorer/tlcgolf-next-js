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
  let canadianData = [];
  data.canadian.map((item) => canadianData.push(item.members[0]));
  let ghinData = [];
  data.foundGolfers.map((item) => ghinData.push(item.golfers[0]));
  setCanadianData(canadianData);
  addGHINDataToPlayers(ghinData);
  setFoundGolferAndIsLoggedIn(foundGolfer);

  useEffect(() => {
    router.push('/home');
  }, []);

  return false;
}
