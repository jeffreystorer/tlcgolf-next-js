'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, remove, set } from '@/components/common/utils';

export function StoreData({ data}) {
  /**
   * const data = {
    ghinNumber: incomingData.ghinNumber,
    lastName: incomingData.lastName,
    dataMode: incomingData.dataMode,
    captains: captains,
    bets: bets, 
    hasSchedule: hasSchedule,
    schedules: schedules,
    wednesdaySchedules: wednesdaySchedules,
    defaultTeesSelected: defaultTeesSelected,
    groups: incomingData.groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
    isLoggedIn: 'true',
  };
   */
  const router = useRouter();
  const keys = Object.keys(data);
  const values = Object.values(data);
  keys.map((key, index) => set(key, values[index]));
  if (!get('teesSelected')) {
    set('teesSelected', data.defaultTeesSelected);
  };
  remove('defaultTeesSelected');

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return false;
}
