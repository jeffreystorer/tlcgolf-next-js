'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, set } from '@/components/common/utils';
import {
  processCourseDataFromGHIN,
  setWednesdaySchedules,
  setSheetUrl,
  setCourseData,
  setFoundGolferAndIsLoggedIn,
  setPlayersAndGroups,
} from '@/components/fetchdata/apis/utils';

export function StoreFetchedDataStepTwo({ data }) {
  set('foundGolfer', data.foundGolfer);
  const router = useRouter();
  const token = get('token');
  const ghinNumber = get('ghinNumber');
  const dataMode = get('dataMode');
  /*
   ** the following data were fetched and stored in step one
   */
  const sheets = get('sheets');
  const courseDataFromGHIN = get('courseDataFromGHIN');
  if (ghinNumber === '585871') setWednesdaySchedules(data.wednesday.values);
  setSheetUrl(sheets);
  if (dataMode === 'roster') {
    setFoundGolferAndIsLoggedIn(null);
    setCourseData(courseDataFromGHIN);
  }
  let courseData = [];
  data.courses.map((course) => courseData.push(JSON.parse(course.value)));
  processCourseDataFromGHIN(courseData);
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
    const path = `/fetchdatastepthree?token=${token}&ghinNumberArray=${ghinNumberArray}&lastNamesArray=${lastNamesArray}&dataMode=${dataMode}`;
    router.push(path);
  }, []);

  return false;
}
