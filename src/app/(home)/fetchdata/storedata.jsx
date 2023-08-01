'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, remove, set, sset } from '@/components/common/utils';
import * as state from '@/store';

export function StoreData({ data }) {
  /**
   * const data = {
    ghinNumber: ghinNumber,
    lastName: lastName,
    dataMode: dataMode,
    captains: captains,
    bets: bets,
    hasSchedule: hasSchedule,
    schedules: schedules,
    foundGolfer: foundGolfer,
    wednesdaySchedules: wednesdaySchedules,
    defaultTeesSelected: defaultTeesSelected,
    groups: groups,
    allPlayersInTable: allPlayersInTable,
    courseData: courseData,
  };
   */
  const router = useRouter();

  const keys = Object.keys(data);
  const values = Object.values(data);
  useEffect(() => {
    keys.map((key, index) => set(key, values[index]));
    if (!get('teesSelected')) {
      set('teesSelected', data.defaultTeesSelected);
    }
    remove('defaultTeesSelected');
    sset('isLoggedIn', true);
    router.push('/lineup');
  }, [keys, router, values]);

  return false;
}
