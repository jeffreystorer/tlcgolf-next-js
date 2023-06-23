'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import {
  processCourseDataFromGHIN,
  setWednesdaySchedules,
  setCourseData,
  setFoundGolferAndIsLoggedIn,
  setPlayersAndGroups,
  setSchedules,
} from '@/components/fetchdata/apis/utils';

export function StoreFetchedDataStepTwo({ data }) {
  set('foundGolfer', data.foundGolfer.golfers[0]);
  const router = useRouter();
  const token = get('token');
  const ghinNumber = get('ghinNumber');
  const dataMode = get('dataMode');
  /*
   ** the following data were fetched and stored in step one
   */
  const courseDataFromGHIN = get('courseDataFromGHIN');
  const allSchedules = get('allSchedules');
  setSchedules(allSchedules);

  if (ghinNumber === '585871') setWednesdaySchedules(data.wednesday.values);
  if (dataMode === 'roster') {
    setFoundGolferAndIsLoggedIn(null);
    setCourseData(courseDataFromGHIN);
  }
  processCourseDataFromGHIN(data.courses);
  const hasGoogleSheet = get('hasGoogleSheet');
  hasGoogleSheet && setPlayersAndGroups(data.table.values);
  const allPlayersInTable = get('allPlayersInTable');
  let ghinNumbers = [];
  allPlayersInTable.map((player) => ghinNumbers.push(player[0]));
  const ghinNumberArray = encodeURIComponent(JSON.stringify(ghinNumbers));
  let lastNames = [];
  allPlayersInTable.map((player) => lastNames.push(player[1]));
  const lastNamesArray = encodeURIComponent(JSON.stringify(lastNames));

  useEffect(() => {
    const path = `/fetchdatastepthree?token=${token}&ghinNumberArray=${ghinNumberArray}&lastNamesArray=${lastNamesArray}`;
    router.push(path);
  }, []);

  return false;
}
